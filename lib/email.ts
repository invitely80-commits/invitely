import { Resend } from "resend";

import RsvpConfirmationEmail from "@/emails/rsvp-confirmation";
import RsvpNotificationEmail from "@/emails/rsvp-notification";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

type SendRsvpEmailArgs = {
  guestEmail: string;
  guestName: string;
  coupleNames: string;
  inviteUrl: string;
  hostEmail?: string | null;
  hostName?: string | null;
  guests: number;
  phone: string;
};

export async function sendRsvpEmails({
  guestEmail,
  guestName,
  coupleNames,
  inviteUrl,
  hostEmail,
  hostName,
  guests,
  phone,
}: SendRsvpEmailArgs) {
  if (!resend || !process.env.RESEND_FROM_EMAIL) {
    return;
  }

  const jobs: Array<Promise<unknown>> = [];

  if (hostEmail) {
    jobs.push(
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: hostEmail,
        subject: `New RSVP for ${coupleNames}`,
        react: RsvpNotificationEmail({
          guestName,
          guestEmail,
          guests,
          phone,
          coupleNames,
          inviteUrl,
          hostName: hostName ?? "there",
        }),
      }),
    );
  }

  jobs.push(
    resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: guestEmail,
      subject: `Your RSVP for ${coupleNames} is confirmed`,
      react: RsvpConfirmationEmail({
        guestName,
        coupleNames,
        inviteUrl,
      }),
    }),
  );

  await Promise.allSettled(jobs);
}
