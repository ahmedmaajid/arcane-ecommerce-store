"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  {
    num: "01",
    text: "Crafted by hand.",
    sub: "Every stitch placed with intention. No machine replaces the eye of a craftsman.",
  },
  {
    num: "02",
    text: "Worn for decades.",
    sub: "We design for the version of you ten years from now. Not for next season.",
  },
  {
    num: "03",
    text: "Never on sale.",
    sub: "Price is a promise. Discounting is a broken one.",
  },
];

function Statement({ num, text, sub }) {
  const rowRef = useRef(null);
  const numRef = useRef(null);
  const textRef = useRef(null);
  const subRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          transformOrigin: "left",
        }
      )
        .fromTo(
          numRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          textRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
          "-=0.3"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rowRef} className="relative">
      <div ref={lineRef} className="w-full h-[1px] bg-stone-200 origin-left" />

      <div className="flex flex-col md:grid md:grid-cols-[0px_1fr_280px] md:items-center gap-2 md:gap-10 py-5 md:py-6">
        {/* Mobile: number + text inline */}
        <div className="flex items-baseline gap-3 md:block">
          <span
            ref={numRef}
            className="text-[10px] tracking-[0.2em] text-stone-300 font-light shrink-0"
          >
            {num}
          </span>
          {/* Text visible only on mobile here */}
          <div className="overflow-hidden md:hidden">
            <h3
              ref={textRef}
              className="text-2xl font-regular leading-tight tracking-tight text-stone-800"
              style={{
                fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
              }}
            >
              {text}
            </h3>
          </div>
        </div>

        {/* Text visible only on desktop */}
        <div className="overflow-hidden hidden md:block">
          <h3
            className="text-[clamp(16px,2vw,26px)] font-regular leading-none tracking-tight text-stone-800"
            style={{
              fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
            }}
          >
            {text}
          </h3>
        </div>

        {/* Sub text */}
        <p
          ref={subRef}
          className="text-[12px] text-stone-400 font-manrope font-regular leading-relaxed tracking-wide md:text-right"
        >
          {sub}
        </p>
      </div>
    </div>
  );
}

export default function EditorialSection() {
  const sectionRef = useRef(null);
  const closingRef = useRef(null);
  const closingLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: closingRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        closingLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power3.out", transformOrigin: "left" }
      ).fromTo(
        closingRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out" },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white w-full overflow-hidden"
    >
      {/* ── SUBTLE MESH GRADIENT CENTER ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(214,211,209,0.22) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 15% 85%, rgba(231,229,228,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 85% 15%, rgba(231,229,228,0.12) 0%, transparent 60%)
          `,
        }}
      />

      {/* Top label */}
      <div className="relative px-4 sm:px-8 md:px-14 pt-8 pb-0 flex items-center justify-between">
        <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium">
          Our Principles
        </p>
        <p className="text-[10px] tracking-[0.3em] uppercase text-stone-300 font-medium hidden md:block">
          Arcane — Est. 2019
        </p>
      </div>

      {/* Statements */}
      <div className="relative px-4 sm:px-8 md:px-14 mt-6">
        {STATEMENTS.map((s, i) => (
          <Statement key={s.num} {...s} index={i} />
        ))}
        <div
          ref={closingLineRef}
          className="w-full h-[1px] bg-stone-200 origin-left"
        />
      </div>

      {/* Closing quote */}
      <div
        ref={closingRef}
        className="relative px-8 md:px-14 py-8 md:py-10 flex justify-center"
      >
        <p
          className="text-center text-[clamp(22px,1.8vw,28px)] font-medium text-stone-600 leading-snug tracking-tight max-w-[560px]"
          style={{
            fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
          }}
        >
          <em>"Because real luxury needs no introduction."</em>
        </p>
      </div>
    </section>
  );
}
