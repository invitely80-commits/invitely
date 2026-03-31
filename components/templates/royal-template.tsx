import Image from "next/image";
import Link from "next/link";
import { CalendarPlus, MapPin, Sparkles } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { getGoogleCalendarUrl } from "@/lib/calendar";
import { getCoupleNames } from "@/lib/invites";
import { formatDisplayDate } from "@/lib/utils";

import { type TemplateInvite } from "@/components/templates/render-invite";

export function RoyalTemplate({
  invite,
  preview = false,
  rsvpSlot,
}: {
  invite: TemplateInvite;
  preview?: boolean;
  rsvpSlot?: React.ReactNode;
}) {
  const coupleNames = getCoupleNames(invite.data);
  const primaryEvent = invite.data.events[0];
  const heroImage = invite.data.heroImage || invite.data.gallery[0];

  return (
    <div className="overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#5c1530_0%,#7a1f3d_42%,#fff4e8_42%,#fff4e8_100%)] text-stone-800 shadow-[0_26px_90px_rgba(92,21,48,0.2)]">
      <section className="px-6 py-10 text-white sm:px-10 sm:py-14">
        <div className="rounded-[34px] border border-gold/35 bg-white/8 p-4 backdrop-blur-sm">
          <div className="grid gap-8 rounded-[28px] border border-gold/25 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[28px] border border-white/20">
              {heroImage ? (
                <div className="relative aspect-[4/5]">
                  <Image src={heroImage} alt={coupleNames} fill className="object-cover" sizes="500px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/50 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center bg-maroon/20 px-8 text-center text-white/80">
                  Upload images to bring this royal template to life.
                </div>
              )}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm text-gold">
                <Sparkles className="size-4" />
                A grand wedding celebration
              </div>
              <h1 className="mt-6 font-heading text-5xl sm:text-6xl">{coupleNames}</h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/82">{invite.data.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[22px] border border-white/20 bg-white/10 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Wedding date</p>
                  <p className="mt-2 font-heading text-2xl">{formatDisplayDate(invite.data.weddingDate)}</p>
                </div>
                {primaryEvent ? (
                  <div className="rounded-[22px] border border-white/20 bg-white/10 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Venue</p>
                    <p className="mt-2 font-heading text-2xl">{primaryEvent.venue}</p>
                  </div>
                ) : null}
              </div>
              {!preview && primaryEvent ? (
                <Link
                  href={getGoogleCalendarUrl(primaryEvent, coupleNames)}
                  className={buttonStyles({
                    className: "mt-8 bg-gold text-maroon hover:bg-[#ddb461] focus-visible:outline-gold",
                  })}
                  target="_blank"
                  rel="noreferrer"
                >
                  <CalendarPlus className="size-4" />
                  Add to Calendar
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 px-6 pb-10 sm:px-10 lg:grid-cols-[1fr_0.92fr]">
        <div className="space-y-5">
          <div className="rounded-[30px] border border-maroon/10 bg-white px-6 py-6 shadow-[0_18px_50px_rgba(122,31,61,0.08)]">
            <h2 className="font-heading text-3xl text-maroon">Celebration Timeline</h2>
            <div className="mt-6 space-y-4">
              {invite.data.events.map((event) => (
                <div
                  key={event.id}
                  className="rounded-[24px] border border-gold/20 bg-[linear-gradient(180deg,#fffaf5_0%,#fff2e7_100%)] px-5 py-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maroon/55">
                    {formatDisplayDate(event.date)}
                    {event.time ? ` - ${event.time}` : ""}
                  </p>
                  <h3 className="mt-3 font-heading text-3xl text-maroon">{event.title}</h3>
                  <div className="mt-4 flex items-start gap-3 text-sm text-stone-600">
                    <MapPin className="mt-0.5 size-4 text-gold" />
                    <div>
                      <p className="font-semibold text-stone-800">{event.venue}</p>
                      <p>{event.address}</p>
                    </div>
                  </div>
                  {event.description ? (
                    <p className="mt-4 text-sm leading-7 text-stone-600">{event.description}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          {invite.data.gallery.length > 0 ? (
            <div className="rounded-[30px] border border-maroon/10 bg-white px-6 py-6 shadow-[0_18px_50px_rgba(122,31,61,0.08)]">
              <h2 className="font-heading text-3xl text-maroon">Moments</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {invite.data.gallery.map((image, index) => (
                  <div key={`${image}-${index}`} className="relative aspect-[0.88] overflow-hidden rounded-[20px]">
                    <Image
                      src={image}
                      alt={`${coupleNames} gallery ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="260px"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-5">
          {primaryEvent ? (
            <div className="rounded-[30px] border border-maroon/10 bg-white px-6 py-6 shadow-[0_18px_50px_rgba(122,31,61,0.08)]">
              <h2 className="font-heading text-3xl text-maroon">Plan Your Arrival</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                Save the venue details and navigate straight to the festivities.
              </p>
              <div className="mt-5 overflow-hidden rounded-[20px] border border-maroon/10">
                <iframe
                  title={`Map for ${primaryEvent.venue}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(primaryEvent.address)}&z=15&output=embed`}
                  className="h-72 w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          ) : null}
          {!preview && rsvpSlot ? rsvpSlot : null}
        </div>
      </section>
    </div>
  );
}
