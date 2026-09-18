"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { uploadInviteImages } from "@/lib/cloudinary";
import { parseInviteData, themeToTemplate } from "@/lib/invites";
import { prisma } from "@/lib/prisma";
import { inviteCache } from "@/lib/redis";
import { requireUser } from "@/lib/session";
import { generateInviteSlug, checkSlugAvailability, formatSlug } from "@/lib/slug";
import {
  inviteSubmissionSchema,
  type InviteData,
  type InviteEvent,
  type InviteSubmission,
} from "@/lib/validations";

export type InviteActionState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

type ParsedInvitePayload =
  | {
      data: InviteSubmission;
      files: File[];
    }
  | {
      error: string;
    };

function parseJsonField<T>(value: FormDataEntryValue | null, fallback: T): T {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

async function parseInvitePayload(formData: FormData): Promise<ParsedInvitePayload> {
  const events = parseJsonField<InviteEvent[]>(formData.get("eventsJson"), []);
  const existingGallery = parseJsonField<string[]>(formData.get("existingGalleryJson"), []);

  const parsed = inviteSubmissionSchema.safeParse({
    brideName: formData.get("brideName"),
    groomName: formData.get("groomName"),
    weddingDate: formData.get("weddingDate"),
    description: formData.get("description"),
    theme: formData.get("theme"),
    contactEmail: formData.get("contactEmail") ?? "",
    contactPhone: formData.get("contactPhone") ?? "",
    enableRsvp: formData.get("enableRsvp") === "true" || formData.get("enableRsvp") === "on",
    askAccommodation: formData.get("askAccommodation") === "true" || formData.get("askAccommodation") === "on",
    rsvpDeadline: (formData.get("rsvpDeadline") as string) || undefined,
    customSlug: (formData.get("customSlug") as string) || undefined,
    events,
    existingGallery,
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Please review the invite details and try again.",
    };
  }

  const files = formData
    .getAll("galleryFiles")
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (parsed.data.existingGallery.length + files.length > 1) {
    return {
      error: "You can keep only 1 photo in one invite to ensure it remains lightweight.",
    };
  }

  return {
    data: parsed.data,
    files,
  };
}

function finalizeInviteData(payload: InviteSubmission, uploadedImages: string[]): InviteData {
  const gallery = [...payload.existingGallery, ...uploadedImages];

  return {
    brideName: payload.brideName,
    groomName: payload.groomName,
    weddingDate: payload.weddingDate,
    description: payload.description,
    theme: payload.theme,
    contactEmail: payload.contactEmail,
    contactPhone: payload.contactPhone,
    enableRsvp: payload.enableRsvp,
    askAccommodation: payload.askAccommodation,
    rsvpDeadline: payload.rsvpDeadline,
    events: payload.events,
    gallery,
    heroImage: gallery[0] ?? "",
  };
}

export async function createInviteAction(
  _prevState: InviteActionState,
  formData: FormData,
): Promise<InviteActionState> {
  const user = await requireUser();

  const inviteCount = await prisma.invite.count({
    where: {
      userId: user.id,
    },
  });

  if (inviteCount >= 5) {
    return {
      error: "You have reached the maximum limit of 5 invitations per account. Please delete an existing invitation to create a new one.",
    };
  }

  const parsed = await parseInvitePayload(formData);

  if ("error" in parsed) {
    return parsed;
  }

  let inviteId = "";

  try {
    const slug = await generateInviteSlug(
      parsed.data.brideName,
      parsed.data.groomName,
      parsed.data.customSlug,
      parsed.data.weddingDate,
    );
    const uploadedImages = await uploadInviteImages(parsed.files, `invitely/${user.id}`);
    const inviteData = finalizeInviteData(parsed.data, uploadedImages);

    const invite = await prisma.invite.create({
      data: {
        userId: user.id,
        slug,
        template: themeToTemplate(parsed.data.theme),
        brideName: parsed.data.brideName,
        groomName: parsed.data.groomName,
        weddingDate: new Date(parsed.data.weddingDate),
        data: inviteData,
      },
    });

    inviteId = invite.id;
  } catch (error) {
    console.error("Failed to create invite", error);
    return {
      error: error instanceof Error ? error.message : "We couldn't create your invite right now. Please try again.",
    };
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard/invite/${inviteId}/edit?created=1`);
}

export async function updateInviteAction(
  inviteId: string,
  _prevState: InviteActionState,
  formData: FormData,
): Promise<InviteActionState> {
  const user = await requireUser();
  const existingInvite = await prisma.invite.findFirst({
    where: {
      id: inviteId,
      userId: user.id,
    },
  });

  if (!existingInvite) {
    return {
      error: "We couldn't find that invite.",
    };
  }

  const parsed = await parseInvitePayload(formData);

  if ("error" in parsed) {
    return parsed;
  }

  let targetSlug = existingInvite.slug;
  if (parsed.data.customSlug) {
    const cleaned = formatSlug(parsed.data.customSlug);
    if (cleaned && cleaned !== existingInvite.slug) {
      const availability = await checkSlugAvailability(cleaned, {
        currentInviteId: inviteId,
        brideName: parsed.data.brideName,
        groomName: parsed.data.groomName,
        weddingDate: parsed.data.weddingDate,
      });
      if (!availability.available) {
        return {
          error: availability.reason || `The link "${cleaned}" is not available.`,
        };
      }
      targetSlug = cleaned;
    }
  }

  try {
    const uploadedImages = await uploadInviteImages(parsed.files, `invitely/${user.id}`);
    const inviteData = finalizeInviteData(parsed.data, uploadedImages);

    await prisma.invite.update({
      where: {
        id: inviteId,
        userId: user.id, // Combined ownership check
      },
      data: {
        slug: targetSlug,
        template: themeToTemplate(parsed.data.theme),
        brideName: parsed.data.brideName,
        groomName: parsed.data.groomName,
        weddingDate: new Date(parsed.data.weddingDate),
        data: inviteData,
      },
    });

    // Proactive Cache Invalidation
    await inviteCache.delete(existingInvite.slug);
    if (targetSlug !== existingInvite.slug) {
      await inviteCache.delete(targetSlug);
    }
  } catch (error) {
    console.error("Failed to update invite", error);
    return {
      error: "We couldn't save those changes right now. Please try again in a moment.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/invite/${inviteId}/edit`);
  revalidatePath(`/${existingInvite.slug}`);
  if (targetSlug !== existingInvite.slug) {
    revalidatePath(`/${targetSlug}`);
  }
  redirect(`/dashboard/invite/${inviteId}/edit?updated=1`);
}

export async function getOwnedInviteOrThrow(inviteId: string, userId: string) {
  const invite = await prisma.invite.findFirst({
    where: {
      id: inviteId,
      userId,
    },
  });

  if (!invite) {
    return null;
  }

  return {
    ...invite,
    parsedData: parseInviteData(invite.data),
  };
}

export async function deleteInviteAction(inviteId: string): Promise<InviteActionState> {
  const user = await requireUser();
  const invite = await prisma.invite.findFirst({
    where: {
      id: inviteId,
      userId: user.id,
    },
    select: {
      id: true,
      slug: true,
    },
  });

  if (!invite) {
    return {
      error: "We couldn't find that invite or you don't have permission to delete it.",
    };
  }

  try {
    await prisma.invite.delete({
      where: {
        id: inviteId,
      },
    });

    await inviteCache.delete(invite.slug);
    revalidatePath("/dashboard");
    return {};
  } catch (error) {
    console.error("Failed to delete invite", error);
    return {
      error: "Failed to delete this invite. Please try again.",
    };
  }
}
