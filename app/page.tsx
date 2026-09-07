import Link from "next/link";
import { ArrowRight, Layers, MessageSquare, Palette, Sparkles, Wand2, Globe, ShieldCheck } from "lucide-react";

import { FadeIn, ScaleIn } from "@/components/landing/motion";
import { SiteHeader } from "@/components/landing/site-header";
import { EditorialHero } from "@/components/landing/editorial-hero";
import { TraditionIcons } from "@/components/landing/tradition-icons";
import { GsapOrchestrator } from "@/components/landing/gsap-orchestrator";
import { getSessionSafely } from "@/lib/session";
import Image from "next/image";

export default async function HomePage() {
  const session = await getSessionSafely();
  const ctaHref = session?.user?.id ? "/dashboard/invite/new" : "/sign-up";
  const ctaLabel = session?.user?.id ? "Dashboard" : "Start Customizing";

  return (
    <main className="page-shell bg-vellum overflow-x-hidden w-full max-w-full">
      <GsapOrchestrator />
      <SiteHeader ctaHref={ctaHref} ctaLabel={ctaLabel} />

      <EditorialHero ctaHref={ctaHref} ctaLabel={ctaLabel} />

      {/* Feature Section: The Logic of Elegance */}
      <section id="features" className="pt-32 pb-40 lg:pt-40 lg:pb-56 px-6 scroll-mt-32">
        <div className="section-shell">
          <FadeIn direction="up" className="mb-24 space-y-5">
             <span className="text-[11px] font-bold uppercase tracking-widest-label text-gold">The Capability</span>
             <h2 className="font-heading text-4xl lg:text-6xl font-bold tracking-tight-display text-ink max-w-2xl text-balance">Orchestrated with Precision</h2>
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-12 lg:grid-rows-2">
             <FadeIn delay={0.1} className="lg:col-span-7 lg:row-span-2 surface-card p-12 lg:p-16 rounded-[48px] space-y-12 flex flex-col justify-between group">
                <div className="h-16 w-16 rounded-3xl bg-burgundy/5 flex items-center justify-center text-burgundy group-hover:bg-burgundy group-hover:text-white transition-all duration-500">
                   <Palette className="h-7 w-7" />
                </div>
                <div className="space-y-4 max-w-md">
                   <h3 className="font-heading text-3xl font-bold tracking-tight-display text-ink">Digital Materiality</h3>
                   <p className="text-base text-ink/60 font-medium leading-relaxed text-pretty">Beyond a static screen. We create tactile digital heirlooms that feel as physical as premium custom-milled stationery. Notice the grain, the light, the typography.</p>
                </div>
             </FadeIn>

             <FadeIn delay={0.2} className="lg:col-span-5 lg:row-span-1 p-10 lg:p-12 rounded-[40px] space-y-8 flex flex-col justify-between group bg-[#161614] text-white shadow-lux">
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-gold">
                   <Globe className="h-5 w-5" />
                </div>
                <div className="space-y-3">
                   <h3 className="font-heading text-2xl font-bold tracking-tight-display !text-white">Global Accessibility</h3>
                   <p className="text-sm text-white/50 font-medium leading-relaxed text-pretty">Integrated real-time RSVP portals, dynamic Google Maps pins, and calendar integrations for guests across the globe.</p>
                </div>
             </FadeIn>

             <FadeIn delay={0.3} className="lg:col-span-5 lg:row-span-1 surface-card p-10 lg:p-12 rounded-[40px] space-y-8 flex flex-col justify-between group">
                <div className="h-12 w-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
                   <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-3">
                   <h3 className="font-heading text-2xl font-bold tracking-tight-display text-ink">Refined Privacy</h3>
                   <p className="text-sm text-ink/60 font-medium leading-relaxed text-pretty">Secure, exclusive access to your wedding details. Control exactly who sees your heritage events with password protections.</p>
                </div>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* Process: The Journey */}
      <section className="bg-silk pt-32 pb-40 lg:pt-40 lg:pb-56 px-6 gsap-journey-container overflow-hidden">
        <div className="section-shell">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-20 items-center">
              <FadeIn direction="up" className="space-y-8 lg:pr-12 relative z-10">
                 <span className="text-[11px] font-bold uppercase tracking-widest-label text-gold">How it Works</span>
                 <h2 className="font-heading text-4xl lg:text-6xl font-bold tracking-tight-display text-ink leading-[1.1]">Meticulously Crafted, <br />Effortlessly Launched</h2>
                 <p className="text-lg text-ink/50 font-medium leading-relaxed max-w-md text-pretty">Our intentional design engine ensures every pixel aligns with your heritage, while we handle the complexity of the modern web.</p>
                
                <div className="pt-8 space-y-12">
                   {[
                     { step: "01", title: "Select your Aesthetic", desc: "Choose from curated cultural themes." },
                     { step: "02", title: "Refine Details", desc: "Add rituals, maps, and moments." },
                     { step: "03", title: "Invite the World", desc: "Share via WhatsApp or Custom Link." },
                   ].map((item, i) => (
                     <div key={i} className="flex gap-8 group">
                        <span className="text-2xl font-serif-lux italic text-gold/40 group-hover:text-gold transition-colors">{item.step}</span>
                        <div className="space-y-1">
                           <h4 className="text-lg font-bold text-ink">{item.title}</h4>
                           <p className="text-sm text-ink/40 font-medium">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </FadeIn>

             <div className="relative aspect-[4/3] rounded-[48px] overflow-hidden shadow-lux">
                <Image 
                  src="/images/templates/royal/rajasthani_palace_interior.png"
                  alt="Design Interface"
                  fill
                  className="object-cover scale-125 gsap-journey-image origin-top"
                />
                <div className="absolute inset-0 bg-ink/15" />
                <div className="absolute inset-x-8 bottom-8 glass-card p-8 rounded-[28px] flex items-center justify-between">
                   <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gold text-ink/30">System Status</p>
                      <p className="text-base font-bold text-ink">Interface Optimized</p>
                   </div>
                   <div className="h-10 w-10 rounded-full bg-ink flex items-center justify-center text-white active-scale cursor-pointer">
                      <ArrowRight className="h-4 w-4" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Traditions Section */}
      <section className="bg-[#121210] pt-32 pb-48 lg:pt-48 lg:pb-64 px-6 relative overflow-hidden text-center text-white gsap-tradition-container">
        <div className="bg-mandala absolute inset-0 opacity-[0.03] scale-150 rotate-12" />
        <div className="section-shell relative z-10">
          <div className="max-w-3xl mx-auto space-y-6 gsap-tradition-title pb-12 lg:pb-0">
            <span className="text-[11px] font-bold uppercase tracking-widest-label text-gold">The Collection</span>
            <h2 className="font-heading text-4xl lg:text-7xl font-bold tracking-tight-display text-balance">Built for Every Tradition</h2>
            <p className="text-lg text-white/40 font-medium leading-relaxed text-pretty">We honor the unique rituals of every heritage with bespoke iconography and meticulous aesthetics curated for your legacy.</p>
          </div>

          <div className="mt-12 lg:mt-64 grid grid-cols-2 lg:grid-cols-5 gap-6 gsap-tradition-cards-wrapper relative z-20">
            {[
              { name: "Hindu", icon: TraditionIcons.Hindu },
              { name: "Muslim", icon: TraditionIcons.Muslim },
              { name: "Christian", icon: TraditionIcons.Christian },
              { name: "Sikh", icon: TraditionIcons.Sikh },
              { name: "Civil", icon: TraditionIcons.Civil },
            ].map((tradition, i) => (
              <div key={i} className="gsap-tradition-card group relative bg-white/[0.02] p-10 rounded-[32px] border border-white/5 transition-all hover:bg-white/[0.06] hover:-translate-y-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] duration-500">
                <div className="scale-110 mb-2 flex justify-center"><tradition.icon /></div>
                <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 group-hover:text-gold transition-colors">{tradition.name}</p>
              </div>
            ))}
          </div>
          
          <Link href="/templates" className="mt-20 inline-flex items-center gap-4 text-gold hover:text-white transition-all font-bold uppercase tracking-widest text-[10px] group pb-2 border-b border-gold/20 hover:border-white/40 active-scale">
            Explore all aesthetics <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>
      </section>

      {/* Testimonial: The Legacy Quote */}
      <section className="py-32 lg:py-56 px-6 text-center">
        <div className="section-shell">
          <FadeIn direction="up">
            <div className="flex justify-center mb-12">
               <MessageSquare className="h-10 w-10 text-gold opacity-30" strokeWidth={1.5} />
            </div>
            <blockquote className="max-w-4xl mx-auto font-serif-lux text-2xl lg:text-5xl italic font-normal leading-[1.3] text-ink tracking-tight text-balance">
              &quot;Invitely turned our chaotic group chats into a single source of truth. 
              The design felt just as premium as our physical cards, but with 10x the convenience.&quot;
            </blockquote>
            
            <div className="mt-16 flex flex-col items-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-[28px] border border-gold/20 shadow-lux bg-silk p-1.5 transition-transform duration-500 hover:rotate-3">
                 <div className="relative w-full h-full rounded-[20px] overflow-hidden">
                   <Image 
                     src="/images/templates/royal/rajasthani_palace_interior.png"
                     alt="Success Story"
                     fill
                     className="object-cover"
                   />
                 </div>
              </div>
              <div className="mt-6 space-y-1">
                <p className="font-heading text-base font-bold tracking-widest text-ink uppercase tracking-[0.25em]">Ananya & Arjun</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold">Jaipur . 2025</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA: Final Elevation */}
      <section className="pb-32 lg:pb-48 px-6 mt-[-32px] relative z-20">
        <div className="section-shell">
          <div className="relative overflow-hidden rounded-[56px] bg-[linear-gradient(135deg,var(--color-burgundy)_0%,#3d000d_100%)] px-8 py-24 lg:py-40 text-center shadow-[0_40px_100px_-20px_rgba(87,0,19,0.25)] border-none">
            <div className="bg-mandala absolute inset-0 opacity-[0.04] scale-[1.8] rotate-12" />
            <div className="relative z-10 flex flex-col items-center space-y-12">
               <FadeIn direction="up" className="space-y-6">
                  <h2 className="font-heading text-4xl lg:text-7xl font-bold text-white tracking-tight-display leading-[1.05] max-w-3xl text-balance">
                     Ready to Curate <br />Your Heirloom?
                  </h2>
                  <p className="mx-auto max-w-xl text-base lg:text-lg text-white/60 font-medium text-pretty">
                     Join thousands of couples creating their definitive digital legacy.
                  </p>
               </FadeIn>
               
               <FadeIn direction="up" delay={0.1}>
                 <Link
                   href={ctaHref}
                   className="inline-flex h-18 items-center justify-center rounded-full bg-[linear-gradient(135deg,#c99a3c_0%,var(--color-gold)_100%)] px-12 text-[11px] font-bold uppercase tracking-widest text-white shadow-gold transition-all duration-300 hover:brightness-110 active-scale group"
                 >
                   Start Your Website
                   <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                 </Link>
               </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 border-t border-ink/5 text-ink/40">
        <div className="section-shell grid gap-16 lg:grid-cols-[2fr_1fr_1fr_1fr]">
           <div className="space-y-8">
              <span className="font-heading text-4xl font-bold tracking-tighter text-ink">Invitely.</span>
              <p className="max-w-xs text-sm leading-relaxed font-medium">Modern Heritage. Digital Elegance. The definitive platform for the legacy modernist.</p>
           </div>
           {/* Footer columns... (keeping same as before for functionality) */}
           <div className="space-y-8">
             <h4 className="text-[10px] font-bold uppercase tracking-widest text-ink">Platform</h4>
             <div className="flex flex-col gap-4 text-xs font-bold">
                <Link href="/templates" className="hover:text-gold">Collection</Link>
                <Link href="#" className="hover:text-gold">Features</Link>
                <Link href="#" className="hover:text-gold">Legacy</Link>
             </div>
           </div>
           <div className="space-y-8">
             <h4 className="text-[10px] font-bold uppercase tracking-widest text-ink">Company</h4>
             <div className="flex flex-col gap-4 text-xs font-bold">
                <Link href="#" className="hover:text-gold">Our Story</Link>
                <Link href="#" className="hover:text-gold">Rituals</Link>
                <Link href="#" className="hover:text-gold">Journal</Link>
             </div>
           </div>
           <div className="space-y-8">
             <h4 className="text-[10px] font-bold uppercase tracking-widest text-ink">Support</h4>
             <div className="flex flex-col gap-4 text-xs font-bold">
                <Link href="#" className="hover:text-gold">Help Center</Link>
                <Link href="#" className="hover:text-gold">Contact</Link>
                <Link href="#" className="hover:text-gold">Legal</Link>
             </div>
           </div>
        </div>
        <div className="section-shell mt-24 pt-12 border-t border-ink/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
           <p>© 2026 Invitely Digital. All Rights Reserved.</p>
           <p className="text-gold">Language: English (Global)</p>
        </div>
      </footer>
    </main>
  );
}
