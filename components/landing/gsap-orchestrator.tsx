"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GsapOrchestrator() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Pinning the Traditions section title while the cards scroll up
      ScrollTrigger.create({
        trigger: ".gsap-tradition-container",
        start: "top top",
        end: "+=100%",
        pin: ".gsap-tradition-title",
        pinSpacing: false,
      });

      // Scrubbing the cards
      gsap.fromTo(
        ".gsap-tradition-card",
        { y: 150, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-tradition-cards-wrapper",
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      // Parallax Image in the Journey section
      gsap.to(".gsap-journey-image", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".gsap-journey-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
