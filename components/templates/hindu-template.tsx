"use client";

import React, { useEffect, useRef, useState } from "react";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

// ─── DEFAULT DATA – fallback for missing invite props ─────────────────────
const DEFAULT_DATA = {
  brideFirstName: "Priya",
  brideLastName: "Sharma",
  groomFirstName: "Arjun",
  groomLastName: "Mehta",
  weddingDate: "Saturday, the 14th of February, 2026",
  weddingDay: "Saturday",
  weddingDateShort: "14 . 02 . 2026",
  venue: "The Leela Palace",
  venueAddress: "23, Leela Palace Road, Bengaluru — 560 008",
  venueMapsUrl: "https://maps.google.com",
  whatsappNumber: "919999999999",
  instagramHandle: "@priyaarjunwedding",
  events: [
    { name: "Haldi Ceremony", date: "13 Feb 2026", time: "10:00 AM", venue: "Bride's Residence", icon: "🌼" },
    { name: "Mehendi Evening", date: "13 Feb 2026", time: "6:00 PM", venue: "Bride's Residence", icon: "🪷" },
    { name: "Sangeet Night", date: "13 Feb 2026", time: "8:00 PM", venue: "The Leela Palace", icon: "🎶" },
    { name: "Wedding Ceremony", date: "14 Feb 2026", time: "11:00 AM", venue: "The Leela Palace", icon: "🕉" },
    { name: "Reception", date: "14 Feb 2026", time: "7:00 PM", venue: "The Leela Palace", icon: "✨" },
  ],
  brideFamily: { father: "Ramesh Sharma", mother: "Sunita Sharma", siblings: "Rohan & Neha Sharma" },
  groomFamily: { father: "Suresh Mehta", mother: "Kavita Mehta", siblings: "Aditya Mehta" },
  hashtag: "#PriyaArjunForever",
  photoUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop",
};

// ─── PARALLAX HOOK ──────────────────────────────────────────────────────────
function useParallax(speed = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return ref;
}

// ─── SECTION FADE-IN HOOK ───────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── SVG MANDALA BACKGROUND ─────────────────────────────────────────────────
function MandalaBg({ opacity = 0.08, size = 600 }: { opacity?: number; size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 400 400"
      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none", opacity }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <g key={i} transform={`rotate(${i * 45} 200 200)`}>
          <ellipse cx="200" cy="90" rx="12" ry="30" fill="#C9A84C" opacity="0.6" />
          <ellipse cx="200" cy="60" rx="7" ry="18" fill="#8B1A1A" opacity="0.5" />
          <circle cx="200" cy="45" r="5" fill="#C9A84C" opacity="0.7" />
        </g>
      ))}
      {[40, 70, 100, 130, 160].map(r => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
      ))}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
        <line key={i}
          x1="200" y1="200"
          x2={200 + 160 * Math.cos((i * 30 * Math.PI) / 180)}
          y2={200 + 160 * Math.sin((i * 30 * Math.PI) / 180)}
          stroke="#C9A84C" strokeWidth="0.5" opacity="0.3"
        />
      ))}
      <circle cx="200" cy="200" r="18" fill="#C9A84C" opacity="0.2" />
      <circle cx="200" cy="200" r="9" fill="#8B1A1A" opacity="0.3" />
    </svg>
  );
}

// ─── GOLD DIVIDER ───────────────────────────────────────────────────────────
function GoldDivider({ wide = false }: { wide?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "1.5rem auto", width: wide ? "100%" : "280px" }}>
      <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, #C9A84C)" }} />
      <span style={{ color: "#C9A84C", fontSize: "1rem" }}>✦</span>
      <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, #C9A84C)" }} />
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export function HinduTemplate({
  invite,
  preview = false,
}: {
  invite: TemplateInvite;
  preview?: boolean;
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fadeRef1 = useFadeIn();
  const fadeRef2 = useFadeIn();
  const fadeRef3 = useFadeIn();
  const fadeRef4 = useFadeIn();
  const fadeRef5 = useFadeIn();

  // Map invite data to template structure
  const data = invite.data;
  const brideParts = data.brideName.split(" ");
  const groomParts = data.groomName.split(" ");
  
  const d = {
    ...DEFAULT_DATA,
    brideFirstName: brideParts[0],
    brideLastName: brideParts.slice(1).join(" ") || DEFAULT_DATA.brideLastName,
    groomFirstName: groomParts[0],
    groomLastName: groomParts.slice(1).join(" ") || DEFAULT_DATA.groomLastName,
    weddingDate: formatDisplayDate(data.weddingDate),
    weddingDateShort: data.weddingDate.split("-").reverse().join(" . "),
    venue: data.events[0]?.venue || DEFAULT_DATA.venue,
    venueAddress: data.events[0]?.address || DEFAULT_DATA.venueAddress,
    photoUrl: data.heroImage || data.gallery[0] || DEFAULT_DATA.photoUrl,
    whatsappNumber: data.contactPhone || DEFAULT_DATA.whatsappNumber,
    hashtag: data.description.includes("#") ? data.description.match(/#\w+/)?.[0] : DEFAULT_DATA.hashtag,
    events: data.events.map(ev => ({
      name: ev.title,
      date: formatDisplayDate(ev.date),
      time: ev.time,
      venue: ev.venue,
      icon: ev.title.toLowerCase().includes("haldi") ? "🌼" : 
            ev.title.toLowerCase().includes("mehendi") ? "🪷" :
            ev.title.toLowerCase().includes("sangeet") ? "🎶" :
            ev.title.toLowerCase().includes("wedding") ? "🕉" : "✨"
    }))
  };

  const S = styles;

  return (
    <div style={S.root}>
      <style>{globalCSS}</style>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={S.hero}>
        <div style={{ ...S.heroBg, transform: `translateY(${scrollY * 0.45}px)` }}>
          <img src={d.photoUrl} alt="couple" style={S.heroBgImg} />
          <div style={S.heroOverlay} />
        </div>
        <div style={S.heroContent}>
          <MandalaBg opacity={0.12} size={700} />
          <p style={S.heroBlessing}>॥ श्री गणेशाय नमः ॥</p>
          <GoldDivider />
          <p style={S.heroInvite}>Together with their families</p>
          <h1 style={S.heroNames}>
            <span style={S.heroName}>{d.brideFirstName}</span>
            <span style={S.heroAmpersand}>&amp;</span>
            <span style={S.heroName}>{d.groomFirstName}</span>
          </h1>
          <GoldDivider />
          <p style={S.heroDate}>{d.weddingDateShort}</p>
          <p style={S.heroVenue}>{d.venue} · {d.venueAddress.split(",")[2]?.trim() || "India"}</p>
          <div style={S.heroScrollHint}>
            <div style={S.scrollLine} />
            <span style={S.scrollText}>Scroll to unfold</span>
          </div>
        </div>
      </section>

      {/* ── COUPLE SECTION ────────────────────────────────── */}
      <section style={S.section}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <MandalaBg opacity={0.05} size={500} />
        </div>
        <div ref={fadeRef1} style={{ ...S.fadeBlock, textAlign: "center", padding: "5rem 2rem" }}>
          <p style={S.sectionLabel}>The Couple</p>
          <GoldDivider />
          <div style={S.coupleGrid}>
            <div style={S.coupleSide}>
              <div style={S.coupleCircle}>
                <span style={{ fontSize: "2.5rem" }}>🪷</span>
              </div>
              <h2 style={S.coupleName}>{d.brideFirstName}</h2>
              <p style={S.coupleSubname}>{d.brideLastName}</p>
              <p style={S.coupleFamily}>
                Daughter of <br />
                <strong>{d.brideFamily.father}</strong> &amp; <strong>{d.brideFamily.mother}</strong>
              </p>
              <p style={S.coupleSiblings}>Sister of {d.brideFamily.siblings}</p>
            </div>
            <div style={S.coupleCenter}>
              <div style={S.coupleAndCircle}>
                <span style={S.coupleAnd}>&amp;</span>
              </div>
            </div>
            <div style={S.coupleSide}>
              <div style={S.coupleCircle}>
                <span style={{ fontSize: "2.5rem" }}>🕉</span>
              </div>
              <h2 style={S.coupleName}>{d.groomFirstName}</h2>
              <p style={S.coupleSubname}>{d.groomLastName}</p>
              <p style={S.coupleFamily}>
                Son of <br />
                <strong>{d.groomFamily.father}</strong> &amp; <strong>{d.groomFamily.mother}</strong>
              </p>
              <p style={S.coupleSiblings}>Brother of {d.groomFamily.siblings}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARALLAX PHOTO BAND ───────────────────────────── */}
      <section style={S.parallaxBand}>
        <div style={{ ...S.parallaxBandBg, transform: `translateY(${scrollY * 0.25}px)` }}>
          <img src={d.photoUrl} alt="" style={{ width: "100%", height: "130%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(42,8,8,0.55)" }} />
        </div>
        <div ref={fadeRef2} style={S.parallaxBandContent}>
          <p style={{ color: "#E8D5A0", fontSize: "1rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Save the Date</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,6vw,4.5rem)", color: "#fff", fontWeight: 300, margin: "0.5rem 0" }}>{d.weddingDate}</h2>
          <GoldDivider wide />
          <p style={{ color: "#E8D5A0", fontSize: "1.1rem", letterSpacing: "0.1em" }}>{d.venue}</p>
          <p style={{ color: "rgba(232,213,160,0.7)", fontSize: "0.85rem", marginTop: "0.4rem", letterSpacing: "0.05em" }}>{d.venueAddress}</p>
          <a href={d.venueMapsUrl} target="_blank" rel="noreferrer" style={S.mapsBtn}>Open in Google Maps →</a>
        </div>
      </section>

      {/* ── EVENTS TIMELINE ───────────────────────────────── */}
      <section style={{ ...S.section, background: "#FBF5E8" }}>
        <div ref={fadeRef3} style={{ ...S.fadeBlock, padding: "5rem 2rem", textAlign: "center" }}>
          <p style={S.sectionLabel}>Celebrations</p>
          <GoldDivider />
          <h2 style={S.sectionTitle}>Events &amp; Ceremonies</h2>
          <div style={S.eventsGrid}>
            {d.events.map((ev, i) => (
              <div key={i} style={S.eventCard}>
                <div style={S.eventIconWrap}>{ev.icon}</div>
                <h3 style={S.eventName}>{ev.name}</h3>
                <div style={S.eventDivider} />
                <p style={S.eventDate}>{ev.date}</p>
                <p style={S.eventTime}>{ev.time}</p>
                <p style={S.eventVenue}>{ev.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECOND PARALLAX ───────────────────────────────── */}
      <section style={{ ...S.parallaxBand, minHeight: "40vh" }}>
        <div style={{ ...S.parallaxBandBg, transform: `translateY(${scrollY * 0.15}px)` }}>
          <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop" alt="" style={{ width: "100%", height: "130%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(42,8,8,0.6)" }} />
        </div>
        <div ref={fadeRef4} style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "4rem 2rem" }}>
          <MandalaBg opacity={0.1} size={400} />
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.2rem,3vw,2rem)", color: "#E8D5A0", fontStyle: "italic", maxWidth: "700px", margin: "0 auto", lineHeight: 1.8 }}>
            &quot;Two souls, one heart. May this union be blessed with love, laughter, and a lifetime of togetherness.&quot;
          </p>
          <p style={{ color: "#C9A84C", marginTop: "1.5rem", letterSpacing: "0.15em", fontSize: "0.85rem" }}>{d.hashtag}</p>
        </div>
      </section>

      {/* ── RSVP ──────────────────────────────────────────── */}
      <section style={{ ...S.section, background: "#2A0808", color: "#E8D5A0" }}>
        <div ref={fadeRef5} style={{ ...S.fadeBlock, padding: "5rem 2rem", textAlign: "center", position: "relative" }}>
          <MandalaBg opacity={0.07} size={500} />
          <p style={{ ...S.sectionLabel, color: "#C9A84C" }}>You are invited</p>
          <GoldDivider />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", fontWeight: 300, marginBottom: "1rem" }}>
            {d.brideFirstName} weds {d.groomFirstName}
          </h2>
          <p style={{ color: "rgba(232,213,160,0.7)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto 2.5rem" }}>
            We joyfully request your presence and blessings as we begin our journey together.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`https://wa.me/${d.whatsappNumber}`} target="_blank" rel="noreferrer" style={S.rsvpBtn}>
              RSVP via WhatsApp
            </a>
            <a href={d.venueMapsUrl} target="_blank" rel="noreferrer" style={S.outlineBtn}>
              View Venue
            </a>
          </div>
          {d.instagramHandle && (
            <p style={{ marginTop: "2.5rem", color: "#C9A84C", fontSize: "0.85rem", letterSpacing: "0.1em" }}>
              Follow our journey · {d.instagramHandle}
            </p>
          )}
          <GoldDivider />
          <p style={{ color: "rgba(232,213,160,0.4)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            {d.brideFirstName} {d.brideLastName} &amp; {d.groomFirstName} {d.groomLastName} · {d.weddingDateShort}
          </p>
        </div>
      </section>
    </div>
  );
}

// ─── STYLES ─────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  root: { fontFamily: "'DM Sans',sans-serif", background: "#FBF5E8", color: "#2A1A0A", overflowX: "hidden" },
  hero: { position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  heroBg: { position: "absolute", inset: 0, willChange: "transform" },
  heroBgImg: { width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 20%" },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(42,8,8,0.55) 0%, rgba(42,8,8,0.4) 60%, rgba(42,8,8,0.8) 100%)" },
  heroContent: { position: "relative", zIndex: 2, textAlign: "center", padding: "2rem", width: "100%", maxWidth: "800px" },
  heroBlessing: { color: "#E8D5A0", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" },
  heroInvite: { color: "rgba(232,213,160,0.8)", fontSize: "1rem", letterSpacing: "0.15em", marginBottom: "1rem" },
  heroNames: { fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 300, color: "#fff", margin: "0.5rem 0", lineHeight: 1.1 },
  heroName: { display: "block" },
  heroAmpersand: { display: "block", color: "#C9A84C", fontSize: "0.45em", letterSpacing: "0.3em", margin: "0.2em 0" },
  heroDate: { color: "#E8D5A0", fontSize: "1.1rem", letterSpacing: "0.2em", marginTop: "1rem" },
  heroVenue: { color: "rgba(232,213,160,0.7)", fontSize: "0.85rem", letterSpacing: "0.1em", marginTop: "0.4rem" },
  heroScrollHint: { marginTop: "3rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" },
  scrollLine: { width: "1px", height: "50px", background: "linear-gradient(to bottom, transparent, #C9A84C)" },
  scrollText: { color: "rgba(232,213,160,0.5)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" },

  section: { background: "#FBF5E8", position: "relative" },
  fadeBlock: { opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" },
  sectionLabel: { color: "#8B6914", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.5rem" },
  sectionTitle: { fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#2A1A0A", fontWeight: 300, marginBottom: "2.5rem" },

  coupleGrid: { display: "flex", gap: "2rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginTop: "2rem" },
  coupleSide: { textAlign: "center", flex: "1", minWidth: "200px", maxWidth: "280px" },
  coupleCenter: { display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" },
  coupleCircle: { width: "100px", height: "100px", borderRadius: "50%", border: "1px solid #C9A84C", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem", background: "rgba(201,168,76,0.08)" },
  coupleName: { fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 300, color: "#2A1A0A", margin: "0 0 0.2rem" },
  coupleSubname: { color: "#8B6914", fontSize: "0.9rem", letterSpacing: "0.08em", marginBottom: "0.8rem" },
  coupleFamily: { color: "#7A6550", fontSize: "0.82rem", lineHeight: 1.8 },
  coupleSiblings: { color: "rgba(122,101,80,0.7)", fontSize: "0.75rem", marginTop: "0.4rem" },
  coupleAndCircle: { width: "70px", height: "70px", borderRadius: "50%", border: "1px solid #C9A84C", display: "flex", alignItems: "center", justifyContent: "center", background: "#2A1A0A" },
  coupleAnd: { color: "#C9A84C", fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontStyle: "italic" },

  parallaxBand: { position: "relative", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  parallaxBandBg: { position: "absolute", inset: 0, willChange: "transform" },
  parallaxBandContent: { position: "relative", zIndex: 2, textAlign: "center", padding: "4rem 2rem" },
  mapsBtn: { display: "inline-block", marginTop: "1.5rem", border: "1px solid #C9A84C", color: "#C9A84C", padding: "0.7rem 2rem", borderRadius: "2px", textDecoration: "none", fontSize: "0.82rem", letterSpacing: "0.1em", transition: "all 0.2s" },

  eventsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "2.5rem", textAlign: "left" },
  eventCard: { background: "#fff", border: "0.5px solid #E8D5A0", borderRadius: "2px", padding: "2rem 1.5rem", transition: "box-shadow 0.3s, transform 0.3s" },
  eventIconWrap: { fontSize: "2rem", marginBottom: "1rem" },
  eventName: { fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 400, color: "#2A1A0A", marginBottom: "0.5rem" },
  eventDivider: { width: "40px", height: "1px", background: "#C9A84C", marginBottom: "1rem" },
  eventDate: { color: "#8B6914", fontSize: "0.78rem", letterSpacing: "0.08em", fontWeight: 500 },
  eventTime: { color: "#2A1A0A", fontSize: "1rem", fontFamily: "'Playfair Display',serif", margin: "0.2rem 0" },
  eventVenue: { color: "#7A6550", fontSize: "0.78rem", marginTop: "0.4rem" },

  rsvpBtn: { display: "inline-block", background: "#C9A84C", color: "#2A1A0A", padding: "0.85rem 2.5rem", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.1em", fontWeight: 500, borderRadius: "2px" },
  outlineBtn: { display: "inline-block", border: "1px solid rgba(232,213,160,0.4)", color: "#E8D5A0", padding: "0.85rem 2.5rem", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.1em", borderRadius: "2px" },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
`;

