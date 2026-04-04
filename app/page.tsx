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
      <section className="relative overflow-hidden pt-40 pb-24 lg:pt-56 lg:pb-40 px-6 hero-reveal">
        <div className="section-shell">
          <div className="grid gap-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <FadeIn direction="up" className="flex flex-col items-start gap-10">
              <div className="inline-flex items-center gap-3 rounded-full bg-burgundy/5 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-burgundy/70 ring-1 ring-burgundy/10">
                <Sparkles className="h-4 w-4" />
                <span>The Future of Wedding Stationery</span>
              </div>
              <h1 className="max-w-3xl font-heading text-6xl font-medium leading-[1] tracking-tighter text-burgundy sm:text-7xl lg:text-8xl text-balance">
                A wedding invitation, <br />
                <span className="italic text-gold italic-heading font-serif-lux font-normal">but it&apos;s a website.</span>
              </h1>
              <p className="max-w-xl text-xl leading-relaxed text-stone-500/80 font-medium">
                Built in minutes, shared in seconds. Create a digital heirloom 
                that handles RSVPs, Maps, and Calendars with effortless elegance.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <Link href={ctaHref} className={buttonStyles({ size: "lg", className: "px-12 h-18 text-base rounded-[24px] bg-burgundy hover:bg-burgundy/90 shadow-2xl shadow-burgundy/20 hover:scale-105 active:scale-95 transition-all" })}>
                  {ctaLabel}
                </Link>
                <Link href="#preview" className={buttonStyles({ variant: "secondary", size: "lg", className: "px-12 h-18 text-base rounded-[24px] border-stone-200 bg-white hover:bg-ivory transition-colors shadow-sm" })}>
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
      <section id="preview" className="bg-ivory/30 py-48 relative overflow-hidden">
        <div className="bg-mandala absolute inset-0 opacity-[0.01] scale-150 rotate-12" />
        <div className="section-shell relative z-10">
          <FadeIn direction="up" className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="font-heading text-5xl font-medium text-burgundy lg:text-6xl tracking-tight leading-tight">Designed for Joy, Not Stress</h2>
            <p className="mt-8 text-xl text-stone-500/80 leading-relaxed font-medium">Experience the most seamless journey to organize your celebration.</p>
          </FadeIn>
          
          <div className="grid gap-10 md:grid-cols-3">
            {[
              { step: "Step 01", title: "Choose Theme", desc: "Select from our library of culture-specific, designer-vetted digital heirloom templates.", icon: Palette },
              { step: "Step 02", title: "Add Details", desc: "Input your events, schedule and visuals. Our design engine optimizes layout and typography automatically.", icon: Layers },
              { step: "Step 03", title: "Publish & Share", desc: "Get a custom domain or link shared via WhatsApp with QR code. Track who has opened your invite.", icon: ChevronRight },
            ].map((step, i) => (
              <ScaleIn key={i} delay={i * 0.15} className="surface-card group aspect-[4/5] flex flex-col justify-end p-12 rounded-[48px] overflow-hidden relative">
                <div className="absolute top-12 left-12 h-16 w-16 rounded-[24px] bg-burgundy/5 flex items-center justify-center text-burgundy/60 group-hover:bg-burgundy group-hover:text-white transition-all duration-700 ease-lux shadow-sm group-hover:shadow-xl group-hover:shadow-burgundy/20">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="relative z-10 text-left space-y-4">
                  <span className="text-[11px] font-bold uppercase tracking-[.4em] text-gold">{step.step}</span>
                  <h3 className="font-heading text-3xl font-medium text-burgundy tracking-tight">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-500/90 font-medium">{step.desc}</p>
                </div>
                <div className="absolute bottom-0 right-0 p-10 text-burgundy/5 transform translate-x-6 translate-y-6 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-1000 ease-lux">
                   <ArrowRight size={140} strokeWidth={1} />
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Traditions Section */}
      <section className="relative bg-burgundy overflow-hidden py-48 text-center">
        <div className="bg-mandala absolute inset-0 opacity-[0.04] scale-150 rotate-45" />
        <div className="section-shell relative z-10">
          <FadeIn direction="none" scale={0.98}>
            <h2 className="font-heading text-5xl font-medium text-white lg:text-7xl tracking-tighter leading-tight">Built for Every Tradition</h2>
            <p className="mt-10 text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">We honor the unique rituals of every heritage with bespoke iconography and meticulous aesthetics curated for your legacy.</p>
          </FadeIn>

          <div className="mt-24 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
            {[
              { name: "Hindu", icon: TraditionIcons.Hindu },
              { name: "Muslim", icon: TraditionIcons.Muslim },
              { name: "Christian", icon: TraditionIcons.Christian },
              { name: "Sikh", icon: TraditionIcons.Sikh },
              { name: "Civil", icon: TraditionIcons.Civil },
            ].map((tradition, i) => (
              <FadeIn key={i} delay={i * 0.1} className="group relative bg-white/[0.03] p-12 rounded-[40px] border border-white/10 transition-all hover:bg-white/[0.08] hover:scale-105 active:scale-95 duration-500">
                <tradition.icon />
                <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.4em] text-white/40 group-hover:text-gold transition-colors">{tradition.name}</p>
              </FadeIn>
            ))}
          </div>
          
          <Link href="/templates" className="mt-20 inline-flex items-center gap-4 text-gold hover:text-white transition-all font-bold uppercase tracking-widest text-[11px] group pb-2 border-b border-gold/20 hover:border-white/40">
            Explore all templates <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-48 bg-white overflow-hidden relative">
        <div className="section-shell text-center">
          <FadeIn direction="up">
            <div className="flex justify-center mb-16">
              <div className="h-20 w-20 rounded-full bg-burgundy/5 flex items-center justify-center text-burgundy/20">
                <MessageSquare className="h-10 w-10 shrink-0" strokeWidth={1} />
              </div>
            </div>
            <blockquote className="max-w-5xl mx-auto font-serif-lux text-4xl italic font-medium leading-[1.3] text-burgundy sm:text-6xl tracking-tight text-balance">
              &quot;Invitely turned our chaotic WhatsApp group chats into a single source of truth. 
              The design felt just as premium as our physical cards, but with 10x the convenience.&quot;
            </blockquote>
            
            <div className="mt-20 flex flex-col items-center">
              <div className="relative h-28 w-28 overflow-hidden rounded-full ring-8 ring-ivory/50 shadow-2xl transition-transform hover:scale-110 duration-700">
                 <Image 
                   src="/images/templates/royal/rajasthani_palace_interior.png"
                   alt="Ananya & Arjun"
                   fill
                   className="object-cover"
                 />
              </div>
              <div className="mt-8 space-y-2">
                <p className="font-heading text-2xl font-medium tracking-tight text-burgundy uppercase tracking-[0.2em] text-[15px]">Ananya & Arjun</p>
                <div className="h-px w-8 bg-gold/30 mx-auto" />
                <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-stone-400">Jaipur . Rajasthan . 2025</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-shell pb-32">
        <div className="relative overflow-hidden rounded-[64px] bg-burgundy px-10 py-32 text-center ring-1 ring-white/10 shadow-[0_60px_120px_-20px_rgba(87,0,19,0.4)]">
          <div className="bg-mandala absolute inset-0 opacity-[0.04] scale-[2] rotate-45" />
          <div className="relative z-10 flex flex-col items-center">
             <FadeIn direction="up">
                <h2 className="font-heading text-5xl font-medium text-white sm:text-7xl tracking-tighter leading-tight max-w-4xl">
                   Ready to curate your heirloom?
                </h2>
                <p className="mx-auto mt-10 max-w-xl text-xl text-white/50 leading-relaxed font-medium">
                  Join 15,000+ couples who celebrated with effortless digital elegance.
                </p>
                <Link
                  href={ctaHref}
                  className="mt-14 inline-flex h-20 items-center justify-center rounded-[28px] bg-gold px-12 text-base font-bold text-white shadow-[0_20px_50px_rgba(115,92,0,0.4)] transition-all hover:bg-gold/90 hover:scale-105 active:scale-95 duration-500 ease-lux group"
                >
                  Create Your Website Today
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
             </FadeIn>
          </div>
        </div>
      </section>

      <footer className="bg-white pt-32 pb-16">
        <div className="section-shell grid gap-20 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-8">
            <span className="font-heading text-4xl font-bold tracking-tighter text-burgundy">Invitely</span>
            <p className="max-w-xs text-base leading-relaxed text-stone-400 font-medium">
              Leading digital invitations for the modern world. Marrying heritage rituals with modern convenience.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <h4 className="text-[12px] font-bold uppercase tracking-[.4em] text-burgundy/40">Collections</h4>
            <nav className="flex flex-col gap-4 text-[13px] font-semibold text-stone-400">
              <Link href="/templates?theme=hindu" className="hover:text-gold transition-colors">Hindu</Link>
              <Link href="/templates?theme=muslim" className="hover:text-gold transition-colors">Muslim</Link>
              <Link href="/templates?theme=christian" className="hover:text-gold transition-colors">Christian</Link>
              <Link href="/templates?theme=royal" className="hover:text-gold transition-colors">Royal Heritage</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-8">
            <h4 className="text-[12px] font-bold uppercase tracking-[.4em] text-burgundy/40">Company</h4>
            <nav className="flex flex-col gap-4 text-[13px] font-semibold text-stone-400">
              <Link href="#" className="hover:text-burgundy transition-colors">Our Story</Link>
              <Link href="#" className="hover:text-burgundy transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-burgundy transition-colors">Privacy Policy</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-8">
            <h4 className="text-[12px] font-bold uppercase tracking-[.4em] text-burgundy/40">Support</h4>
            <nav className="flex flex-col gap-4 text-[13px] font-semibold text-stone-400">
              <Link href="#" className="hover:text-burgundy transition-colors">Help Center</Link>
              <Link href="#" className="hover:text-burgundy transition-colors">Contact Us</Link>
              <Link href="#" className="hover:text-burgundy transition-colors">Documentation</Link>
            </nav>
          </div>
        </div>
        <div className="section-shell mt-32 flex flex-col sm:flex-row items-center justify-between border-t border-stone-100 pt-16 gap-8">
          <p className="text-[12px] font-medium text-stone-400 tracking-wide">© 2026 Invitely Digital Networks. Crafted for the Legacy Modernist.</p>
          <div className="flex gap-8 text-stone-400 items-center">
             <Link href="#" className="hover:text-burgundy transition-all hover:scale-110"><Monitor size={20} strokeWidth={1.5} /></Link>
             <Link href="#" className="hover:text-burgundy transition-all hover:scale-110 font-bold text-xl">𝕏</Link>
             <div className="h-6 w-px bg-stone-200 hidden sm:block" />
             <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">English (US)</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
