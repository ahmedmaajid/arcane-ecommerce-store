// ── PRODUCT CARD ─────────────────────────────────────────────
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, index }) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image starts scaled back (feels like coming forward on enter)
      gsap.fromTo(
        imgRef.current,
        { scale: 1.12, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: (index % 4) * 0.08,
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );

      // Card wrapper fade up
      gsap.fromTo(
        wrapRef.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: (index % 4) * 0.08,
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div ref={wrapRef}>
        {/* Image container */}
        <div
          className="relative w-full bg-stone-50 border border-stone-100 overflow-hidden"
          style={{ aspectRatio: "3/4" }}
        >
          <div ref={imgRef} className="absolute inset-0">
            <Image
              src={product.img}
              fill
              alt={product.name}
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>

         
        </div>

        {/* Info */}
        <div className="pt-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-manrope text-[10px] tracking-[0.18em] uppercase text-stone-400 mb-1">
                {product.category}
              </p>
              <h3 className="font-manrope text-[13px] font-medium text-stone-800 leading-snug">
                {product.name}
              </h3>
              <p
                className="font-manrope text-[12px] text-stone-400 mt-1 leading-relaxed"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {product.description}
              </p>
            </div>
          </div>
          <p className="font-manrope text-[13px] font-semibold text-stone-800 mt-2">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}
