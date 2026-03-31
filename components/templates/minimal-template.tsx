import Image from "next/image";
import Link from "next/link";
import { CalendarPlus, ExternalLink, MapPin } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { getGoogleCalendarUrl } from "@/lib/calendar";
import { getCoupleNames } from "@/lib/invites";
import { formatDisplayDate } from "@/lib/utils";

import { type TemplateInvite } from "@/components/templates/render-invite";

export function MinimalTemplate({
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
    <div className="overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#fffdf9_0%,#fff3e7_100%)] text-stone-800 shadow-[0_24px_80px_rgba(122,31,61,0.1)]">
      <section className="relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(246,221,224,0.7),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(201,154,60,0.12),_transparent_30%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-maroon/60">
              Wedding Website
            </p>
            <h1 className="mt-5 font-heading text-5xl text-maroon sm:text-6xl">{coupleNames}</h1>
            <p className="mt-5 text-base leading-8 text-stone-600">{invite.data.description}</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <div className="rounded-full bg-white/85 px-4 py-3 text-stone-700 ring-1 ring-maroon/10">
                {formatDisplayDate(invite.data.weddingDate)}
              </div>
              {primaryEvent ? (
                <div className="rounded-full bg-white/85 px-4 py-3 text-stone-700 ring-1 ring-maroon/10">
                  {primaryEvent.venue}
                </div>
              ) : null}
            </div>
            {!preview && primaryEvent ? (
              <Link
                href={getGoogleCalendarUrl(primaryEvent, coupleNames)}
                className={buttonStyles({ className: "mt-8" })}
                target="_blank"
                rel="noreferrer"
              >
                <CalendarPlus className="size-4" />
                Add to Calendar
              </Link>
            ) : null}
          </div>
          <div className="overflow-hidden rounded-[30px] border border-white/60 bg-white/75 p-3 shadow-[0_20px_60px_rgba(122,31,61,0.08)]">
            {heroImage ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
                <Image src={heroImage} alt={coupleNames} fill className="object-cover" sizes="520px" />
              </div>
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center rounded-[24px] bg-blush text-center text-maroon">
                Add your first gallery image to personalize this template.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-8 px-6 pb-10 sm:px-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-5">
          <div className="rounded-[28px] border border-maroon/10 bg-white/80 p-6">
            <h2 className="font-heading text-3xl text-maroon">Events</h2>
            <div className="mt-6 space-y-4">
              {invite.data.events.map((event) => (
                <div key={event.id} className="rounded-[24px] border border-maroon/10 bg-white px-5 py-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-heading text-2xl text-maroon">{event.title}</h3>
                      <p className="mt-1 text-sm font-medium text-stone-500">
                        {formatDisplayDate(event.date)}
                        {event.time ? ` - ${event.time}` : ""}
                      </p>
                    </div>
                    {!preview ? (
                      <Link
                        href={getGoogleCalendarUrl(event, coupleNames)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-maroon"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Add to calendar
                        <ExternalLink className="size-4" />
                      </Link>
                    ) : null}
                  </div>
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
            <div className="rounded-[28px] border border-maroon/10 bg-white/80 p-6">
              <h2 className="font-heading text-3xl text-maroon">Gallery</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {invite.data.gallery.map((image, index) => (
                  <div key={`${image}-${index}`} className="relative aspect-square overflow-hidden rounded-[22px]">
                    <Image
                      src={image}
                      alt={`${coupleNames} gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="280px"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-5">
          {primaryEvent ? (
            <div className="rounded-[28px] border border-maroon/10 bg-white/80 p-6">
              <h2 className="font-heading text-3xl text-maroon">Venue</h2>
              <p className="mt-2 text-sm leading-7 text-stone-600">
                Find the celebration at {primaryEvent.venue}.
              </p>
              <div className="mt-5 overflow-hidden rounded-[22px] border border-maroon/10">
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
