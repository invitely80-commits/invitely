"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { type TemplateInvite } from "@/components/templates/render-invite";
import { formatDisplayDate } from "@/lib/utils";

const DEFAULT_DATA = {
  brideFirstName: "Sam",
  brideLastName: "Iyer",
  groomFirstName: "Alex",
  groomLastName: "Menon",
  weddingDate: "Saturday, the 21st of March, 2026",
  weddingDateShort: "21 . 03 . 2026",
  venue: "The 1522",
  venueAddress: "15/22 Church Street, Bengaluru — 560 001",
  venueMapsUrl: "https://maps.google.com",
  whatsappNumber: "919999999999",
  instagramHandle: "https://www.instagram.com/samalex2026",
  events: [
    { name: "Civil Ceremony", date: "21 Mar 2026", time: "11:00 AM", venue: "The 1522 — Main Hall", icon: "◉" },
    { name: "Cocktail Hour", date: "21 Mar 2026", time: "1:00 PM", venue: "The 1522 — Rooftop", icon: "◈" },
    { name: "Dinner & Dancing", date: "21 Mar 2026", time: "7:30 PM", venue: "The 1522 — Loft", icon: "◆" },
  ],
  brideFamily: { father: "Kiran Iyer", mother: "Deepa Iyer" },
  groomFamily: { father: "Thomas Menon", mother: "Leela Menon" },
  hashtag: "#SamAlexForever",
  photoUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
};

function useFadeIn(direction = "up") {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = direction === "left" ? "translateX(-30px)" : direction === "right" ? "translateX(30px)" : "translateY(30px)";
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.transition = "opacity 0.9s ease, transform 0.9s ease";
          el.style.opacity = "1";
          el.style.transform = "translate(0)";
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [direction]);
  return ref;
}

// Minimal geometric divider
function LineDivider({ light = false }: { light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "1.5rem 0" }}>
      <div style={{ flex: 1, height: "1px", background: light ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)" }} />
      <div style={{ width: "6px", height: "6px", background: light ? "#fff" : "#000", transform: "rotate(45deg)", opacity: 0.4 }} />
      <div style={{ flex: 1, height: "1px", background: light ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)" }} />
    </div>
  );
}

export function CivilTemplate({
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
  const f1 = useFadeIn("up"), f3 = useFadeIn("right"), f4 = useFadeIn("up"), f5 = useFadeIn("up");

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
    events: data.events.map((ev, i) => ({
      name: ev.title,
      date: formatDisplayDate(ev.date),
      time: ev.time,
      venue: ev.venue,
      icon: i === 0 ? "◉" : i === 1 ? "◈" : "◆"
    }))
  };

  return (
    <div style={S.root}>
      <style>{globalCSS}</style>

      {/* ── HERO — full-bleed editorial split ── */}
      <section style={S.hero}>
        <div style={{ ...S.heroImgWrap, transform: `translateY(${scrollY * 0.4}px)` }}>
          <Image
            src={d.photoUrl}
            alt="Wedding Hero"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center 25%", filter: "grayscale(30%)" }}
          />
          <div style={S.heroImgOverlay} />
        </div>
        <div style={S.heroLeft}>
          <div ref={useFadeIn("left")} style={{ transition: "all 0.9s ease" }}>
            <p style={S.heroSmallLabel}>Civil Wedding · {d.weddingDateShort}</p>
            <h1 style={S.heroName}>{d.brideFirstName}</h1>
            <h1 style={S.heroName}>{d.groomFirstName}</h1>
            <LineDivider />
            <p style={S.heroVenueText}>{d.venue}</p>
            <p style={{ ...S.heroVenueText, opacity: 0.4, fontSize: "0.75rem" }}>{d.venueAddress}</p>
            {!preview && (
              <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}>
                <a href={`https://wa.me/${d.whatsappNumber}`} target="_blank" rel="noreferrer" style={S.heroCtaSolid}>RSVP</a>
                <a href={d.venueMapsUrl} target="_blank" rel="noreferrer" style={S.heroCtaOutline}>Venue →</a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── COUNTER BAND ── */}
      <section style={{ background: "#000", padding: "2rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", borderTop: "1px solid #111" }}>
        {[
          { label: "Celebrations", val: d.events.length.toString() },
          { label: "Days of Joy", val: "1" },
          { label: "Guests Invited", val: "∞" },
          { label: "Years Together", val: "4+" },
        ].map((item, i) => (
          <div key={i} style={{ textAlign: "center", flex: 1 }}>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "2.2rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{item.val}</p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.4rem" }}>{item.label}</p>
          </div>
        ))}
      </section>

      {/* ── COUPLE ── */}
      <section style={{ background: "#F5F5F3", padding: "5rem clamp(2rem,6vw,6rem)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, opacity: 0.04, fontFamily: "'Space Grotesk',sans-serif", fontSize: "20rem", fontWeight: 700, lineHeight: 1, color: "#000", userSelect: "none" }}>02</div>
        <div ref={f1} style={{ position: "relative", zIndex: 1 }}>
          <p style={S.sectionLabel}>The Couple</p>
          <LineDivider />
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "3rem", alignItems: "center", marginTop: "3rem" }}>
            <div>
              <h2 style={S.coupleName}>{d.brideFirstName}</h2>
              <p style={S.coupleSurname}>{d.brideLastName}</p>
              <p style={S.coupleFamily}>{d.brideFamily.father} &amp; {d.brideFamily.mother}</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "70px", height: "70px", background: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 300 }}>&amp;</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <h2 style={S.coupleName}>{d.groomFirstName}</h2>
              <p style={S.coupleSurname}>{d.groomLastName}</p>
              <p style={S.coupleFamily}>{d.groomFamily.father} &amp; {d.groomFamily.mother}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARALLAX ── */}
      <section style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, willChange: "transform", transform: `translateY(${scrollY * 0.3}px)` }}>
          <Image
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop"
            alt="Wedding Venue"
            fill
            style={{ objectFit: "cover", filter: "grayscale(100%)" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 30%, transparent 100%)" }} />
        </div>
        <div ref={f3} style={{ position: "relative", zIndex: 2, padding: "4rem clamp(2rem,6vw,6rem)", width: "100%" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>The Venue</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{d.venue}</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginTop: "0.5rem" }}>{d.venueAddress}</p>
            </div>
            {!preview && (
              <a href={d.venueMapsUrl} target="_blank" rel="noreferrer" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "0.75rem 1.5rem", textDecoration: "none", fontSize: "0.78rem", letterSpacing: "0.1em", borderRadius: "2px", whiteSpace: "nowrap" }}>
                Get Directions →
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section style={{ background: "#fff", padding: "5rem clamp(2rem,6vw,6rem)" }}>
        <div ref={f4}>
          <p style={S.sectionLabel}>Programme</p>
          <LineDivider />
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 700, color: "#000", marginBottom: "3rem", lineHeight: 1.1 }}>The Day</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {d.events.map((ev, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "2rem", alignItems: "center", padding: "2rem 0", borderBottom: "0.5px solid rgba(0,0,0,0.1)" }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "3.5rem", fontWeight: 700, color: "rgba(0,0,0,0.08)", lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.3rem", fontWeight: 600, color: "#000" }}>{ev.name}</h3>
                  <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.8rem", marginTop: "0.2rem" }}>{ev.venue}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.1rem", fontWeight: 500, color: "#000" }}>{ev.time}</p>
                  <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.72rem", marginTop: "0.2rem" }}>{ev.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RSVP ── */}
      <section style={{ background: "#000", padding: "6rem clamp(2rem,6vw,6rem)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "-2rem", right: "-1rem", opacity: 0.04, fontFamily: "'Space Grotesk',sans-serif", fontSize: "18rem", fontWeight: 700, color: "#fff", lineHeight: 1, userSelect: "none" }}>∞</div>
        <div ref={f5}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>You&apos;re invited</p>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(3rem,8vw,7rem)", fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: "2rem" }}>
            {d.brideFirstName}<br />&amp; {d.groomFirstName}
          </h2>
          <LineDivider light />
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", lineHeight: 1.9, maxWidth: "460px", marginBottom: "2.5rem" }}>
            We&apos;d love for you to be part of our celebration. No RSVP form. No fuss. Just drop us a WhatsApp.
          </p>
          {!preview && (
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href={`https://wa.me/${d.whatsappNumber}`} target="_blank" rel="noreferrer" style={{ background: "#fff", color: "#000", padding: "0.9rem 2.5rem", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.08em", fontWeight: 600, borderRadius: "2px", display: "inline-block" }}>
                RSVP via WhatsApp →
              </a>
              <a href={d.venueMapsUrl} target="_blank" rel="noreferrer" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", padding: "0.9rem 2rem", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.06em", borderRadius: "2px", display: "inline-block" }}>
                Venue Map
              </a>
            </div>
          )}
          <LineDivider light />
          <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.72rem", letterSpacing: "0.12em" }}>{d.hashtag} · {d.weddingDateShort}</p>
        </div>
      </section>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  root: { fontFamily: "'DM Sans',sans-serif", background: "#fff", color: "#000", overflowX: "hidden" },
  hero: { position: "relative", height: "100vh", display: "flex", alignItems: "stretch", overflow: "hidden" },
  heroImgWrap: { position: "absolute", inset: 0, willChange: "transform" },
  heroImg: { width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 25%", filter: "grayscale(30%)" },
  heroImgOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)" },
  heroLeft: { position: "relative", zIndex: 2, padding: "0 clamp(2rem,6vw,6rem)", display: "flex", alignItems: "center", flex: "0 0 55%" },
  heroSmallLabel: { color: "rgba(255,255,255,0.4)", fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1.5rem" },
  heroName: { fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(3.5rem,9vw,7rem)", fontWeight: 700, color: "#fff", lineHeight: 0.95, display: "block" },
  heroVenueText: { color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", letterSpacing: "0.05em", marginTop: "0.3rem" },
  heroCtaSolid: { background: "#fff", color: "#000", padding: "0.75rem 2rem", textDecoration: "none", fontSize: "0.82rem", letterSpacing: "0.08em", fontWeight: 600, borderRadius: "2px" },
  heroCtaOutline: { border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.8)", padding: "0.75rem 2rem", textDecoration: "none", fontSize: "0.82rem", letterSpacing: "0.08em", borderRadius: "2px" },
  sectionLabel: { color: "rgba(0,0,0,0.35)", fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase" },
  coupleName: { fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 700, color: "#000", lineHeight: 1 },
  coupleSurname: { color: "rgba(0,0,0,0.4)", fontSize: "1rem", letterSpacing: "0.05em", marginTop: "0.3rem" },
  coupleFamily: { color: "rgba(0,0,0,0.35)", fontSize: "0.78rem", lineHeight: 1.8, marginTop: "0.8rem" },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
`;
