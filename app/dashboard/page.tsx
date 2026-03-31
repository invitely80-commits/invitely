import Link from "next/link";
import { CalendarClock, MessageCircleHeart, PartyPopper } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCoupleNames, parseInviteData, templateToTheme } from "@/lib/invites";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { formatShortDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const invites = await prisma.invite.findMany({
    where: {
      userId: user.id,
    },
    include: {
      rsvps: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const inviteCards = invites.map((invite) => {
    const data = parseInviteData(invite.data);
    return {
      ...invite,
      data,
      theme: templateToTheme(invite.template),
      coupleNames: getCoupleNames(data),
      totalGuests: invite.rsvps.reduce((sum, rsvp) => sum + rsvp.guests, 0),
    };
  });

  const totalRsvps = inviteCards.reduce((sum, invite) => sum + invite.rsvps.length, 0);
  const totalGuests = inviteCards.reduce((sum, invite) => sum + invite.totalGuests, 0);

  return (
    <div className="space-y-8">
      <section className="grid gap-5 xl:grid-cols-3">
        <Card>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-maroon/60">Active invites</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="rounded-2xl bg-blush p-3 text-maroon">
              <PartyPopper className="size-5" />
            </div>
            <p className="font-heading text-5xl text-maroon">{inviteCards.length}</p>
          </div>
        </Card>
        <Card>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-maroon/60">Total RSVPs</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="rounded-2xl bg-cream p-3 text-maroon">
              <MessageCircleHeart className="size-5" />
            </div>
            <p className="font-heading text-5xl text-maroon">{totalRsvps}</p>
          </div>
        </Card>
        <Card>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-maroon/60">Guests expected</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="rounded-2xl bg-blush p-3 text-maroon">
              <CalendarClock className="size-5" />
            </div>
            <p className="font-heading text-5xl text-maroon">{totalGuests}</p>
          </div>
        </Card>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-5xl text-maroon">Your invites</h1>
            <p className="mt-3 text-base leading-7 text-stone-600">
              Create, update, and track every wedding website from one warm, organized workspace.
            </p>
          </div>
          <Link href="/dashboard/invite/new" className={buttonStyles({})}>
            Create invite
          </Link>
        </div>

        {inviteCards.length === 0 ? (
          <Card className="rounded-[32px] p-8 text-center">
            <h2 className="font-heading text-4xl text-maroon">Your first invite starts here</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-stone-600">
              Set up your couple details, add events, upload your favorite photos, and publish a
              beautiful invitation website in just a few minutes.
            </p>
            <Link href="/dashboard/invite/new" className={buttonStyles({ className: "mt-8" })}>
              Create your first invite
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6 xl:grid-cols-2">
            {inviteCards.map((invite) => (
              <Card key={invite.id} className="rounded-[32px]">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-maroon/60">
                      {invite.theme} theme
                    </p>
                    <h2 className="mt-3 font-heading text-4xl text-maroon">{invite.coupleNames}</h2>
                    <p className="mt-2 text-sm leading-7 text-stone-600">
                      Wedding date: {formatShortDate(invite.data.weddingDate)}
                    </p>
                    <p className="mt-1 text-sm leading-7 text-stone-600">Invite link: /{invite.slug}</p>
                  </div>
                  <div className="grid gap-3 rounded-[24px] bg-cream/70 px-5 py-4 text-sm text-stone-700">
                    <div className="flex items-center justify-between gap-6">
                      <span>RSVPs</span>
                      <strong className="text-maroon">{invite.rsvps.length}</strong>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <span>Guests</span>
                      <strong className="text-maroon">{invite.totalGuests}</strong>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <span>Updated</span>
                      <strong className="text-maroon">{formatShortDate(invite.updatedAt)}</strong>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/dashboard/invite/${invite.id}/edit`}
                    className={buttonStyles({ size: "sm" })}
                  >
                    Edit invite
                  </Link>
                  <Link
                    href={`/${invite.slug}`}
                    className={buttonStyles({ variant: "secondary", size: "sm" })}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View public page
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
