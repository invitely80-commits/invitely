import Link from "next/link";
import { PartyPopper } from "lucide-react";

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
    select: {
      id: true,
      slug: true,
      template: true,
      brideName: true,
      groomName: true,
      weddingDate: true,
      updatedAt: true,
      data: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const inviteCards = invites.map((invite) => {
    const data = parseInviteData(invite.data);
    
    // Fallback logic for existing data
    const coupleNames = invite.brideName && invite.groomName 
      ? `${invite.brideName} & ${invite.groomName}` 
      : getCoupleNames(data);
    
    const weddingDate = invite.weddingDate 
      ? invite.weddingDate.toISOString().split('T')[0] 
      : data.weddingDate;

    return {
      ...invite,
      data,
      theme: templateToTheme(invite.template),
      coupleNames,
      weddingDate,
    };
  });

  return (
    <div className="space-y-12">
      <section className="grid gap-6 md:grid-cols-3">
        <div className="surface-card spotlight-glow p-8 rounded-[28px]">
          <p className="text-[10px] font-bold uppercase tracking-widest-label text-stone-500">Workspace status</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="rounded-2xl bg-burgundy/5 p-3 text-burgundy">
              <PartyPopper className="size-5" />
            </div>
            <div>
              <p className="font-heading text-4xl font-bold text-burgundy">{inviteCards.length}</p>
              <p className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider mt-1">Active Invitations</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gold/10 pb-8">
          <div>
            <h1 className="font-heading text-4xl font-bold text-burgundy tracking-tight-display">Your Digital Heirlooms</h1>
            <p className="mt-3 text-sm leading-relaxed text-stone-500 max-w-xl text-pretty">
              Create, refine, and orchestrate your wedding portals from a warm, luxury digital studio.
            </p>
          </div>
          <Link href="/dashboard/invite/new" className={buttonStyles({ className: "active-scale uppercase tracking-wider text-[11px] font-bold h-12 px-6 bg-[linear-gradient(135deg,var(--color-burgundy)_0%,#3d000d_100%)] shadow-md" })}>
            Create invite
          </Link>
        </div>

        {inviteCards.length === 0 ? (
          <div className="surface-card rounded-[40px] p-16 text-center max-w-3xl mx-auto flex flex-col items-center">
            <div className="w-20 h-20 rounded-[32px] bg-[linear-gradient(135deg,var(--color-burgundy)_0%,#3d000d_100%)] shadow-lux flex items-center justify-center text-white mx-auto mb-8">
              <PartyPopper className="size-8" />
            </div>
            <h2 className="font-heading text-4xl font-bold text-ink tracking-tight-display text-balance">Your first invite starts here</h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/60 font-medium text-pretty">
              Set up your couple details, choose a cultural canvas, orchestrate rituals, and publish a beautiful heirloom portal in minutes.
            </p>
            <Link href="/dashboard/invite/new" className={buttonStyles({ className: "mt-10 active-scale uppercase tracking-widest text-[11px] font-bold h-14 px-10 bg-[linear-gradient(135deg,var(--color-burgundy)_0%,#3d000d_100%)] shadow-md" })}>
              Create your first invite
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-2">
            {inviteCards.map((invite) => (
              <div key={invite.id} className="surface-card spotlight-glow rounded-[32px] p-10 flex flex-col justify-between hover:shadow-2xl">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center rounded-full bg-gold/5 border border-gold/15 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
                      {invite.theme} theme
                    </span>
                    <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">
                      Studio Canvas
                    </span>
                  </div>
                  
                  <h2 className="mt-6 font-heading text-3xl font-bold text-burgundy leading-tight">{invite.coupleNames}</h2>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gold/5 pt-6 text-[11px] font-semibold tracking-wider uppercase text-stone-500">
                    <div>
                      <p className="text-[9px] text-stone-400">Wedding Date</p>
                      <p className="mt-1 text-stone-800 font-bold font-mono-lux tracking-widest">{formatShortDate(invite.weddingDate)}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-stone-400">Invite Link</p>
                      <p className="mt-1 text-burgundy font-bold font-mono-lux select-all">/{invite.slug}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gold/5 pt-6">
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">
                    Last update: <span className="font-mono-lux text-stone-600 font-bold">{formatShortDate(invite.updatedAt)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/dashboard/invite/${invite.id}/edit`}
                      className={buttonStyles({ size: "sm", className: "active-scale uppercase tracking-wider text-[10px] font-bold h-10 px-5" })}
                    >
                      Edit invite
                    </Link>
                    <Link
                      href={`/${invite.slug}`}
                      className={buttonStyles({ variant: "secondary", size: "sm", className: "active-scale uppercase tracking-wider text-[10px] font-bold h-10 px-5" })}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View page
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
