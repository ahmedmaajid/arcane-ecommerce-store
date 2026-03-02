"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const COLLECTIONS = [
  {
    id: "women",
    label: "Women",
    tag: "48 pieces",
    href: "/collections/women",
    img: "https://images.pexels.com/photos/28871654/pexels-photo-28871654.jpeg",
  },
  {
    id: "men",
    label: "Men",
    tag: "36 pieces",
    href: "/collections/men",
    img: "https://images.pexels.com/photos/207081/pexels-photo-207081.jpeg",
  },
  {
    id: "accessories",
    label: "Accessories",
    tag: "22 pieces",
    href: "/collections/accessories",
    img: "/products/bag-1.png",
  },
];

export default function CollectionCarousel() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const titleRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getPosition = (i, cur, total) => {
    let diff = i - cur;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff; // -1, 0, 1 (or further)
  };

  const applyLayout = (cur, animate = true) => {
    const total = COLLECTIONS.length;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const pos = getPosition(i, cur, total);

      const isCenter = pos === 0;
      const isAdjacent = Math.abs(pos) === 1;

      const x = pos * 155; // horizontal spread
      const z = isCenter ? 80 : isAdjacent ? -40 : -120; // depth
      const scale = isCenter ? 1 : isAdjacent ? 0.72 : 0.5;
      const opacity = isCenter ? 1 : isAdjacent ? 0.45 : 0;
      const zIndex = isCenter ? 10 : isAdjacent ? 5 : 1;

      if (animate) {
        gsap.to(el, {
          x,
          z,
          scale,
          opacity,
          zIndex,
          duration: 0.65,
          ease: "power3.inOut",
        });
      } else {
        gsap.set(el, { x, z, scale, opacity, zIndex });
      }
    });
  };

  // Initial layout on mount
  useEffect(() => {
    applyLayout(0, false);
  }, []);

  // Section entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        trackRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const goTo = (next) => {
    if (isAnimating || next === current) return;
    setIsAnimating(true);
    applyLayout(next, true);
    setCurrent(next);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const prev = () =>
    goTo((current - 1 + COLLECTIONS.length) % COLLECTIONS.length);
  const next = () => goTo((current + 1) % COLLECTIONS.length);

  const col = COLLECTIONS[current];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white w-full border-t border-stone-100 overflow-hidden"
      style={{ maxHeight: "600px", height: "600px" }}
    >
      {/* Mesh gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 80% at 50% 60%, rgba(214,211,209,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative h-full flex flex-col items-center justify-center gap-6 px-8">
        {/* Title */}
        <div ref={titleRef} className="text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium mb-1">
            SS 2025
          </p>
          <h2
            className="text-[clamp(26px,3vw,36px)] font-light text-stone-800 leading-tight tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
            }}
          >
            Choose your{" "}
            <strong className="font-bold ">
              <em>collection.</em>
            </strong>
          </h2>
        </div>

        {/* Carousel track */}
        <div
          ref={trackRef}
          className="relative flex items-center justify-center w-full"
          style={{
            height: "320px",
            perspective: "900px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {COLLECTIONS.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (itemRefs.current[i] = el)}
              className="absolute cursor-pointer"
              style={{
                width: "180px",
                height: "260px",
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
              onClick={() => goTo(i)}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={item.img}
                  fill
                  alt={item.label}
                  className="object-cover object-top"
                />
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-stone-900 to-transparent" />
                {/* Label on image */}
                <div className="absolute bottom-4 left-4">
                  <p
                    className="text-white font-manrope text-sm font-regular tracking-wider"
                    // style={{
                    //   fontFamily:
                    //     "'Cormorant Garamond', 'Garamond', Georgia, serif",
                    // }}
                  >
                    {item.label}
                  </p>
                  <p className="text-white/80 text-[11px] tracking-widest font-manrope uppercase mt-0.5">
                    {item.tag}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls + CTA row */}
        <div className="flex items-center gap-8">
          {/* Prev arrow */}
          <button
            onClick={prev}
            disabled={isAnimating}
            className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:border-stone-600 hover:text-stone-800 transition-all duration-200 disabled:opacity-30"
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {COLLECTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-4 h-[2px] bg-stone-700"
                    : "w-[6px] h-[6px] bg-stone-300 rounded-full"
                }`}
              />
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            disabled={isAnimating}
            className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:border-stone-600 hover:text-stone-800 transition-all duration-200 disabled:opacity-30"
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Shop CTA — updates with current */}
        <Link
          href={col.href}
          className="text-[12px] tracking-wider uppercase text-stone-700 hover:text-stone-900 transition-colors duration-200 border-b border-stone-300 pb-0.5 mt-5 hover:border-stone-800"
        >
          Shop {col.label}
        </Link>
      </div>
    </section>
  );
}
