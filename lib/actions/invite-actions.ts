"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { uploadInviteImages } from "@/lib/cloudinary";
import { parseInviteData, themeToTemplate } from "@/lib/invites";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { generateInviteSlug } from "@/lib/slug";
import {
  inviteSubmissionSchema,
  type InviteData,
  type InviteEvent,
  type InviteSubmission,
} from "@/lib/validations";

export type InviteActionState = {
  error?: string;
};

type ParsedInvitePayload =
  | {
      error: string;
    }
  | {
      data: InviteSubmission;
      files: File[];
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
  const parsed = await parseInvitePayload(formData);

  if ("error" in parsed) {
    return parsed;
  }

  let inviteId = "";

  try {
    const slug = await generateInviteSlug(parsed.data.brideName, parsed.data.groomName);
    const uploadedImages = await uploadInviteImages(parsed.files, `invitely/${user.id}`);
    const inviteData = finalizeInviteData(parsed.data, uploadedImages);

    const invite = await prisma.invite.create({
      data: {
        userId: user.id,
        slug,
        template: themeToTemplate(parsed.data.theme),
        data: inviteData,
      },
    });

    inviteId = invite.id;
  } catch (error) {
    console.error("Failed to create invite", error);
    return {
      error: "We couldn't create your invite right now. Please try again once your setup is configured.",
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

  try {
    const uploadedImages = await uploadInviteImages(parsed.files, `invitely/${user.id}`);
    const inviteData = finalizeInviteData(parsed.data, uploadedImages);

    await prisma.invite.update({
      where: {
        id: inviteId,
      },
      data: {
        template: themeToTemplate(parsed.data.theme),
        data: inviteData,
      },
    });
  } catch (error) {
    console.error("Failed to update invite", error);
    return {
      error: "We couldn't save those changes right now. Please try again in a moment.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/invite/${inviteId}/edit`);
  revalidatePath(`/${existingInvite.slug}`);
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
