"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { parseInviteData } from "@/lib/invites";
import { rsvpSubmissionSchema } from "@/lib/validations";

export type RsvpActionState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function submitRsvpAction(
  inviteId: string,
  _prevState: RsvpActionState,
  formData: FormData,
): Promise<RsvpActionState> {
  const rawData = {
    name: formData.get("name"),
    guestCount: formData.get("guestCount"),
    attendanceTime: formData.get("attendanceTime"),
    needsAccommodation: formData.get("needsAccommodation"),
    phone: formData.get("phone") || undefined,
    email: formData.get("email") || undefined,
    notes: formData.get("notes") || undefined,
  };

  const parsed = rsvpSubmissionSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Please check the form details and try again.",
    };
  }

  try {
    const invite = await prisma.invite.findUnique({
      where: { id: inviteId },
      select: {
        id: true,
        slug: true,
        data: true,
      },
    });

    if (!invite) {
      return {
        success: false,
        error: "Invitation not found.",
      };
    }

    const inviteData = parseInviteData(invite.data);

    if (inviteData.enableRsvp === false) {
      return {
        success: false,
        error: "RSVP submissions are currently closed for this celebration.",
      };
    }

    await prisma.rsvp.create({
      data: {
        inviteId: invite.id,
        name: parsed.data.name,
        guestCount: parsed.data.guestCount,
        attendanceTime: parsed.data.attendanceTime,
        needsAccommodation: parsed.data.needsAccommodation ?? null,
        phone: parsed.data.phone ?? null,
        email: parsed.data.email ?? null,
        notes: parsed.data.notes ?? null,
      },
    });

    revalidatePath(`/${invite.slug}`);
    revalidatePath(`/dashboard/invite/${invite.id}/analytics`);

    return {
      success: true,
      message: "Thank you for confirming your attendance! The couple has received your warm response.",
    };
  } catch (error) {
    console.error("Failed to submit RSVP:", error);
    return {
      success: false,
      error: "We could not record your RSVP right now. Please try again shortly.",
    };
  }
}
