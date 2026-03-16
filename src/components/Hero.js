"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const overlayTextRef = useRef(null);
  const scrollLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── ENTRANCE TIMELINE ──────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      // Staggered word reveal for headline
      const words = headlineRef.current.querySelectorAll(".word");
      tl.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1 },
        0.3
      )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          0.9
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          1.1
        )
        .fromTo(
          overlayTextRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
          0.6
        )
        .fromTo(
          scrollLineRef.current,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            transformOrigin: "top",
          },
          1.2
        );

      // ── SCROLL PARALLAX ────────────────────────────────────────────
      // Image moves up slower than scroll (parallax)
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Headline drifts up on scroll
      gsap.to(headlineRef.current, {
        yPercent: -20,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Overlay side text slow drift
      gsap.to(overlayTextRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[560px] sm:h-screen min-h-[560px] max-h-[900px] overflow-hidden bg-stone-50 flex items-end"
    >
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[115%] -top-[7%]"
      >
        <div className="w-full h-full bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300">
          {/* <Image
            src="https://images.pexels.com/photos/2540388/pexels-photo-2540388.jpeg"
            fill
            alt="..."
            className="object-cover object"
          /> */}
          <video
            autoPlay={true}
            muted
            loop
            playsInline
            src="/hero-section-video.mp4"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* subtle overall dark tint */}
          <div className="absolute inset-0 bg-stone-900/50" />

          {/* heavier dark fade at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-stone-950/90 via-stone-900/50 to-transparent" />
        </div>
      </div>

      {/* ── VERTICAL SIDE TEXT (right) ── */}
      <div
        ref={overlayTextRef}
        className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 hidden md:flex"
      >
        <span className="text-[9px] tracking-[0.22em] uppercase text-stone-300 rotate-90 whitespace-nowrap">
          SS 2025 Collection
        </span>
        <div className="w-[1px] h-12 bg-stone-300" />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-3 md:px-14 pb-6 md:pb-14">
        {/* Season tag */}
        <p className="text-[10px] tracking-[0.3em] min-[524px]:inline hidden uppercase text-stone-50 mb-6 font-medium">
          Spring · Summer 2025
        </p>

        {/* Headline — each word wrapped for individual reveal */}
        <h1
          ref={headlineRef}
          className="overflow-hidden mb-2 sm:mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
          }}
        >
          {[
            { text: "Quiet", size: "text-[clamp(32px,8vw,120px)]" },
            { text: "Luxury,", size: "text-[clamp(32px,8vw,120px)]" },
            {
              text: "Worn",
              size: "text-[clamp(32px,6vw,96px)] ",
            },
            {
              text: "Silently.",
              size: "text-[clamp(32px,6vw,96px)] ",
            },
          ].map(({ text, size }, i) => (
            <span key={i} className="inline-block overflow-hidden sm:mr-4 mr-3">
              <span
                className={`word inline-block font-light leading-none tracking-tight text-white ${size}`}
              >
                {text}
              </span>
            </span>
          ))}
        </h1>

        {/* Sub + CTA row */}
        <div
          ref={subRef}
          className="flex flex-col md:flex-row md:items-end gap-6 md:gap-14"
        >
          <p className="text-sm text-white font-manrope font-light max-w-[320px] sm:max-w-[280px] leading-relaxed tracking-wide">
            Refined clothing for those who speak through presence, not noise.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col-reverse sm:flex-row font-manrope items-start sm:items-center gap-4 sm:gap-8"
          >
            <Link
              href="/collections"
              className="group inline-flex items-center gap-2.5 bg-stone-200 text-stone-700 text-[11px] tracking-widest uppercase font-extrabold px-5 sm:px-8 py-4 hover:bg-stone-300 transition-colors duration-300"
            >
              Explore Collection
              <ArrowUpRight
                size={13}
                strokeWidth={1.5}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </Link>

            <Link
              href="/collections/new"
              className="text-[11px] tracking-widest font-semibold uppercase  text-white/70 hover:text-white transition-colors duration-200 border-b border-white/40 pb-0.5 hover:border-white"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-stone-200/60" />
    </section>
  );
}
