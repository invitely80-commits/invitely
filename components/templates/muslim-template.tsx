"use client";

import React, { useEffect, useRef, useState } from "react";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

const DEFAULT_DATA = {
  brideFirstName: "Myra",
  brideLastName: "Khan",
  groomFirstName: "Zayn",
  groomLastName: "Ahmed",
  weddingDate: "Friday, the 20th of March, 2026",
  weddingDateShort: "20 . 03 . 2026",
  venue: "The Grand Hyatt",
  venueAddress: "MG Road, Hyderabad — 500 001",
  venueMapsUrl: "https://maps.google.com",
  whatsappNumber: "919999999999",
  instagramHandle: "https://www.instagram.com/zaynmyrawedding",
  events: [
    { name: "Mehndi", date: "19 Mar 2026", time: "4:00 PM", venue: "Bride's Residence", icon: "🌿" },
    { name: "Nikah Ceremony", date: "20 Mar 2026", time: "11:00 AM", venue: "The Grand Hyatt", icon: "☪️" },
    { name: "Walima Reception", date: "21 Mar 2026", time: "7:30 PM", venue: "The Grand Hyatt", icon: "✨" },
  ],
  brideFamily: { father: "Imran Khan", mother: "Fatima Khan", siblings: "Zara & Ali Khan" },
  groomFamily: { father: "Rashid Ahmed", mother: "Nadia Ahmed", siblings: "Omar Ahmed" },
  hashtag: "#ZaynMyraForever",
  photoUrl: "https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=1600&auto=format&fit=crop",
};

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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Geometric Islamic pattern SVG
function GeometricBg({ opacity = 0.06, color = "#1B6B45" }: { opacity?: number; color?: string }) {
  const size = 80;
  const pattern = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const x = col * size;
      const y = row * size;
      pattern.push(
        <g key={`${row}-${col}`} transform={`translate(${x},${y})`}>
          <polygon points={`${size / 2},5 ${size - 5},${size / 2} ${size / 2},${size - 5} 5,${size / 2}`}
            fill="none" stroke={color} strokeWidth="0.8" opacity="0.8" />
          <polygon points={`${size / 2},15 ${size - 15},${size / 2} ${size / 2},${size - 15} 15,${size / 2}`}
            fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
          <circle cx={size / 2} cy={size / 2} r="5" fill={color} opacity="0.3" />
        </g>
      );
    }
  }
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity }} viewBox="0 0 640 640" preserveAspectRatio="xMidYMid slice">
      {pattern}
    </svg>
  );
}

const GoldDividerInner = ({ color }: { color: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "1.5rem auto", maxWidth: "300px" }}>
    <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(to right, transparent, ${color})` }} />
    <span style={{ color, fontSize: "1rem" }}>✦</span>
    <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(to left, transparent, ${color})` }} />
  </div>
);

function GoldDivider({ color = "#C9A84C" }: { color?: string }) {
  return (
    <GoldDividerInner color={color} />
  );
}

export function MuslimTemplate({
  invite,
  preview = false,
}: {
  invite: TemplateInvite;
  preview?: boolean;
}) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const f1 = useFadeIn(), f2 = useFadeIn(), f3 = useFadeIn(), f4 = useFadeIn(), f5 = useFadeIn();

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
      icon: ev.title.toLowerCase().includes("nikah") ? "☪️" :
        ev.title.toLowerCase().includes("mehndi") ? "🌿" :
          ev.title.toLowerCase().includes("reception") || ev.title.toLowerCase().includes("walima") ? "✨" : "🌙"
    }))
  };

  return (
    <div style={styles.root}>
      <style>{globalCSS}</style>

      {/* ── HERO ── */}
      <section style={styles.hero}>
        <div style={{ ...styles.heroBg, transform: `translateY(${scrollY * 0.45}px)` }}>
          <img src={d.photoUrl} alt="venue" style={styles.heroBgImg} />
          <div style={styles.heroOverlay} />
        </div>
        <GeometricBg opacity={0.08} color="#D4AF37" />
        <div style={styles.heroContent}>
          <p style={styles.heroArabic}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <GoldDivider color="#D4AF37" />
          <p style={styles.heroInvite}>Together with their families</p>
          <h1 style={styles.heroNames}>
            <span style={styles.heroName}>{d.brideFirstName}</span>
            <span style={styles.heroNikah}>Nikah</span>
            <span style={styles.heroName}>{d.groomFirstName}</span>
          </h1>
          <GoldDivider color="#D4AF37" />
          <p style={styles.heroDate}>{d.weddingDateShort}</p>
          <p style={styles.heroVenue}>{d.venue}</p>
          <div style={styles.scrollHint}>
            <div style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, transparent, #D4AF37)", margin: "0 auto" }} />
            <p style={{ color: "rgba(212,175,55,0.5)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.5rem" }}>Scroll</p>
          </div>
        </div>
      </section>

      {/* ── BISMILLAH BAND ── */}
      <section style={{ background: "#0D3D26", padding: "3rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <GeometricBg opacity={0.07} color="#D4AF37" />
        <div ref={f1} style={styles.fadeBlock}>
          <p style={{ fontFamily: "'Amiri',serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", color: "#D4AF37", lineHeight: 1.6 }}>
            &quot;And of His signs is that He created for you mates from among yourselves,<br />
            that you may find tranquillity in them.&quot;
          </p>
          <p style={{ color: "rgba(212,175,55,0.5)", fontSize: "0.78rem", letterSpacing: "0.12em", marginTop: "1rem" }}>— Quran 30:21</p>
        </div>
      </section>

      {/* ── COUPLE ── */}
      <section style={{ background: "#F7F4EE", padding: "5rem 2rem", textAlign: "center", position: "relative" }}>
        <GeometricBg opacity={0.04} color="#1B6B45" />
        <div ref={f2} style={styles.fadeBlock}>
          <p style={styles.sectionLabel}>The Couple</p>
          <GoldDivider color="#1B6B45" />
          <div style={styles.coupleGrid}>
            <div style={styles.coupleSide}>
              <div style={styles.coupleCircle}>
                <span style={{ fontSize: "2rem" }}>🌙</span>
              </div>
              <h2 style={styles.coupleName}>{d.brideFirstName}</h2>
              <p style={{ color: "#1B6B45", fontSize: "0.85rem", letterSpacing: "0.08em", marginBottom: "0.8rem" }}>{d.brideLastName}</p>
              <p style={styles.coupleFamily}>Daughter of<br /><strong>{d.brideFamily.father}</strong> &amp; <strong>{d.brideFamily.mother}</strong></p>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "70px", height: "70px", borderRadius: "50%", border: "1px solid #1B6B45", display: "flex", alignItems: "center", justifyContent: "center", background: "#0D3D26" }}>
                <span style={{ color: "#D4AF37", fontFamily: "'Amiri',serif", fontSize: "1.8rem" }}>☪</span>
              </div>
            </div>
            <div style={styles.coupleSide}>
              <div style={styles.coupleCircle}>
                <span style={{ fontSize: "2rem" }}>⭐</span>
              </div>
              <h2 style={styles.coupleName}>{d.groomFirstName}</h2>
              <p style={{ color: "#1B6B45", fontSize: "0.85rem", letterSpacing: "0.08em", marginBottom: "0.8rem" }}>{d.groomLastName}</p>
              <p style={styles.coupleFamily}>Son of<br /><strong>{d.groomFamily.father}</strong> &amp; <strong>{d.groomFamily.mother}</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARALLAX VENUE ── */}
      <section style={{ position: "relative", minHeight: "65vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, willChange: "transform", transform: `translateY(${scrollY * 0.3}px)` }}>
          <img src={d.photoUrl} alt="" style={{ width: "100%", height: "130%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(13,61,38,0.7)" }} />
        </div>
        <GeometricBg opacity={0.08} color="#D4AF37" />
        <div ref={f3} style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "4rem 2rem" }}>
          <p style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>Venue</p>
          <GoldDivider color="#D4AF37" />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", fontWeight: 300 }}>{d.venue}</h2>
          <p style={{ color: "rgba(212,175,55,0.8)", fontSize: "0.9rem", marginTop: "0.5rem", letterSpacing: "0.05em" }}>{d.venueAddress}</p>
          {!preview && (
            <a href={d.venueMapsUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: "1.5rem", border: "1px solid #D4AF37", color: "#D4AF37", padding: "0.7rem 2rem", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.1em", borderRadius: "2px" }}>
              Open in Google Maps →
            </a>
          )}
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section style={{ background: "#F7F4EE", padding: "5rem 2rem", textAlign: "center" }}>
        <div ref={f4} style={styles.fadeBlock}>
          <p style={styles.sectionLabel}>Programme</p>
          <GoldDivider color="#1B6B45" />
          <h2 style={styles.sectionTitle}>Celebrations</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginTop: "2.5rem" }}>
            {d.events.map((ev, i) => (
              <div key={i} style={{ background: "#fff", border: "0.5px solid #C5DDD3", borderRadius: "2px", padding: "2rem 1.5rem", textAlign: "left", borderTop: "3px solid #1B6B45" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{ev.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "#0D3D26", marginBottom: "0.5rem" }}>{ev.name}</h3>
                <div style={{ width: "30px", height: "1px", background: "#D4AF37", marginBottom: "1rem" }} />
                <p style={{ color: "#1B6B45", fontSize: "0.75rem", letterSpacing: "0.06em", fontWeight: 500 }}>{ev.date}</p>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "#0D3D26", margin: "0.2rem 0" }}>{ev.time}</p>
                <p style={{ color: "#7A8C7F", fontSize: "0.78rem", marginTop: "0.4rem" }}>{ev.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RSVP ── */}
      <section style={{ background: "#0D3D26", padding: "5rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <GeometricBg opacity={0.07} color="#D4AF37" />
        <div ref={f5} style={styles.fadeBlock}>
          <p style={{ color: "#D4AF37", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>You are invited</p>
          <GoldDivider color="#D4AF37" />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", fontWeight: 300, marginBottom: "1rem" }}>
            {d.brideFirstName} &amp; {d.groomFirstName}
          </h2>
          <p style={{ color: "rgba(212,175,55,0.7)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto 2.5rem" }}>
            We humbly request your presence and blessings as we begin our journey together in the name of Allah.
          </p>
          {!preview && (
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`https://wa.me/${d.whatsappNumber}`} target="_blank" rel="noreferrer" style={{ background: "#D4AF37", color: "#0D3D26", padding: "0.85rem 2.5rem", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.1em", fontWeight: 500, borderRadius: "2px", display: "inline-block" }}>
                RSVP via WhatsApp
              </a>
              <a href={d.venueMapsUrl} target="_blank" rel="noreferrer" style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37", padding: "0.85rem 2.5rem", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.1em", borderRadius: "2px", display: "inline-block" }}>
                View Venue
              </a>
            </div>
          )}
          <GoldDivider color="#D4AF37" />
          <p style={{ color: "rgba(212,175,55,0.4)", fontSize: "0.72rem", letterSpacing: "0.1em" }}>
            {d.brideFirstName} {d.brideLastName} &amp; {d.groomFirstName} {d.groomLastName} · {d.weddingDateShort}
          </p>
        </div>
      </section>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: { fontFamily: "'DM Sans',sans-serif", background: "#F7F4EE", color: "#0D3D26", overflowX: "hidden" },
  hero: { position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  heroBg: { position: "absolute", inset: 0, willChange: "transform" },
  heroBgImg: { width: "100%", height: "115%", objectFit: "cover" },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,61,38,0.65) 0%, rgba(13,61,38,0.45) 60%, rgba(13,61,38,0.85) 100%)" },
  heroContent: { position: "relative", zIndex: 2, textAlign: "center", padding: "2rem", width: "100%" },
  heroArabic: { fontFamily: "'Amiri',serif", fontSize: "clamp(1.2rem,3vw,2rem)", color: "#D4AF37", marginBottom: "1rem", lineHeight: 1.8 },
  heroInvite: { color: "rgba(212,175,55,0.8)", fontSize: "1rem", letterSpacing: "0.15em", marginBottom: "1rem" },
  heroNames: { fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 300, color: "#fff", margin: "0.5rem 0", lineHeight: 1.15 },
  heroName: { display: "block" },
  heroNikah: { display: "block", color: "#D4AF37", fontSize: "0.35em", letterSpacing: "0.4em", textTransform: "uppercase", margin: "0.2em 0" },
  heroDate: { color: "#D4AF37", fontSize: "1.1rem", letterSpacing: "0.2em", marginTop: "1rem" },
  heroVenue: { color: "rgba(212,175,55,0.7)", fontSize: "0.85rem", letterSpacing: "0.1em", marginTop: "0.4rem" },
  scrollHint: { marginTop: "3rem" },
  fadeBlock: { opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" },
  sectionLabel: { color: "#1B6B45", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.5rem" },
  sectionTitle: { fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#0D3D26", fontWeight: 300, marginBottom: "2.5rem" },
  coupleGrid: { display: "flex", gap: "2rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginTop: "2rem" },
  coupleSide: { textAlign: "center", flex: 1, minWidth: "200px", maxWidth: "280px" },
  coupleCircle: { width: "90px", height: "90px", borderRadius: "50%", border: "1px solid #1B6B45", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", background: "rgba(27,107,69,0.08)" },
  coupleName: { fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 300, color: "#0D3D26", margin: "0 0 0.2rem" },
  coupleFamily: { color: "#5A7A68", fontSize: "0.82rem", lineHeight: 1.8 },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=Amiri:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
`;
