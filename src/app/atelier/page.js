"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    num: "01",
    title: "Material",
    body: "Every fabric is sourced from mills with over a century of heritage. We work only with natural fibres — wool, linen, silk — that age with grace.",
    img1: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg",
    img2: "https://images.pexels.com/photos/4210863/pexels-photo-4210863.jpeg",
  },
  {
    num: "02",
    title: "Process",
    body: "Each piece passes through the hands of a single craftsman from cut to finish. No assembly lines. No shortcuts. Forty hours minimum, per garment.",
    img1: "https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg",
    img2: "https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg",
  },
  {
    num: "03",
    title: "Longevity",
    body: "We design for decades, not seasons. Our pieces are built to outlast trends — and come with a lifetime repair guarantee.",
    img1: "https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg",
    img2: "https://images.pexels.com/photos/3622618/pexels-photo-3622618.jpeg",
  },
];

function Pillar({ num, title, body, img1, img2, index }) {
  const rowRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const numRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text + number fade up on scroll
      gsap.fromTo(
        [numRef.current, textRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Line draws in
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          transformOrigin: "left",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image 1 — parallax up
      gsap.to(img1Ref.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Image 2 — parallax down (opposite direction = depth)
      gsap.to(img2Ref.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, rowRef);

    return () => ctx.revert();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={rowRef}
      className={`flex flex-col md:flex-row items-start gap-0 border-t border-stone-200 pt-0 ${
        isEven ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* ── LEFT / TEXT SIDE ── */}
      <div className="flex-1 flex flex-col justify-between py-12 md:py-16 px-8 md:px-14 min-h-[420px]">
        {/* Giant number */}
        <div ref={numRef}>
          <span
            className="block text-[clamp(80px,14vw,180px)] font-light leading-none text-stone-100 select-none"
            style={{
              fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
            }}
          >
            {num}
          </span>
        </div>

        {/* Text block — sits mid/bottom */}
        <div ref={textRef} className="mt-auto max-w-[380px]">
          <h3
            className="text-[clamp(28px,3.5vw,48px)] font-light text-stone-800 mb-4 leading-tight tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
            }}
          >
            {title}
          </h3>
          <p className="text-[13px] text-stone-500 font-light leading-relaxed tracking-wide max-w-[300px] mb-8">
            {body}
          </p>
          <Link
            href="/craftsmanship"
            className="group inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase text-stone-700 border-b border-stone-300 pb-1 hover:border-stone-700 transition-colors duration-300"
          >
            Learn more
            <ArrowUpRight
              size={11}
              strokeWidth={1.5}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>

      {/* ── RIGHT / IMAGES SIDE ── */}
      <div className="w-full md:w-[45%] flex gap-3 px-4 md:px-8 py-10 md:py-14 items-start">
        {/* Tall image */}
        <div
          ref={img1Ref}
          className="flex-1 relative overflow-hidden"
          style={{ aspectRatio: "3/4" }}
        >
          <Image
            src={img1}
            fill
            alt={title}
            className="object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Shorter image — offset down */}
        <div
          ref={img2Ref}
          className="flex-1 relative overflow-hidden mt-12"
          style={{ aspectRatio: "3/4" }}
        >
          <Image
            src={img2}
            fill
            alt={title}
            className="object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>

      {/* Divider line */}
      <div
        ref={lineRef}
        className="hidden md:block absolute left-0 right-0 h-[1px] bg-stone-200"
        style={{ originX: 0 }}
      />
    </div>
  );
}

export default function Atelier() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white relative overflow-hidden">
      {/* Section header */}
      <div
        ref={headingRef}
        className="px-8 md:px-14 pt-20 pb-0 flex items-end justify-between border-b border-stone-200"
      >
        <div className="pb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-3 font-medium">
            Our Philosophy
          </p>
          <h2
            className="text-[clamp(32px,5vw,64px)] font-light text-stone-800 leading-tight tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
            }}
          >
            Made without
            <br />
            <em>compromise.</em>
          </h2>
        </div>

        {/* Decorative large text */}
        <span className="hidden md:block text-[11px] tracking-[0.2em] uppercase text-stone-300 pb-8 rotate-0">
          Arcane Atelier — Est. 2019
        </span>
      </div>

      {/* Pillars */}
      <div className="relative divide-y divide-stone-200">
        {PILLARS.map((p, i) => (
          <Pillar key={p.num} {...p} index={i} />
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div className="border-t border-stone-200 px-8 md:px-14 py-10 flex flex-col sm:flex-row items-start gap-4 sm:items-center justify-between">
        <p className="text-[12px] text-stone-400 tracking-wide font-light max-w-[280px]">
          Every Arcane piece is numbered, documented, and repaired for life.
        </p>
        <Link
          href="/about"
          className="group inline-flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-stone-700 border border-stone-300 px-6 py-3 hover:border-stone-700 hover:bg-stone-50 transition-all duration-300"
        >
          Our Story
          <ArrowUpRight
            size={12}
            strokeWidth={1.5}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
          />
        </Link>
      </div>
    </section>
  );
}
