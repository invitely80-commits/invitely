"use client";

import React, { useEffect, useRef, useState } from "react";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

const DEFAULT_DATA = {
  brideFirstName: "Clara",
  brideLastName: "D'Souza",
  groomFirstName: "Ethan",
  groomLastName: "Fernandes",
  weddingDate: "Saturday, the 7th of March, 2026",
  weddingDateShort: "07 . 03 . 2026",
  venue: "Sacred Heart Cathedral",
  venueAddress: "Cathedral Road, Bengaluru — 560 025",
  receptionVenue: "The Windsor Hotel",
  receptionAddress: "Windsor Square, MG Road, Bengaluru",
  venueMapsUrl: "https://maps.google.com",
  whatsappNumber: "919999999999",
  instagramHandle: "@claraethanwed",
  events: [
    { name: "Church Ceremony", date: "7 Mar 2026", time: "10:30 AM", venue: "Sacred Heart Cathedral", icon: "⛪" },
    { name: "Wedding Lunch", date: "7 Mar 2026", time: "1:00 PM", venue: "The Windsor Hotel", icon: "🥂" },
    { name: "Evening Reception", date: "7 Mar 2026", time: "7:00 PM", venue: "The Windsor Hotel", icon: "✨" },
  ],
  brideFamily: { father: "Robert D'Souza", mother: "Maria D'Souza", siblings: "Rachel D'Souza" },
  groomFamily: { father: "Joseph Fernandes", mother: "Anne Fernandes", siblings: "Luke Fernandes" },
  hashtag: "#ClaraEthanForever",
  photoUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop",
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

function FloralSvg({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 80" style={{ width: "200px", opacity: 0.35, ...style }} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 40 Q40 10 60 40 Q80 70 100 40 Q120 10 140 40 Q160 70 180 40" stroke="#B8946A" strokeWidth="1" fill="none" />
      {[30, 60, 90, 120, 150].map(x => (
        <g key={x}>
          <circle cx={x} cy={x < 91 ? 25 : 55} r="5" fill="#B8946A" opacity="0.5" />
          <circle cx={x} cy={x < 91 ? 25 : 55} r="9" fill="none" stroke="#B8946A" strokeWidth="0.5" opacity="0.3" />
        </g>
      ))}
      <circle cx="10" cy="40" r="4" fill="#B8946A" opacity="0.4" />
      <circle cx="190" cy="40" r="4" fill="#B8946A" opacity="0.4" />
    </svg>
  );
}

function ChampagneDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "1.5rem auto", maxWidth: "320px" }}>
      <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, #B8946A)" }} />
      <FloralSvg style={{ width: "80px", height: "30px" }} />
      <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, #B8946A)" }} />
    </div>
  );
}

export function ChristianTemplate({
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
      icon: ev.title.toLowerCase().includes("church") || ev.title.toLowerCase().includes("ceremony") ? "⛪" :
            ev.title.toLowerCase().includes("lunch") || ev.title.toLowerCase().includes("dinner") ? "🥂" : "✨"
    }))
  };

  return (
    <div style={S.root}>
      <style>{globalCSS}</style>

      {/* ── HERO ── */}
      <section style={S.hero}>
        <div style={{ ...S.heroBg, transform: `translateY(${scrollY * 0.4}px)` }}>
          <img src={d.photoUrl} alt="" style={S.heroBgImg} />
          <div style={S.heroOverlay} />
        </div>
        <div style={S.heroContent}>
          <p style={S.heroCross}>✝</p>
          <p style={S.heroVerse}>&quot;What God has joined together, let no man separate.&quot;</p>
          <p style={S.heroVerseRef}>— Mark 10:9</p>
          <ChampagneDivider />
          <p style={S.heroInvite}>request the honour of your presence at the marriage of</p>
          <h1 style={S.heroNames}>
            <span style={S.heroName}>{d.brideFirstName}</span>
            <span style={S.heroAnd}>&amp;</span>
            <span style={S.heroName}>{d.groomFirstName}</span>
          </h1>
          <ChampagneDivider />
          <p style={S.heroDate}>{d.weddingDateShort}</p>
          <p style={S.heroVenue}>{d.venue}</p>
          <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, transparent, rgba(184,148,106,0.6))" }} />
          </div>
        </div>
      </section>

      {/* ── VERSE BAND ── */}
      <section style={{ background: "#FDFAF6", padding: "4rem 2rem", textAlign: "center", borderTop: "0.5px solid #EDE0CF", borderBottom: "0.5px solid #EDE0CF" }}>
        <div ref={f1} style={S.fadeBlock}>
          <FloralSvg style={{ margin: "0 auto 1.5rem", display: "block" }} />
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.2rem,3vw,1.8rem)", color: "#5C4A35", fontStyle: "italic", maxWidth: "700px", margin: "0 auto", lineHeight: 1.8 }}>
            &quot;Love is patient, love is kind. It does not envy, it does not boast, it is not proud.&quot;
          </p>
          <p style={{ color: "rgba(184,148,106,0.7)", fontSize: "0.78rem", letterSpacing: "0.12em", marginTop: "1rem" }}>— 1 Corinthians 13:4</p>
          <FloralSvg style={{ margin: "1.5rem auto 0", display: "block", transform: "scaleX(-1)" }} />
        </div>
      </section>

      {/* ── COUPLE ── */}
      <section style={{ background: "#fff", padding: "5rem 2rem", textAlign: "center", position: "relative" }}>
        <div ref={f2} style={S.fadeBlock}>
          <p style={S.sectionLabel}>The Couple</p>
          <ChampagneDivider />
          <div style={{ display: "flex", gap: "3rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginTop: "2rem" }}>
            {[
              { name: d.brideFirstName, surname: d.brideLastName, role: "The Bride", father: d.brideFamily.father, mother: d.brideFamily.mother, icon: "💐" },
              { name: d.groomFirstName, surname: d.groomLastName, role: "The Groom", father: d.groomFamily.father, mother: d.groomFamily.mother, icon: "🕊️" },
            ].map((p, i) => (
              <div key={i} style={{ textAlign: "center", flex: 1, minWidth: "220px", maxWidth: "300px" }}>
                <div style={{ width: "110px", height: "110px", borderRadius: "50%", border: "1px solid #B8946A", background: "#FBF7F2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "2.5rem" }}>{p.icon}</div>
                <p style={{ color: "#B8946A", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{p.role}</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", fontWeight: 400, color: "#3A2A1A", lineHeight: 1.1 }}>{p.name}</h2>
                <p style={{ color: "#8A7060", fontSize: "0.9rem", letterSpacing: "0.05em", marginBottom: "1rem" }}>{p.surname}</p>
                <div style={{ width: "40px", height: "0.5px", background: "#B8946A", margin: "0.8rem auto" }} />
                <p style={{ color: "#7A6A58", fontSize: "0.78rem", lineHeight: 1.8 }}>
                  Child of<br /><strong style={{ color: "#5C4A35" }}>{p.father}</strong><br />&amp; <strong style={{ color: "#5C4A35" }}>{p.mother}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARALLAX CHURCH ── */}
      <section style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, willChange: "transform", transform: `translateY(${scrollY * 0.3}px)` }}>
          <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1600&auto=format&fit=crop" alt="" style={{ width: "100%", height: "130%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(250,246,240,0.75)" }} />
        </div>
        <div ref={f3} style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "4rem 2rem" }}>
          <p style={{ color: "#B8946A", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Ceremony</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3.5rem)", color: "#3A2A1A", fontWeight: 400, marginBottom: "0.5rem" }}>{d.venue}</h2>
          <p style={{ color: "#8A7060", fontSize: "0.9rem", letterSpacing: "0.05em", marginBottom: "1.5rem" }}>{d.venueAddress}</p>
          <div style={{ width: "60px", height: "0.5px", background: "#B8946A", margin: "1.5rem auto" }} />
          <p style={{ color: "#B8946A", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Reception</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", color: "#3A2A1A" }}>{d.receptionVenue}</p>
          <p style={{ color: "#8A7060", fontSize: "0.85rem", marginTop: "0.3rem" }}>{d.receptionAddress}</p>
          <a href={d.venueMapsUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: "1.5rem", border: "0.5px solid #B8946A", color: "#B8946A", padding: "0.7rem 2rem", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.1em", borderRadius: "1px" }}>
            Get Directions →
          </a>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section style={{ background: "#FDFAF6", padding: "5rem 2rem", textAlign: "center" }}>
        <div ref={f4} style={S.fadeBlock}>
          <p style={S.sectionLabel}>The Day</p>
          <ChampagneDivider />
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#3A2A1A", fontWeight: 400, marginBottom: "2.5rem" }}>Order of Celebrations</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", maxWidth: "600px", margin: "0 auto" }}>
            {d.events.map((ev, i) => (
              <div key={i} style={{ display: "flex", gap: "2rem", alignItems: "flex-start", padding: "1.5rem", background: i % 2 === 0 ? "#fff" : "#FDFAF6", borderLeft: "2px solid #B8946A" }}>
                <span style={{ fontSize: "1.8rem", flex: "0 0 auto", marginTop: "0.2rem" }}>{ev.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", color: "#3A2A1A" }}>{ev.name}</h3>
                  <p style={{ color: "#B8946A", fontSize: "0.8rem", fontWeight: 500, marginTop: "0.2rem" }}>{ev.time} · {ev.date}</p>
                  <p style={{ color: "#8A7060", fontSize: "0.78rem", marginTop: "0.2rem" }}>{ev.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RSVP ── */}
      <section style={{ background: "#3A2A1A", padding: "5rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
          <FloralSvg style={{ position: "absolute", top: "10%", left: "5%", width: "300px", transform: "rotate(-15deg)" }} />
          <FloralSvg style={{ position: "absolute", bottom: "10%", right: "5%", width: "300px", transform: "rotate(165deg)" }} />
        </div>
        <div ref={f5} style={S.fadeBlock}>
          <p style={{ color: "#B8946A", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.5rem" }}>You are cordially invited</p>
          <ChampagneDivider />
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,5vw,4rem)", color: "#fff", fontWeight: 300, marginBottom: "1rem" }}>
            {d.brideFirstName} &amp; {d.groomFirstName}
          </h2>
          <p style={{ color: "rgba(184,148,106,0.7)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "460px", margin: "0 auto 2.5rem" }}>
            We would be honoured by your presence and prayers as we begin our lives together in faith and love.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`https://wa.me/${d.whatsappNumber}`} target="_blank" rel="noreferrer" style={{ background: "#B8946A", color: "#fff", padding: "#0.85rem 2.5rem", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.08em", borderRadius: "1px", display: "inline-block" }}>
              RSVP via WhatsApp
            </a>
            <a href={d.venueMapsUrl} target="_blank" rel="noreferrer" style={{ border: "0.5px solid rgba(184,148,106,0.4)", color: "#B8946A", padding: "0.85rem 2.5rem", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.08em", borderRadius: "1px", display: "inline-block" }}>
              View Venue
            </a>
          </div>
          <ChampagneDivider />
          <p style={{ color: "rgba(184,148,106,0.4)", fontSize: "0.72rem", letterSpacing: "0.1em" }}>{d.brideFirstName} &amp; {d.groomFirstName} · {d.weddingDateShort}</p>
        </div>
      </section>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  root: { fontFamily: "'DM Sans',sans-serif", background: "#FDFAF6", color: "#3A2A1A", overflowX: "hidden" },
  hero: { position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  heroBg: { position: "absolute", inset: 0, willChange: "transform" },
  heroBgImg: { width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 30%" },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(250,246,240,0.15) 0%, rgba(250,246,240,0.05) 50%, rgba(58,42,26,0.7) 100%)" },
  heroContent: { position: "relative", zIndex: 2, textAlign: "center", padding: "2rem", width: "100%" },
  heroCross: { color: "rgba(184,148,106,0.9)", fontSize: "2rem", marginBottom: "1rem" },
  heroVerse: { fontFamily: "'Cormorant Garamond',serif", color: "rgba(255,255,255,0.9)", fontSize: "clamp(0.9rem,2vw,1.1rem)", fontStyle: "italic", maxWidth: "500px", margin: "0 auto" },
  heroVerseRef: { color: "rgba(184,148,106,0.7)", fontSize: "0.72rem", letterSpacing: "0.1em", marginTop: "0.4rem" },
  heroInvite: { color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", letterSpacing: "0.12em", marginBottom: "1rem" },
  heroNames: { fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 400, color: "#fff", margin: "0.5rem 0", lineHeight: 1.1 },
  heroName: { display: "block" },
  heroAnd: { display: "block", color: "#B8946A", fontSize: "0.4em", letterSpacing: "0.3em", margin: "0.15em 0", fontStyle: "italic" },
  heroDate: { color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", letterSpacing: "0.2em", marginTop: "1rem" },
  heroVenue: { color: "rgba(184,148,106,0.8)", fontSize: "0.85rem", letterSpacing: "0.1em", marginTop: "0.3rem" },
  fadeBlock: { opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" },
  sectionLabel: { color: "#B8946A", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.5rem" },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
`;

