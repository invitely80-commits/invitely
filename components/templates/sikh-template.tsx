"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

const DEFAULT_DATA = {
  brideFirstName: "Preet",
  brideLastName: "Kaur",
  groomFirstName: "Arjun",
  groomLastName: "Singh",
  weddingDate: "Sunday, the 8th of March, 2026",
  weddingDateShort: "08 . 03 . 2026",
  venue: "Sri Guru Singh Sabha Gurdwara",
  venueAddress: "Race Course Road, Bengaluru — 560 001",
  receptionVenue: "The Chancery Pavilion",
  venueMapsUrl: "https://maps.google.com",
  whatsappNumber: "919999999999",
  instagramHandle: "@arjunpreetbliss",
  events: [
    { name: "Vatna Ceremony", date: "7 Mar 2026", time: "11:00 AM", venue: "Bride's Residence", icon: "🌼" },
    { name: "Anand Karaj", date: "8 Mar 2026", time: "9:00 AM", venue: "Sri Guru Singh Sabha", icon: "🙏" },
    { name: "Milni & Lunch", date: "8 Mar 2026", time: "12:00 PM", venue: "Sri Guru Singh Sabha", icon: "🍛" },
    { name: "Reception", date: "8 Mar 2026", time: "7:00 PM", venue: "The Chancery Pavilion", icon: "✨" },
  ],
  brideFamily: { father: "Gurpreet Singh Kaur", mother: "Manpreet Kaur", siblings: "Harpreet & Simran" },
  groomFamily: { father: "Balvinder Singh", mother: "Rupinder Kaur", siblings: "Rajveer Singh" },
  hashtag: "#ArjunPreetDiShaadi",
  photoUrl: "https://images.unsplash.com/photo-1605648916319-cf082f7524a1?q=80&w=1600&auto=format&fit=crop",
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
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// Khanda SVG symbol
function KhandaSvg({ size = 80, color = "#F4830A" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="50" rx="48" ry="48" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M50 15 L50 85 M30 28 Q50 20 70 28 M30 72 Q50 80 70 72" stroke={color} strokeWidth="2.5" fill="none" opacity="0.8" />
      <circle cx="50" cy="50" r="10" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M40 40 Q30 50 40 60 Q50 55 50 50 Q50 45 40 40Z" fill={color} opacity="0.5" />
      <path d="M60 40 Q70 50 60 60 Q50 55 50 50 Q50 45 60 40Z" fill={color} opacity="0.5" />
    </svg>
  );
}

function OrangeDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "1.5rem auto", maxWidth: "300px" }}>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #F4830A)" }} />
      <KhandaSvg size={28} color="#F4830A" />
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #F4830A)" }} />
    </div>
  );
}

export function SikhTemplate({
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
      icon: ev.title.toLowerCase().includes("vatna") ? "🌼" :
        ev.title.toLowerCase().includes("karaj") ? "🙏" :
          ev.title.toLowerCase().includes("milni") ? "🍛" : "✨"
    }))
  };

  return (
    <div style={styles.root}>
      <style>{globalCSS}</style>

      {/* ── HERO ── */}
      <section style={styles.hero}>
        <div style={{ ...styles.heroBg, transform: `translateY(${scrollY * 0.45}px)` }}>
          <Image
            src={d.photoUrl}
            alt="Sikh Wedding Hero"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          <div style={styles.heroOverlay} />
        </div>
        <div style={styles.heroContent}>
          <div style={{ marginBottom: "1.5rem" }}><KhandaSvg size={70} color="#F4830A" /></div>
          <p style={styles.heroGurmukhi}>ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ</p>
          <OrangeDivider />
          <p style={styles.heroInvite}>Together with their families</p>
          <h1 style={styles.heroNames}>
            <span style={styles.heroName}>{d.brideFirstName}</span>
            <span style={styles.heroWeds}>weds</span>
            <span style={styles.heroName}>{d.groomFirstName}</span>
          </h1>
          <OrangeDivider />
          <p style={styles.heroDate}>{d.weddingDateShort}</p>
          <p style={styles.heroVenue}>{d.venue}</p>
          <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, transparent, #F4830A)" }} />
          </div>
        </div>
      </section>

      {/* ── GURBANI BAND ── */}
      <section style={{ background: "#1A2E5E", padding: "3.5rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ position: "absolute", top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%` }}>
              <KhandaSvg size={120} color="#F4830A" />
            </div>
          ))}
        </div>
        <div ref={f1} style={styles.fadeBlock}>
          <p style={{ fontFamily: "'Noto Sans Gurmukhi',sans-serif", fontSize: "clamp(1rem,2.5vw,1.5rem)", color: "#F4830A", lineHeight: 2, marginBottom: "0.5rem" }}>
            ਪਰਮੇਸਰਿ ਆਪਿ ਮਿਲਾਏ ਤਾਂ ਵਿਛੋੜਾ ਕੋ ਨ ਕਰਈ
          </p>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(0.9rem,2vw,1.2rem)", color: "rgba(244,131,10,0.7)", fontStyle: "italic" }}>
            &quot;When the Lord Himself unites, no one can separate them.&quot;
          </p>
          <p style={{ color: "rgba(244,131,10,0.4)", fontSize: "0.72rem", letterSpacing: "0.12em", marginTop: "0.8rem" }}>— Sri Guru Granth Sahib Ji</p>
        </div>
      </section>

      {/* ── COUPLE ── */}
      <section style={{ background: "#F7F4EE", padding: "5rem 2rem", textAlign: "center" }}>
        <div ref={f2} style={styles.fadeBlock}>
          <p style={styles.sectionLabel}>The Couple</p>
          <OrangeDivider />
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginTop: "2rem" }}>
            {[
              { name: d.brideFirstName, surname: d.brideLastName, father: d.brideFamily.father, mother: d.brideFamily.mother, icon: "🌸", role: "The Bride" },
              { name: d.groomFirstName, surname: d.groomLastName, father: d.groomFamily.father, mother: d.groomFamily.mother, icon: "🦅", role: "The Groom" },
            ].map((p, i) => (
              <div key={i} style={{ textAlign: "center", flex: 1, minWidth: "220px", maxWidth: "300px" }}>
                <div style={{ width: "110px", height: "110px", borderRadius: "50%", border: "2px solid #F4830A", background: "rgba(244,131,10,0.06)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "2.5rem" }}>{p.icon}</div>
                <p style={{ color: "#1A2E5E", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>{p.role}</p>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 400, color: "#1A2E5E", margin: "0.4rem 0 0.2rem" }}>{p.name}</h2>
                <p style={{ color: "#F4830A", fontSize: "0.9rem", letterSpacing: "0.06em", marginBottom: "1rem" }}>{p.surname}</p>
                <div style={{ width: "40px", height: "2px", background: "linear-gradient(to right, #1A2E5E, #F4830A)", margin: "0.8rem auto" }} />
                <p style={{ color: "#5A6A85", fontSize: "0.8rem", lineHeight: 1.8 }}>
                  Child of<br /><strong style={{ color: "#1A2E5E" }}>{p.father}</strong><br />&amp; <strong style={{ color: "#1A2E5E" }}>{p.mother}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARALLAX ── */}
      <section style={{ position: "relative", minHeight: "65vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, willChange: "transform", transform: `translateY(${scrollY * 0.28}px)` }}>
          <Image
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop"
            alt="Anand Karaj Venue"
            fill
            style={{ objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(26,46,94,0.75)" }} />
        </div>
        <div ref={f3} style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "4rem 2rem" }}>
          <div style={{ display: "flex", justifyContent: "center" }}><KhandaSvg size={60} color="#F4830A" /></div>
          <p style={{ color: "#F4830A", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", margin: "1rem 0 0.5rem" }}>Anand Karaj</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", fontWeight: 300 }}>{d.venue}</h2>
          <p style={{ color: "rgba(244,131,10,0.8)", fontSize: "0.9rem", marginTop: "0.5rem" }}>{d.venueAddress}</p>
          <div style={{ margin: "1rem 0", width: "60px", height: "2px", background: "linear-gradient(to right, #1A2E5E, #F4830A)", marginLeft: "auto", marginRight: "auto" }} />
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>{d.weddingDate}</p>
          {!preview && (
            <a href={d.venueMapsUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: "1.5rem", border: "1px solid #F4830A", color: "#F4830A", padding: "0.7rem 2rem", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.1em", borderRadius: "2px" }}>
              Get Directions →
            </a>
          )}
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section style={{ background: "#F7F4EE", padding: "5rem 2rem", textAlign: "center" }}>
        <div ref={f4} style={styles.fadeBlock}>
          <p style={styles.sectionLabel}>Celebrations</p>
          <OrangeDivider />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#1A2E5E", fontWeight: 400, marginBottom: "2.5rem" }}>Schedule of Events</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {d.events.map((ev, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "2px", padding: "2rem 1.5rem", textAlign: "left", borderLeft: "3px solid", borderLeftColor: i % 2 === 0 ? "#1A2E5E" : "#F4830A", boxShadow: "0 2px 20px rgba(26,46,94,0.06)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{ev.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "#1A2E5E" }}>{ev.name}</h3>
                <div style={{ width: "30px", height: "2px", background: i % 2 === 0 ? "#1A2E5E" : "#F4830A", margin: "0.8rem 0" }} />
                <p style={{ color: "#F4830A", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.06em" }}>{ev.date}</p>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "#1A2E5E" }}>{ev.time}</p>
                <p style={{ color: "#8A98B0", fontSize: "0.78rem", marginTop: "0.3rem" }}>{ev.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RSVP ── */}
      <section style={{ background: "linear-gradient(135deg, #1A2E5E 0%, #0D1E45 100%)", padding: "5rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40px", right: "-40px", opacity: 0.05 }}><KhandaSvg size={300} color="#F4830A" /></div>
        <div style={{ position: "absolute", bottom: "-40px", left: "-40px", opacity: 0.05 }}><KhandaSvg size={300} color="#F4830A" /></div>
        <div ref={f5} style={styles.fadeBlock}>
          <p style={{ color: "#F4830A", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>You are invited</p>
          <OrangeDivider />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", fontWeight: 300, marginBottom: "1rem" }}>
            {d.brideFirstName} &amp; {d.groomFirstName}
          </h2>
          <p style={{ color: "rgba(244,131,10,0.7)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto 2.5rem" }}>
            With the blessings of Waheguru and our families, we humbly invite you to witness our Anand Karaj and share in our joy.
          </p>
          {!preview && (
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`https://wa.me/${d.whatsappNumber}`} target="_blank" rel="noreferrer" style={{ background: "#F4830A", color: "#fff", padding: "0.85rem 2.5rem", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.08em", fontWeight: 500, borderRadius: "2px", display: "inline-block" }}>
                RSVP via WhatsApp
              </a>
              <a href={d.venueMapsUrl} target="_blank" rel="noreferrer" style={{ border: "1px solid rgba(244,131,10,0.4)", color: "#F4830A", padding: "0.85rem 2.5rem", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.08em", borderRadius: "2px", display: "inline-block" }}>
                View Venue
              </a>
            </div>
          )}
          <OrangeDivider />
          <p style={{ color: "rgba(244,131,10,0.35)", fontSize: "0.72rem", letterSpacing: "0.1em" }}>{d.hashtag} · {d.weddingDateShort}</p>
        </div>
      </section>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: { fontFamily: "'DM Sans',sans-serif", background: "#F7F4EE", color: "#1A2E5E", overflowX: "hidden" },
  hero: { position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  heroBg: { position: "absolute", inset: 0, willChange: "transform" },
  heroBgImg: { width: "100%", height: "115%", objectFit: "cover" },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,46,94,0.7) 0%, rgba(26,46,94,0.45) 50%, rgba(26,46,94,0.85) 100%)" },
  heroContent: { position: "relative", zIndex: 2, textAlign: "center", padding: "2rem" },
  heroGurmukhi: { fontFamily: "'Noto Sans Gurmukhi',sans-serif", fontSize: "clamp(1rem,2.5vw,1.4rem)", color: "#F4830A", marginBottom: "0.5rem", lineHeight: 1.8 },
  heroInvite: { color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", letterSpacing: "0.15em", marginBottom: "1rem" },
  heroNames: { fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 400, color: "#fff", margin: "0.5rem 0", lineHeight: 1.1 },
  heroName: { display: "block" },
  heroWeds: { display: "block", color: "#F4830A", fontSize: "0.35em", letterSpacing: "0.4em", textTransform: "uppercase", margin: "0.2em 0" },
  heroDate: { color: "#F4830A", fontSize: "1.1rem", letterSpacing: "0.2em", marginTop: "1rem" },
  heroVenue: { color: "rgba(244,131,10,0.7)", fontSize: "0.85rem", letterSpacing: "0.08em", marginTop: "0.3rem" },
  fadeBlock: { opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" },
  sectionLabel: { color: "#F4830A", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.5rem" },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=Noto+Sans+Gurmukhi:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
`;
