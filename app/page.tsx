import Link from "next/link";
import { ArrowRight, Layers, MessageSquare, Palette, Sparkles, Wand2, Globe, ShieldCheck } from "lucide-react";

import { FadeIn, ScaleIn } from "@/components/landing/motion";
import { SiteHeader } from "@/components/landing/site-header";
import { EditorialHero } from "@/components/landing/editorial-hero";
import { TraditionIcons } from "@/components/landing/tradition-icons";
import { getSessionSafely } from "@/lib/session";
import Image from "next/image";

export default async function HomePage() {
  const session = await getSessionSafely();
  const ctaHref = session?.user?.id ? "/dashboard/invite/new" : "/sign-up";
  const ctaLabel = session?.user?.id ? "Dashboard" : "Start Customizing";

  return (
    <main className="page-shell bg-vellum">
      <SiteHeader ctaHref={ctaHref} ctaLabel={ctaLabel} />

      <EditorialHero ctaHref={ctaHref} ctaLabel={ctaLabel} />

      {/* Feature Section: The Logic of Elegance */}
      <section id="features" className="py-32 lg:py-48 px-6 scroll-mt-32">
        <div className="section-shell">
          <FadeIn direction="up" className="mb-20 space-y-4">
             <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">The Capability</span>
             <h2 className="font-heading text-4xl lg:text-5xl font-bold tracking-tight text-ink">Orchestrated with Precision</h2>
          </FadeIn>

          <div className="grid gap-8 lg:grid-cols-3">
             <FadeIn delay={0.1} className="surface-card p-10 rounded-[48px] space-y-8 flex flex-col justify-between aspect-square group">
                <div className="h-16 w-16 rounded-3xl bg-burgundy/5 flex items-center justify-center text-burgundy group-hover:bg-burgundy group-hover:text-white transition-all duration-700">
                   <Palette className="h-7 w-7" />
                </div>
                <div className="space-y-4">
                   <h3 className="text-2xl font-bold text-ink">Digital Materiality</h3>
                   <p className="text-ink/60 font-medium leading-relaxed">Beyond a static screen. We create tactile digital heirlooms that feel as physical as premium stationery.</p>
                </div>
             </FadeIn>

             <FadeIn delay={0.2} className="surface-card p-10 rounded-[48px] space-y-8 flex flex-col justify-between aspect-square group bg-[#1c1c18] text-white">
                <div className="h-16 w-16 rounded-3xl bg-white/10 flex items-center justify-center text-gold">
                   <Globe className="h-7 w-7" />
                </div>
                <div className="space-y-4">
                   <h3 className="text-2xl font-bold !text-white">Global Accessibility</h3>
                   <p className="text-white/60 font-medium leading-relaxed">Integrated RSVP tracking, Google Maps, and calendar reminders for guests across the globe.</p>
                </div>
             </FadeIn>

             <FadeIn delay={0.3} className="surface-card p-10 rounded-[48px] space-y-8 flex flex-col justify-between aspect-square group">
                <div className="h-16 w-16 rounded-3xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-700">
                   <ShieldCheck className="h-7 w-7" />
                </div>
                <div className="space-y-4">
                   <h3 className="text-2xl font-bold text-ink">Refined Privacy</h3>
                   <p className="text-ink/60 font-medium leading-relaxed">Secure, exclusive access to your legacy. Control exactly who sees your story with password protected portals.</p>
                </div>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* Process: The Journey */}
      <section className="bg-silk py-32 lg:py-48 px-6">
        <div className="section-shell">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-20 items-center">
             <FadeIn direction="up" className="space-y-8">
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">How it Works</span>
                <h2 className="font-heading text-4xl lg:text-6xl font-bold tracking-tighter text-ink leading-tight">Meticulously Crafted, <br />Effortlessly Launched</h2>
                <p className="text-lg text-ink/50 font-medium leading-relaxed max-w-md">Our intentional design engine ensures every pixel aligns with your heritage, while we handle the complexity of the modern web.</p>
                
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

             <FadeIn direction="right" className="relative aspect-[4/3] rounded-[64px] overflow-hidden shadow-lux">
                <Image 
                  src="/images/templates/royal/rajasthani_palace_interior.png"
                  alt="Design Interface"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/10" />
                <div className="absolute inset-x-8 bottom-8 glass-card p-10 rounded-[32px] flex items-center justify-between">
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gold text-ink/30">System Status</p>
                      <p className="text-lg font-bold text-ink">Interface Optimized</p>
                   </div>
                   <div className="h-12 w-12 rounded-full bg-ink flex items-center justify-center text-white">
                      <ArrowRight className="h-5 w-5" />
                   </div>
                </div>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* Traditions Section */}
      <section className="bg-ink py-32 lg:py-48 px-6 relative overflow-hidden text-center text-white">
        <div className="bg-mandala absolute inset-0 opacity-[0.03] scale-150 rotate-12" />
        <div className="section-shell relative z-10">
          <FadeIn direction="up" className="max-w-3xl mx-auto space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold-accent">The Collection</span>
            <h2 className="font-heading text-4xl lg:text-7xl font-bold tracking-tighter text-balance">Built for Every Tradition</h2>
            <p className="text-lg text-white/40 font-medium leading-relaxed">We honor the unique rituals of every heritage with bespoke iconography and meticulous aesthetics curated for your legacy.</p>
          </FadeIn>

          <div className="mt-24 grid grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: "Hindu", icon: TraditionIcons.Hindu },
              { name: "Muslim", icon: TraditionIcons.Muslim },
              { name: "Christian", icon: TraditionIcons.Christian },
              { name: "Sikh", icon: TraditionIcons.Sikh },
              { name: "Civil", icon: TraditionIcons.Civil },
            ].map((tradition, i) => (
              <FadeIn key={i} delay={i * 0.05} className="group relative bg-white/[0.03] p-12 rounded-[40px] border border-white/5 transition-all hover:bg-white/[0.08] hover:scale-105 active:scale-95 duration-500">
                <div className="scale-125 mb-4"><tradition.icon /></div>
                <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 group-hover:text-gold transition-colors">{tradition.name}</p>
              </FadeIn>
            ))}
          </div>
          
          <Link href="/templates" className="mt-20 inline-flex items-center gap-4 text-gold hover:text-white transition-all font-bold uppercase tracking-widest text-[11px] group pb-2 border-b border-gold/20 hover:border-white/40">
            Explore all aesthetics <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>
      </section>

      {/* Testimonial: The Legacy Quote */}
      <section className="py-32 lg:py-64 px-6 text-center">
        <div className="section-shell">
          <FadeIn direction="up">
            <div className="flex justify-center mb-16">
               <MessageSquare className="h-12 w-12 text-gold opacity-20" strokeWidth={1} />
            </div>
            <blockquote className="max-w-5xl mx-auto font-serif-lux text-3xl lg:text-6xl italic font-normal leading-[1.2] text-ink tracking-tight text-balance">
              &quot;Invitely turned our chaotic group chats into a single source of truth. 
              The design felt just as premium as our physical cards, but with 10x the convenience.&quot;
            </blockquote>
            
            <div className="mt-20 flex flex-col items-center">
              <div className="relative h-28 w-28 overflow-hidden rounded-full ring-8 ring-silk shadow-lux">
                 <Image 
                   src="/images/templates/royal/rajasthani_palace_interior.png"
                   alt="Success Story"
                   fill
                   className="object-cover"
                 />
              </div>
              <div className="mt-8 space-y-2">
                <p className="font-heading text-lg font-bold tracking-widest text-ink uppercase tracking-[0.3em]">Ananya & Arjun</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Jaipur . 2025</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA: Final Elevation */}
      <section className="pb-32 px-6">
        <div className="section-shell">
          <div className="relative overflow-hidden rounded-[80px] bg-burgundy px-10 py-32 lg:py-48 text-center shadow-lux">
            <div className="bg-mandala absolute inset-0 opacity-[0.05] scale-[2] rotate-12" />
            <div className="relative z-10 flex flex-col items-center space-y-12">
               <FadeIn direction="up" className="space-y-6">
                  <h2 className="font-heading text-5xl lg:text-8xl font-bold text-white tracking-tighter leading-tight max-w-4xl">
                     Ready to Curate <br />Your Heirloom?
                  </h2>
                  <p className="mx-auto max-w-xl text-lg lg:text-xl text-white/50 font-medium">
                    Join thousands of couples creating their definitive digital legacy.
                  </p>
               </FadeIn>
               
               <FadeIn direction="up" delay={0.1}>
                 <Link
                   href={ctaHref}
                   className="inline-flex h-20 items-center justify-center rounded-full bg-gold px-14 text-[13px] font-bold uppercase tracking-widest text-white shadow-gold transition-all hover:bg-white hover:text-ink hover:scale-105 active:scale-95 duration-500 ease-lux group"
                 >
                   Start Your Website
                   <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
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
