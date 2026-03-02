"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";

gsap.registerPlugin(ScrollTrigger);

function ProductCard({ product, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: index * 0.08,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <Link
      href={`/products/${product.id}`}
      //   className="group block  min-w-[180px] w-[calc(50%-6px)] md:w-[calc(20%-13px)]"
      className="group block flex-auto min-w-25 sm:min-w-45 min-[880px]:max-w-50 lg:max-w-max w-[calc(50%-6px)] md:w-[calc(20%-13px)]"
    >
      <div ref={cardRef}>
        {/* Image box — square-ish, bg-stone-50, no shadow, subtle border */}
        <div
          className="relative w-full bg-[#e5e6e1] overflow-hidden"
          style={{ aspectRatio: "1/1" }}
        >
          <Image
            src={product.img}
            fill
            alt={product.name}
            className="object-contain object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>

        {/* Info below image — Hermès style: name bold, price below */}
        <div className="pt-3">
          <h3 className="font-manrope line-clamp-1 text-sm font-medium  leading-snug">
            {product.name}
          </h3>
          <p className="text-xs  text-neutral-600 tracking-tight font-regular mt-0.5 leading-relaxed line-clamp-2">
            {product.description}
          </p>
          <p className="font-manrope text-[14px] text-stone-600 font-medium mt-1 tracking-wide">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedProducts() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const btnRef = useRef(null);

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
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        btnRef.current,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: btnRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white w-full border-t border-stone-100"
    >
      {/* Header */}
      <div
        ref={titleRef}
        className=" px-4 sm:px-8 pt-12 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3"
      >
        <div>
          <p className="font-manrope text-[11px] tracking-widest uppercase text-stone-400 font-medium mb-2">
            Hand-picked
          </p>
          <h2
            className="text-[clamp(28px,3vw,40px)] font-regular text-stone-800 leading-tight tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
            }}
          >
            New this <strong className="font-bold italic">season.</strong>
          </h2>
        </div>
        <p className="font-manrope text-[12px] text-stone-400 font-light max-w-[240px] leading-relaxed md:text-right">
          Each piece selected for longevity, material quality, and quiet design.
        </p>
      </div>

      {/* Hairline */}
      <div className="mx-8 md:mx-14 h-[1px] bg-stone-100 mb-8" />

      {/* Flex row — 5 cards, small gap */}
      <div className="px-4 sm:px-8 md:px-14 flex flex-row flex-wrap  gap-1 gap-y-6 sm:gap-3 md:gap-4  pb-2 scrollbar-none">
        {products.slice(0,10).map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-8 md:px-14 pt-10 pb-12 flex justify-center">
        <div ref={btnRef} className="flex flex-col items-center gap-3">
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 bg-stone-900 text-white font-manrope text-[13px] tracking-wider uppercase font-medium font-manrope px-8 py-3 rounded-full hover:bg-stone-700 transition-colors duration-300"
          >
            Explore All
          </Link>

          <p className=" text-[12px] text-stone-700 font-medium">
            {products.length * 10}+ pieces available
          </p>
        </div>
      </div>
    </section>
  );
}
