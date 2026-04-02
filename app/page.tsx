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

      <section className="section-shell grid gap-14 px-6 pb-24 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <FadeInSection>
          <div className="flex flex-col items-start gap-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-burgundy/50">
              The Digital Curator for Modern Weddings
            </p>
            <h1 className="max-w-2xl font-heading text-6xl font-medium leading-[1.05] tracking-tight text-burgundy sm:text-7xl lg:text-8xl">
              Your Wedding Invite, <br/> as a Digital Heirloom
            </h1>
            <p className="max-w-xl text-[17px] leading-relaxed text-stone-500/90">
              Create and share a wedding website that bridges thousand-year-old traditions with 
              contemporary digital elegance. Designed for the modern Indian celebration.
            </p>
            <div className="mt-4 flex flex-wrap gap-5">
              <Link href={ctaHref} className={buttonStyles({ size: "lg", className: "px-8" })}>
                Get Started
              </Link>
              <a href="#templates" className={buttonStyles({ variant: "secondary", size: "lg", className: "px-8" })}>
                View Templates
              </a>
            </div>
          </div>
        </FadeInSection>
        <div className="relative">
          <div className="bg-mandala absolute -inset-20 scale-150 rounded-full opacity-[0.04]" />
          <FloatingPreview />
        </div>
      </section>

      <section id="how-it-works" className="section-shell py-16">
        <FadeInSection>
          <SectionHeading
            eyebrow="How it works"
            title="From first click to shared invite in a few graceful steps"
            description="Everything is designed to keep you moving quickly while still delivering a polished, premium invitation experience."
          />
        </FadeInSection>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {howItWorks.map(({ title, description, icon: Icon }, index) => (
            <FadeInSection key={title} delay={index * 0.08}>
              <div className="surface-card rounded-[32px] p-8">
                <div className="inline-flex rounded-2xl bg-burgundy/5 p-4 text-burgundy">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-8 font-heading text-3xl font-medium text-burgundy">{title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-stone-500">{description}</p>
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
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ title, description, icon: Icon }, index) => (
            <FadeInSection key={title} delay={index * 0.06}>
              <div className="surface-card h-full rounded-[32px] p-8">
                <div className="inline-flex rounded-2xl bg-gold-fixed/20 p-4 text-gold">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-7 font-heading text-3xl font-medium text-burgundy">{title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-stone-500">{description}</p>
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
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeInSection key={testimonial.name} delay={index * 0.08}>
              <div className="surface-card h-full rounded-[32px] p-9">
                <p className="font-heading text-3xl font-medium leading-[1.3] text-burgundy">&quot;{testimonial.quote}&quot;</p>
                <div className="mt-8 flex flex-col gap-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-burgundy/40">
                    Couple
                  </p>
                  <p className="text-sm font-semibold text-stone-600">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <section className="section-shell py-24">
        <div className="bg-mandala relative overflow-hidden rounded-[48px] bg-burgundy-container px-6 py-20 text-center text-white shadow-[0_40px_100px_rgba(87,0,19,0.22)] sm:px-12">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(87,0,19,0.95)_0%,rgba(128,0,32,0.85)_100%)]" />
          <div className="relative z-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-white/50">Your Celebration Awaits</p>
            <h2 className="mt-6 font-heading text-5xl font-medium sm:text-6xl">Create Your Invitation Today</h2>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/80">
              Join hundreds of modern couples who chose beauty and ease for their digital wedding presence.
            </p>
            <Link
              href={ctaHref}
              className={buttonStyles({
                className: "mt-10 bg-white text-burgundy hover:bg-white/90 focus-visible:outline-white px-10",
                size: "lg",
              })}
            >
              Start Designing
            </Link>
          </div>
        </div>
      </section>

      <footer className="section-shell mb-12 border-t border-burgundy/5 pt-12 text-[13px] font-medium text-stone-400">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p className="font-heading text-2xl font-medium text-burgundy/30">Invitely</p>
            <p>© 2026 Crafted with love.</p>
          </div>
          <div className="flex items-center gap-10 uppercase tracking-widest text-burgundy/40">
            <Link href="/sign-in" className="hover:text-burgundy transition-colors">Sign in</Link>
            <a href="#templates" className="hover:text-burgundy transition-colors">Templates</a>
            <a href="#features" className="hover:text-burgundy transition-colors">Features</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
