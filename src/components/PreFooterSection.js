"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function PreFooterSection() {
  const sectionRef = useRef(null);
  const lineOneRef = useRef(null);
  const lineTwoRef = useRef(null);
  const paraRef = useRef(null);
  const ctaRef = useRef(null);
  const rule1Ref = useRef(null);
  const rule2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Top rule draws in
      tl.fromTo(
        rule1Ref.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power3.out", transformOrigin: "left" }
      )

        // First headline line — slides up from clip
        .fromTo(
          lineOneRef.current.querySelectorAll(".word"),
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.06,
            ease: "expo.out",
          },
          "-=0.6"
        )

        // Second line — slides up slightly after
        .fromTo(
          lineTwoRef.current.querySelectorAll(".word"),
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.06,
            ease: "expo.out",
          },
          "-=0.8"
        )

        // Bottom rule
        .fromTo(
          rule2Ref.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.out",
            transformOrigin: "left",
          },
          "-=0.4"
        )

        // Para fades in
        .fromTo(
          paraRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )

        // CTA fades in
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        );

      // Subtle parallax on the big text as you scroll past
      gsap.to([lineOneRef.current, lineTwoRef.current], {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const lineOne = ["Wear", "less."];
  const lineTwo = ["Mean", "more."];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white w-full overflow-hidden  border-stone-100"
    >
      {/* Subtle center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(214,211,209,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative px-8 md:px-14 py-20 md:py-28">
        {/* Top hairline */}
        <div
          ref={rule1Ref}
          className="w-full h-[1px] bg-stone-200 mb-10 md:mb-14 origin-left"
        />

        {/* Big headline */}
        <div className="mb-10 md:mb-14">
          {/* Line one */}
          <div
            ref={lineOneRef}
            className="overflow-hidden flex gap-4 md:gap-7 flex-wrap"
          >
            {lineOne.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <span
                  className="word inline-block font-light leading-none tracking-tight text-stone-800 text-[clamp(54px,13vw,180px)]"
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', 'Garamond', Georgia, serif",
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </div>

          {/* Line two — italic, offset right */}
          <div
            ref={lineTwoRef}
            className="overflow-hidden flex gap-4 md:gap-7 flex-wrap justify-end"
          >
            {lineTwo.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <span
                  className="word inline-block font-light leading-none tracking-tight text-stone-300 text-[clamp(54px,13vw,180px)]"
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', 'Garamond', Georgia, serif",
                  }}
                >
                  {i === 1 ? <em>{word}</em> : word}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom hairline */}
        <div
          ref={rule2Ref}
          className="w-full h-[1px] bg-stone-200 mb-10 md:mb-12 origin-left"
        />

        {/* Para + CTA row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p
            ref={paraRef}
            className="font-manrope text-[12px] text-stone-400 font-light leading-relaxed tracking-wide max-w-[300px]"
          >
            Arcane is a study in restraint. Every piece made to outlast the
            wardrobe it enters — and the trends that surround it.
          </p>

          <div ref={ctaRef} className="flex items-center gap-6">
            <Link
              href="/collections"
              className="font-manrope inline-flex items-center gap-2 bg-stone-900 text-white text-[12px] tracking-widest uppercase font-semibold px-6 py-3   hover:bg-stone-700 transition-colors duration-300"
            >
              Shop Now
            </Link>
            <Link
              href="/atelier"
              className="font-manrope font-semibold text-[12px] tracking-widest uppercase text-stone-500 hover:text-stone-900 border-b border-stone-300 pb-0.5 hover:border-stone-800 transition-colors duration-200"
            >
              Our Atelier
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
