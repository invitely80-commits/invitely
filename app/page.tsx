import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Layers, MessageSquare, Monitor, Palette, Sparkles, Wand2 } from "lucide-react";

import { FadeIn, ScaleIn } from "@/components/landing/motion";
import { HeroPreview } from "@/components/landing/hero-preview";
import { SiteHeader } from "@/components/landing/site-header";
import { TraditionIcons } from "@/components/landing/tradition-icons";
import { buttonStyles } from "@/components/ui/button";
import { getSessionSafely } from "@/lib/session";

export default async function HomePage() {
  const session = await getSessionSafely();
  const ctaHref = session?.user?.id ? "/dashboard/invite/new" : "/sign-up";
  const ctaLabel = session?.user?.id ? "Dashboard" : "Start Customizing";

  return (
    <main className="page-shell bg-ivory/50">
      <SiteHeader ctaHref={ctaHref} ctaLabel={ctaLabel} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="section-shell">
          <div className="grid gap-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <FadeIn direction="up" className="flex flex-col items-start gap-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-burgundy/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-burgundy/60">
                <Sparkles className="h-3.5 w-3.5" />
                <span>The Future of Wedding Stationery</span>
              </div>
              <h1 className="max-w-2xl font-heading text-6xl font-medium leading-[1.05] tracking-tight text-burgundy sm:text-7xl lg:text-8xl">
                A wedding invitation, <br />
                <span className="italic text-gold italic-heading font-normal">but it&apos;s a website.</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-stone-500/90 font-medium">
                Built in minutes, shared in seconds. Create a digital heirloom 
                that handles RSVPs, Maps, and Calendars automatically.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link href={ctaHref} className={buttonStyles({ size: "lg", className: "px-10 h-16 text-base rounded-2xl bg-burgundy hover:bg-burgundy/90 shadow-xl shadow-burgundy/20" })}>
                  {ctaLabel}
                </Link>
                <Link href="#preview" className={buttonStyles({ variant: "secondary", size: "lg", className: "px-10 h-16 text-base rounded-2xl border-stone-200 bg-white" })}>
                  View Demo
                </Link>
              </div>
            </FadeIn>

            <HeroPreview />
          </div>
        </div>
      </section>

      {/* Trust/Icon Section */}
      <section className="section-shell py-20">
        <div className="grid gap-12 sm:grid-cols-3">
          {[
            { icon: Palette, title: "Beyond Paper", desc: "Fade from static string to vibrant story. Personalized without sacrificing an ounce of elegance." },
            { icon: MessageSquare, title: "Truly Personal", desc: "WhatsApp & WhatsApp international. Create a dedicated space that tells your unique story." },
            { icon: Wand2, title: "Auto-Magic", desc: "Instant RSVP tracking, Google Maps integration, and automated calendar reminders for every guest." },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1} className="flex flex-col items-center text-center lg:items-start lg:text-left gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-burgundy/5 text-burgundy shadow-sm ring-1 ring-burgundy/10">
                <item.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-2xl font-medium text-stone-800">{item.title}</h3>
              <p className="text-sm leading-relaxed text-stone-500 font-medium">{item.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-ivory/30 py-32">
        <div className="section-shell">
          <FadeIn direction="up" className="text-center mb-20">
            <h2 className="font-heading text-5xl font-medium text-burgundy lg:text-6xl">Designed for Joy, Not Stress</h2>
            <p className="mt-6 text-lg text-stone-500">Experience the most seamless journey to organize your celebration.</p>
          </FadeIn>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "Step 01", title: "Choose Theme", desc: "Select from our library of culture-specific, designer-vetted digital heirloom templates.", icon: Palette },
              { step: "Step 02", title: "Add Details", desc: "Input your events, schedule and visuals. Our design engine optimizes layout and typography automatically.", icon: Layers },
              { step: "Step 03", title: "Publish & Share", desc: "Get a custom domain or link shared via WhatsApp with QR code. Track who has opened your invite.", icon: ChevronRight },
            ].map((step, i) => (
              <ScaleIn key={i} delay={i * 0.1} className="surface-card group aspect-[4/5] flex flex-col justify-end p-10 rounded-[40px] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative">
                <div className="absolute top-10 left-10 h-14 w-14 rounded-2xl bg-burgundy/5 flex items-center justify-center text-burgundy group-hover:scale-110 transition-transform duration-500">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="relative z-10 text-left">
                  <span className="text-[10px] font-bold uppercase tracking-[.3em] text-burgundy/40">{step.step}</span>
                  <h3 className="mt-3 font-heading text-3xl font-medium text-burgundy">{step.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-stone-500">{step.desc}</p>
                </div>
                <div className="absolute bottom-0 right-0 p-8 text-burgundy/5 transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
                   <ArrowRight size={120} strokeWidth={1} />
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Traditions Section */}
      <section className="relative bg-burgundy overflow-hidden py-32 text-center">
        <div className="bg-mandala absolute inset-0 opacity-[0.03] scale-125" />
        <div className="section-shell relative z-10">
          <FadeIn direction="none" scale={0.95}>
            <h2 className="font-heading text-5xl font-medium text-white lg:text-7xl">Built for Every Tradition</h2>
            <p className="mt-8 text-lg text-white/60 max-w-2xl mx-auto">We honor the unique rituals of every heritage with bespoke iconography and meticulous aesthetics curated for your legacy.</p>
          </FadeIn>

          <div className="mt-20 grid grid-cols-2 gap-px bg-white/10 overflow-hidden rounded-3xl border border-white/10 md:grid-cols-5">
            {[
              { name: "Hindu", icon: TraditionIcons.Hindu },
              { name: "Muslim", icon: TraditionIcons.Muslim },
              { name: "Christian", icon: TraditionIcons.Christian },
              { name: "Sikh", icon: TraditionIcons.Sikh },
              { name: "Civil", icon: TraditionIcons.Civil },
            ].map((tradition, i) => (
              <div key={i} className="group relative bg-[#4A0413] py-16 px-6 transition-colors hover:bg-white/[0.03]">
                <tradition.icon />
                <p className="mt-6 text-xs font-bold uppercase tracking-[.3em] text-white/50 group-hover:text-gold transition-colors">{tradition.name}</p>
              </div>
            ))}
          </div>
          
          <Link href="/templates" className="mt-16 inline-flex items-center gap-3 text-gold hover:text-white transition-colors font-semibold group">
            Explore all templates <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 bg-white">
        <div className="section-shell text-center">
          <FadeIn direction="up">
            <div className="flex justify-center mb-10">
              <MessageSquare className="h-12 w-12 text-stone-200" strokeWidth={1} />
            </div>
            <blockquote className="max-w-4xl mx-auto italic font-heading text-4xl font-medium leading-[1.4] text-burgundy sm:text-5xl">
              &quot;Invitely turned our chaotic WhatsApp group chats into a single source of truth. 
              The design felt just as premium as our physical cards, but with 10x the convenience.&quot;
            </blockquote>
            
            <div className="mt-16 flex flex-col items-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-ivory shadow-xl">
                 <Image 
                   src="https://images.unsplash.com/photo-1549416801-44755106599b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                   alt="Couple"
                   fill
                   className="object-cover"
                 />
              </div>
              <div className="mt-6">
                <p className="font-heading text-xl font-medium text-burgundy">Ananya & Arjun</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-1">Honeymooners, Dec 2025</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-shell pb-24">
        <div className="relative overflow-hidden rounded-[48px] bg-burgundy px-10 py-24 text-center ring-1 ring-white/10 shadow-[0_50px_100px_-20px_rgba(87,0,19,0.3)]">
          <div className="bg-mandala absolute inset-0 opacity-[0.03] scale-150 rotate-45" />
          <div className="relative z-10 flex flex-col items-center">
             <FadeIn direction="up">
                <h2 className="font-heading text-5xl font-medium text-white sm:text-7xl">
                   Ready to curate your heirloom?
                </h2>
                <p className="mx-auto mt-8 max-w-xl text-lg text-white/50">
                  Join 15,000+ couples who celebrated with digital elegance.
                </p>
                <Link
                  href={ctaHref}
                  className="mt-12 inline-flex h-16 items-center rounded-2xl bg-[#735C00] px-10 text-base font-bold text-white shadow-2xl transition-all hover:bg-[#8B7000] hover:scale-105 active:scale-95"
                >
                  Create Your Website Today
                </Link>
             </FadeIn>
          </div>
        </div>
      </section>

      <footer className="bg-white pt-24 pb-12">
        <div className="section-shell grid gap-16 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-6">
            <span className="font-heading text-3xl font-bold tracking-tighter text-burgundy">Invitely</span>
            <p className="max-w-xs text-sm leading-relaxed text-stone-400">
              Leading digital invitations for the modern world. Marrying ancient elegance with modern convenience.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[.3em] text-burgundy/40">Company</h4>
            <nav className="flex flex-col gap-3 text-sm font-medium text-stone-400">
              <Link href="#" className="hover:text-burgundy transition-colors">Our Story</Link>
              <Link href="#" className="hover:text-burgundy transition-colors">Careers</Link>
              <Link href="#" className="hover:text-burgundy transition-colors">Press</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[.3em] text-burgundy/40">Support</h4>
            <nav className="flex flex-col gap-3 text-sm font-medium text-stone-400">
              <Link href="#" className="hover:text-burgundy transition-colors">Help Center</Link>
              <Link href="#" className="hover:text-burgundy transition-colors">Contact</Link>
              <Link href="#" className="hover:text-burgundy transition-colors">Status</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[.3em] text-burgundy/40">Legal</h4>
            <nav className="flex flex-col gap-3 text-sm font-medium text-stone-400">
              <Link href="#" className="hover:text-burgundy transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-burgundy transition-colors">Terms</Link>
            </nav>
          </div>
        </div>
        <div className="section-shell mt-24 flex items-center justify-between border-t border-stone-100 pt-12">
          <p className="text-[11px] text-stone-400">© 2026 Invitely Digital Networks. Crafted with love.</p>
          <div className="flex gap-6 text-stone-400">
             <Link href="#" className="hover:text-burgundy transition-colors"><Monitor size={18} /></Link>
             <Link href="#" className="hover:text-burgundy transition-colors text-lg">𝕏</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
