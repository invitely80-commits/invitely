"use client";

import React, { useEffect, useRef, useState } from "react";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

const DEFAULT_DATA = {
  brideFirstName: "Meera",
  brideLastName: "Rathore",
  groomFirstName: "Siddharth",
  groomLastName: "Singh",
  weddingDate: "Friday, the 13th of February, 2026",
  weddingDateShort: "13 . 02 . 2026",
  venue: "Umaid Bhawan Palace",
  venueAddress: "Circuit House Road, Jodhpur — 342 006",
  venueMapsUrl: "https://maps.google.com",
  whatsappNumber: "919999999999",
  instagramHandle: "@sidmeera2026",
  events: [
    { name: "Haldi & Ubtan", date: "11 Feb 2026", time: "10:00 AM", venue: "Palace Garden", icon: "🌼" },
    { name: "Royal Mehendi", date: "11 Feb 2026", time: "6:00 PM", venue: "Palace Terrace", icon: "🪷" },
    { name: "Sangeet Soirée", date: "12 Feb 2026", time: "8:00 PM", venue: "Grand Durbar Hall", icon: "🎶" },
    { name: "Baarat & Saptapadi", date: "13 Feb 2026", time: "11:00 AM", venue: "Umaid Bhawan Palace", icon: "🕉" },
    { name: "Grand Reception", date: "13 Feb 2026", time: "8:00 PM", venue: "Palace Gardens", icon: "✨" },
  ],
  brideFamily: { father: "Maharaj Vikram Rathore", mother: "Rani Padmini Rathore", siblings: "Kiran & Devraj Rathore" },
  groomFamily: { father: "Rao Pratap Singh", mother: "Rani Savitri Singh", siblings: "Ajay Singh" },
  hashtag: "#SidMeeraKiShaahi",
  photoUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1600&auto=format&fit=crop",
};

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// Ornate arch / Mughal arch SVG
function MughalArch({ color = "#D4AF37", height = 120 }: { color?: string; height?: number }) {
  return (
    <svg viewBox="0 0 200 130" width="200" height={height} fill="none">
      <path d="M10 130 L10 70 Q10 10 100 10 Q190 10 190 70 L190 130" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M25 130 L25 72 Q25 25 100 25 Q175 25 175 72 L175 130" stroke={color} strokeWidth="0.5" fill="none" opacity="0.4" />
      {[40, 60, 80, 100, 120, 140, 160].map(x => (
        <circle key={x} cx={x} cy={x < 101 ? 130 - (x - 10) * 0.5 : 130 - (200 - x - 10) * 0.5} r="2" fill={color} opacity="0.4" />
      ))}
      <path d="M85 10 Q100 2 115 10" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="100" cy="8" r="4" fill={color} opacity="0.5" />
    </svg>
  );
}

function RoyalPattern({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity }} viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice">
      {[0, 75, 150, 225].map(ox => [0, 75, 150, 225].map(oy => (
        <g key={`${ox}-${oy}`} transform={`translate(${ox},${oy})`}>
          <circle cx="37.5" cy="37.5" r="30" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          <circle cx="37.5" cy="37.5" r="20" fill="none" stroke="#8B0000" strokeWidth="0.3" />
          <circle cx="37.5" cy="37.5" r="5" fill="#D4AF37" opacity="0.3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
            <line key={a}
              x1={37.5 + 20 * Math.cos(a * Math.PI / 180)} y1={37.5 + 20 * Math.sin(a * Math.PI / 180)}
              x2={37.5 + 30 * Math.cos(a * Math.PI / 180)} y2={37.5 + 30 * Math.sin(a * Math.PI / 180)}
              stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"
            />
          ))}
        </g>
      )))}
    </svg>
  );
}

function RoyalDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "1.5rem auto", maxWidth: "360px" }}>
      <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, #D4AF37)" }} />
      <MughalArch color="#D4AF37" height={40} />
      <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, #D4AF37)" }} />
    </div>
  );
}

export function RoyalTemplate({
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
      icon: ev.title.toLowerCase().includes("haldi") ? "🌼" :
        ev.title.toLowerCase().includes("mehendi") ? "🪷" :
          ev.title.toLowerCase().includes("sangeet") ? "🎶" :
            ev.title.toLowerCase().includes("baarat") ? "🕉" : "✨"
    }))
  };

  return (
    <div style={styles.root}>
      <style>{globalCSS}</style>

      {/* ── HERO ── */}
      <section style={styles.hero}>
        <div style={{ ...styles.heroBg, transform: `translateY(${scrollY * 0.45}px)` }}>
          <img src={d.photoUrl} alt="" style={styles.heroBgImg} />
          <div style={styles.heroOverlay} />
        </div>
        <RoyalPattern opacity={0.1} />
        <div style={styles.heroContent}>
          <div style={{ marginBottom: "1rem" }}><MughalArch color="#D4AF37" height={80} /></div>
          <p style={styles.heroTag}>Kinship Heirloom · Heritage Series</p>
          <p style={styles.heroInvite}>Together with the auspicious blessings of their noble families</p>
          <RoyalDivider />
          <h1 style={styles.heroNames}>
            <span style={styles.heroName}>{d.brideFirstName}</span>
            <span style={styles.heroOf}>of the house of {d.brideLastName}</span>
            <span style={styles.heroWeds}>&amp;</span>
            <span style={styles.heroName}>{d.groomFirstName}</span>
            <span style={styles.heroOf}>of the house of {d.groomLastName}</span>
          </h1>
          <RoyalDivider />
          <p style={styles.heroDate}>{d.weddingDateShort}</p>
          <p style={styles.heroVenue}>{d.venue}</p>
          <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, transparent, #D4AF37)" }} />
          </div>
        </div>
      </section>

      {/* ── ROYAL CREST BAND ── */}
      <section style={{ background: "#D4AF37", padding: "2rem", textAlign: "center" }}>
        <div ref={f1} style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.8s ease", display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          <p style={{ color: "#3D0000", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>
            {d.brideLastName} Family · {d.groomLastName} Family
          </p>
          <div style={{ width: "1px", height: "20px", background: "rgba(61,0,0,0.3)" }} />
          <p style={{ fontFamily: "'IM Fell English',serif", color: "#3D0000", fontSize: "clamp(1rem,2vw,1.4rem)", fontStyle: "italic" }}>
            Request the honour of your presence
          </p>
          <div style={{ width: "1px", height: "20px", background: "rgba(61,0,0,0.3)" }} />
          <p style={{ color: "#3D0000", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>{d.weddingDateShort}</p>
        </div>
      </section>

      {/* ── COUPLE ── */}
      <section style={{ background: "#1A0000", padding: "5rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <RoyalPattern opacity={0.06} />
        <div ref={f2} style={styles.fadeBlock}>
          <p style={{ ...styles.sectionLabel, color: "#D4AF37" }}>The Union</p>
          <RoyalDivider />
          <div style={{ display: "flex", gap: "3rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginTop: "2rem" }}>
            {[
              { name: d.brideFirstName, house: d.brideLastName, father: d.brideFamily.father, mother: d.brideFamily.mother, icon: "👑" },
              { name: d.groomFirstName, house: d.groomLastName, father: d.groomFamily.father, mother: d.groomFamily.mother, icon: "⚔️" },
            ].map((p, i) => (
              <div key={i} style={{ textAlign: "center", flex: 1, minWidth: "220px", maxWidth: "300px" }}>
                <div style={{ width: "110px", height: "110px", borderRadius: "50%", border: "1px solid #D4AF37", background: "rgba(212,175,55,0.06)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "2.5rem" }}>{p.icon}</div>
                <p style={{ color: "rgba(212,175,55,0.5)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>House of</p>
                <p style={{ color: "#D4AF37", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{p.house}</p>
                <h2 style={{ fontFamily: "'IM Fell English',serif", fontSize: "2.5rem", color: "#fff", margin: "0 0 0.8rem" }}>{p.name}</h2>
                <div style={{ width: "40px", height: "1px", background: "#D4AF37", margin: "0 auto 1rem" }} />
                <p style={{ color: "rgba(212,175,55,0.6)", fontSize: "0.78rem", lineHeight: 1.8 }}>
                  {p.father}<br />&amp; {p.mother}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARALLAX PALACE ── */}
      <section style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, willChange: "transform", transform: `translateY(${scrollY * 0.3}px)` }}>
          <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1600&auto=format&fit=crop" alt="" style={{ width: "100%", height: "130%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(26,0,0,0.65)" }} />
        </div>
        <RoyalPattern opacity={0.06} />
        <div ref={f3} style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "4rem 2rem" }}>
          <p style={{ color: "#D4AF37", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.5rem" }}>The Royal Venue</p>
          <RoyalDivider />
          <h2 style={{ fontFamily: "'IM Fell English',serif", fontSize: "clamp(2.2rem,5vw,4rem)", color: "#fff" }}>{d.venue}</h2>
          <p style={{ color: "rgba(212,175,55,0.8)", fontSize: "0.9rem", marginTop: "0.5rem" }}>{d.venueAddress}</p>
          {!preview && (
            <a href={d.venueMapsUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: "1.5rem", border: "1px solid #D4AF37", color: "#D4AF37", padding: "0.7rem 2rem", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.1em", borderRadius: "1px" }}>
              View on Maps →
            </a>
          )}
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section style={{ background: "#FBF5E8", padding: "5rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <RoyalPattern opacity={0.03} />
        <div ref={f4} style={styles.fadeBlock}>
          <p style={styles.sectionLabel}>The Grand Celebrations</p>
          <RoyalDivider />
          <h2 style={{ fontFamily: "'IM Fell English',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#3D0000", marginBottom: "2.5rem" }}>Events &amp; Ceremonies</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: "1.5rem" }}>
            {d.events.map((ev, i) => (
              <div key={i} style={{ background: "#1A0000", borderRadius: "2px", padding: "2rem 1.5rem", textAlign: "left", border: "0.5px solid rgba(212,175,55,0.2)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-20px", right: "-20px", opacity: 0.05 }}><MughalArch color="#D4AF37" height={80} /></div>
                <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{ev.icon}</div>
                <h3 style={{ fontFamily: "'IM Fell English',serif", fontSize: "1.2rem", color: "#fff" }}>{ev.name}</h3>
                <div style={{ width: "30px", height: "1px", background: "#D4AF37", margin: "0.8rem 0" }} />
                <p style={{ color: "#D4AF37", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.06em" }}>{ev.date}</p>
                <p style={{ fontFamily: "'IM Fell English',serif", fontSize: "1.1rem", color: "#fff" }}>{ev.time}</p>
                <p style={{ color: "rgba(212,175,55,0.5)", fontSize: "0.75rem", marginTop: "0.3rem" }}>{ev.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RSVP ── */}
      <section style={{ background: "linear-gradient(135deg, #3D0000 0%, #1A0000 100%)", padding: "5rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <RoyalPattern opacity={0.08} />
        <div ref={f5} style={styles.fadeBlock}>
          <p style={{ color: "#D4AF37", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>You are cordially summoned to</p>
          <RoyalDivider />
          <h2 style={{ fontFamily: "'IM Fell English',serif", fontSize: "clamp(2.5rem,6vw,5rem)", color: "#fff", marginBottom: "0.5rem" }}>
            {d.brideFirstName} &amp; {d.groomFirstName}
          </h2>
          <p style={{ fontFamily: "'IM Fell English',serif", fontSize: "1.1rem", color: "rgba(212,175,55,0.7)", fontStyle: "italic", marginBottom: "1.5rem" }}>A Royal Union</p>
          <p style={{ color: "rgba(212,175,55,0.6)", fontSize: "0.9rem", lineHeight: 1.9, maxWidth: "500px", margin: "0 auto 2.5rem" }}>
            We request the honour of your gracious presence and blessings at the royal celebration of our union.
          </p>
          {!preview && (
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`https://wa.me/${d.whatsappNumber}`} target="_blank" rel="noreferrer" style={{ background: "#D4AF37", color: "#1A0000", padding: "0.9rem 2.5rem", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.1em", fontWeight: 600, borderRadius: "1px", display: "inline-block" }}>
                RSVP via WhatsApp
              </a>
              <a href={d.venueMapsUrl} target="_blank" rel="noreferrer" style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37", padding: "0.9rem 2.5rem", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.08em", borderRadius: "1px", display: "inline-block" }}>
                View Venue
              </a>
            </div>
          )}
          <RoyalDivider />
          <p style={{ color: "rgba(212,175,55,0.3)", fontSize: "0.7rem", letterSpacing: "0.12em" }}>{d.hashtag} · {d.weddingDateShort}</p>
        </div>
      </section>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: { fontFamily: "'DM Sans',sans-serif", background: "#FBF5E8", color: "#1A0000", overflowX: "hidden" },
  hero: { position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  heroBg: { position: "absolute", inset: 0, willChange: "transform" },
  heroBgImg: { width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 30%" },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,0,0,0.6) 0%, rgba(26,0,0,0.4) 50%, rgba(26,0,0,0.9) 100%)" },
  heroContent: { position: "relative", zIndex: 2, textAlign: "center", padding: "2rem" },
  heroTag: { color: "#D4AF37", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.8rem" },
  heroInvite: { color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", letterSpacing: "0.1em", maxWidth: "500px", margin: "0 auto 1rem", lineHeight: 1.8 },
  heroNames: { fontFamily: "'IM Fell English',serif", fontSize: "clamp(2.8rem,8vw,6rem)", color: "#fff", margin: "0.5rem 0", lineHeight: 1.1 },
  heroName: { display: "block" },
  heroOf: { display: "block", color: "rgba(212,175,55,0.7)", fontSize: "0.25em", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0.2em 0", fontFamily: "'DM Sans',sans-serif" },
  heroWeds: { display: "block", color: "#D4AF37", fontSize: "0.4em", letterSpacing: "0.2em", margin: "0.3em 0", fontStyle: "italic" },
  heroDate: { color: "#D4AF37", fontSize: "1.1rem", letterSpacing: "0.2em", marginTop: "1rem" },
  heroVenue: { color: "rgba(212,175,55,0.65)", fontSize: "0.85rem", letterSpacing: "0.08em", marginTop: "0.3rem" },
  fadeBlock: { opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" },
  sectionLabel: { color: "#8B6914", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.5rem" },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
`;
