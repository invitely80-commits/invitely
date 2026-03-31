"use server";

import { revalidatePath } from "next/cache";

import { getCoupleNames, parseInviteData } from "@/lib/invites";
import { absoluteUrl } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { sendRsvpEmails } from "@/lib/email";
import { rsvpSchema } from "@/lib/validations";

export type RsvpActionState = {
  error?: string;
  success?: string;
};

export async function submitRsvpAction(
  inviteId: string,
  _prevState: RsvpActionState,
  formData: FormData,
): Promise<RsvpActionState> {
  const invite = await prisma.invite.findUnique({
    where: {
      id: inviteId,
    },
    include: {
      user: true,
    },
  });

  if (!invite) {
    return {
      error: "This invite is no longer available.",
    };
  }

  const parsed = rsvpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    guests: formData.get("guests"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Please complete the RSVP form correctly.",
    };
  }

  await prisma.rsvp.create({
    data: {
      inviteId,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      guests: parsed.data.guests,
    },
  });

  const inviteData = parseInviteData(invite.data);

  try {
    await sendRsvpEmails({
      guestEmail: parsed.data.email,
      guestName: parsed.data.name,
      coupleNames: getCoupleNames(inviteData),
      inviteUrl: absoluteUrl(`/${invite.slug}`),
      hostEmail: invite.user.email,
      hostName: invite.user.name,
      guests: parsed.data.guests,
      phone: parsed.data.phone,
    });
  } catch (error) {
    console.error("Failed to send RSVP emails", error);
  }

  revalidatePath(`/${invite.slug}`);
  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/invite/${invite.id}/edit`);

  return {
    success: "Your RSVP is confirmed. Thank you for celebrating with us.",
  };
}
