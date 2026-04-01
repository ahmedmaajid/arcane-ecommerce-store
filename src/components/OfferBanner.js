"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const OfferBanner = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const update = () =>
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4 md:p-6">
      {dimensions.width > 0 && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={180}
          recycle={false}
        />
      )}

      <div className="w-full max-w-3xl bg-white rounded-sm overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row md:min-h-[360px]">
          {/* Image — top on mobile only */}
          <div className="block md:hidden w-full h-52 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
              alt="Arcane SS25 editorial"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-3 right-3 bg-white/90 px-3 py-1.5">
              <p className="font-serif text-sm font-normal text-neutral-900 tracking-widest">
                SS'25
              </p>
            </div>
          </div>

          {/* Left — Text */}
          <div className="flex-1 flex flex-col justify-between gap-6 md:gap-0 p-7 md:p-12 md:border-r border-neutral-200">
            <div>
              <p className="font-sans text-[10px] tracking-[0.05em] uppercase text-neutral-400 mb-5">
                Limited Occasion
              </p>

              <h2 className="text-manrope text-3xl md:text-4xl font-normal text-neutral-900 leading-tight tracking-tight mb-4">
                The Season's
                <br />
                Final Edit
              </h2>

              <div className="w-8 h-px bg-[#c8a96e] my-5" />

              <p className="font-manrope text-[14px] text-neutral-600 leading-relaxed tracking-tight">
                An exclusive offering for the discerning few. Up to{" "}
                <span className="text-neutral-900 font-medium">50% off</span>{" "}
                select pieces from our Spring / Summer 2025 collection — quietly
                refined, never repeated.
              </p>
            </div>

            <div>
              <p className="font-sans text-[11px] text-neutral-500 tracking-[0.15em] mt-5 uppercase mb-4">
                Offer ends April 30, 2025
              </p>

              <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:items-center">
                <Link
                  href="/collections"
                  className="bg-neutral-900 text-white text-[11px] tracking-[0.07em] uppercase font-normal px-7 py-2.5  hover:bg-neutral-700 transition-colors duration-300 text-center"
                >
                  Shop Now
                </Link>
                <Link
                  href="/#"
                  className="font-sans text-[11px] tracking-[0.07em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors duration-300 text-center md:text-left border-b border-neutral-300 pb-px md:border-b md:border-neutral-300 self-center md:self-auto"
                >
                  View Lookbook
                </Link>
              </div>
            </div>
          </div>

          {/* Right — Image desktop only */}
          <div className="hidden md:block flex-1 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
              alt="Arcane SS25 editorial"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-2">
              <p className="font-serif text-base font-normal text-neutral-900 tracking-widest">
                SS'25
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="border-t border-neutral-200 px-7 md:px-12 py-4 flex items-center justify-between gap-3">
          <p className="font-manrope text-sm font-normal tracking-[0.05em] uppercase text-neutral-900">
            Arcane
          </p>

          <p className="hidden md:block font-sans text-[10px] text-neutral-800 tracking-[0.05em] uppercase">
            Free shipping on orders above $200
          </p>

          <button
            onClick={() => setVisible(false)}
            className="text-neutral-400 hover:text-neutral-900 transition-colors duration-200 text-2xl leading-none font-normal"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
