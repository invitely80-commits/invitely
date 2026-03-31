import Link from "next/link";
import { CalendarDays, Camera, Map, MessageCircleHeart, Palette, Share2 } from "lucide-react";

import { FadeInSection } from "@/components/landing/fade-in-section";
import { FloatingPreview } from "@/components/landing/floating-preview";
import { SectionHeading } from "@/components/landing/section-heading";
import { SiteHeader } from "@/components/landing/site-header";
import { TemplatesShowcase } from "@/components/landing/templates-showcase";
import { buttonStyles } from "@/components/ui/button";
import { getSessionSafely } from "@/lib/session";

const howItWorks = [
  {
    title: "Choose a template",
    description: "Start with a refined minimal layout or a richer royal presentation.",
    icon: Palette,
  },
  {
    title: "Fill your details",
    description: "Add your names, events, story, venue details, and favorite photos.",
    icon: CalendarDays,
  },
  {
    title: "Share your link",
    description: "Send a polished wedding website that guests can open, save, and RSVP from.",
    icon: Share2,
  },
];

const features = [
  {
    title: "RSVP tracking",
    description: "Collect guest confirmations and monitor attendance from one dashboard.",
    icon: MessageCircleHeart,
  },
  {
    title: "Google Maps integration",
    description: "Help guests arrive smoothly with venue embeds and directions.",
    icon: Map,
  },
  {
    title: "Photo gallery",
    description: "Showcase pre-wedding portraits, engagement moments, and memories.",
    icon: Camera,
  },
  {
    title: "Calendar invites",
    description: "Let guests save the date directly to their calendars with one click.",
    icon: CalendarDays,
  },
];

const testimonials = [
  {
    quote:
      "Invitely made our invite feel personal, elegant, and so easy to share with family across cities.",
    name: "Ananya & Rohan",
  },
  {
    quote:
      "The RSVP dashboard saved us hours of phone calls and spreadsheet updates before the wedding week.",
    name: "Nisha & Harsh",
  },
  {
    quote:
      "We wanted a wedding website that looked premium, not generic. Invitely delivered exactly that.",
    name: "Sana & Veer",
  },
];

export default async function HomePage() {
  const session = await getSessionSafely();
  const ctaHref = session?.user?.id ? "/dashboard/invite/new" : "/sign-up";
  const ctaLabel = session?.user?.id ? "Dashboard" : "Create Your Invite";

  return (
    <main className="page-shell pb-16">
      <SiteHeader ctaHref={ctaHref} ctaLabel={ctaLabel} />

      <section className="section-shell grid gap-12 px-6 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <FadeInSection>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-maroon/70">
            Wedding Websites for Modern Couples
          </p>
          <h1 className="mt-6 max-w-2xl font-heading text-6xl leading-none text-maroon sm:text-7xl">
            Your Wedding Invitation, as a Beautiful Website
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            Create, share, and manage your wedding invite in minutes with a polished site designed
            for modern Indian celebrations.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href={ctaHref} className={buttonStyles({ size: "lg" })}>
              Create Your Invite
            </Link>
            <a href="#templates" className={buttonStyles({ variant: "secondary", size: "lg" })}>
              Explore Templates
            </a>
          </div>
        </FadeInSection>
        <FloatingPreview />
      </section>

      <section id="how-it-works" className="section-shell py-16">
        <FadeInSection>
          <SectionHeading
            eyebrow="How it works"
            title="From first click to shared invite in a few graceful steps"
            description="Everything is designed to keep you moving quickly while still delivering a polished, premium invitation experience."
          />
        </FadeInSection>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {howItWorks.map(({ title, description, icon: Icon }, index) => (
            <FadeInSection key={title} delay={index * 0.08}>
              <div className="surface-card rounded-[30px] p-6">
                <div className="inline-flex rounded-2xl bg-blush p-3 text-maroon">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-6 font-heading text-3xl text-maroon">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <section id="templates" className="section-shell py-16">
        <FadeInSection>
          <SectionHeading
            eyebrow="Templates"
            title="Choose the mood that fits your celebration"
            description="Switch between elegant minimalism and regal richness without losing your details, images, or RSVP flow."
          />
        </FadeInSection>
        <div className="mt-12">
          <TemplatesShowcase />
        </div>
      </section>

      <section id="features" className="section-shell py-16">
        <FadeInSection>
          <SectionHeading
            eyebrow="Features"
            title="Built for the details that matter before the big day"
            description="Invitely combines beauty with practical wedding planning tools so guests stay informed and couples stay organized."
          />
        </FadeInSection>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ title, description, icon: Icon }, index) => (
            <FadeInSection key={title} delay={index * 0.06}>
              <div className="surface-card h-full rounded-[28px] p-6">
                <div className="inline-flex rounded-2xl bg-cream p-3 text-maroon">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 font-heading text-3xl text-maroon">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <section id="testimonials" className="section-shell py-16">
        <FadeInSection>
          <SectionHeading
            eyebrow="Loved by modern couples"
            title="Warm words from weddings that wanted more than a PDF invite"
            description="Placeholder stories for now, ready to be swapped for live customer proof as Invitely grows."
          />
        </FadeInSection>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeInSection key={testimonial.name} delay={index * 0.08}>
              <div className="surface-card h-full rounded-[30px] p-7">
                <p className="font-heading text-3xl leading-10 text-maroon">&quot;{testimonial.quote}&quot;</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                  {testimonial.name}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="rounded-[40px] bg-[linear-gradient(135deg,#7a1f3d_0%,#a54a63_100%)] px-6 py-12 text-center text-white shadow-[0_25px_80px_rgba(122,31,61,0.18)] sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">Start today</p>
          <h2 className="mt-5 font-heading text-5xl">Create Your Wedding Invite Now</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/82">
            Launch a wedding website that feels personal, premium, and easy for every guest to use.
          </p>
          <Link
            href={ctaHref}
            className={buttonStyles({
              className: "mt-8 bg-white text-maroon hover:bg-white/90 focus-visible:outline-white",
              size: "lg",
            })}
          >
            Create Your Invite
          </Link>
        </div>
      </section>

      <footer className="section-shell border-t border-maroon/10 pt-8 text-sm text-stone-500">
        <div className="flex flex-col items-center justify-between gap-4 pb-8 sm:flex-row">
          <p>Invitely</p>
          <div className="flex items-center gap-5">
            <Link href="/sign-in">Sign in</Link>
            <a href="#templates">Templates</a>
            <a href="#features">Features</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
