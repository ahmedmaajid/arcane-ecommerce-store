"use client";

import Link from "next/link";

const LINKS = {
  Shop: ["New Arrivals", "Women", "Men", "Accessories", "Sale"],
  Collections: [
    "Spring / Summer 2025",
    "Fall / Winter 2024",
    "Archival",
    "Collaborations",
  ],
  Company: ["Our Story", "Atelier", "Sustainability", "Careers", "Press"],
  Support: [
    "Shipping & Returns",
    "Size Guide",
    "Care Instructions",
    "Contact Us",
    "FAQ",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white/50 border-t border-white/90 w-full">
      {/* Main footer grid */}
      <div className="px-8 md:px-14 pt-14 pb-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-0 justify-between">
          {/* Brand column */}
          <div className="md:w-[220px] shrink-0">
            <p
              className="text-[18px] font-bold tracking-[0.28em] uppercase text-stone-800 mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
              }}
            >
              Arcane
            </p>
            <p className=" text-[12px] text-stone-400 font-regular leading-relaxed tracking-wide max-w-[180px]">
              Quiet luxury. Crafted without compromise. Est. 2019.
            </p>

            {/* Socials */}
            <div className="flex gap-4 mt-6">
              {["Instagram", "Pinterest", "X"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className=" text-[10px] tracking-[0.14em] uppercase text-stone-400 hover:text-stone-800 transition-colors duration-200"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14 flex-1 md:justify-end">
            {Object.entries(LINKS).map(([heading, links]) => (
              <div key={heading}>
                <p className="text-[11px] tracking-[0.12em] uppercase text-stone-800 font-medium mb-4">
                  {heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className=" text-[12px] text-stone-600 font-medium hover:text-stone-800 transition-colors duration-200"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter strip */}
      <div className="mx-8 md:mx-14 border-t border-stone-100 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className=" text-[10px] tracking-[0.22em] uppercase text-stone-500 font-medium mb-1">
            Newsletter
          </p>
          <p className=" text-[11px] text-stone-400 font-regular">
            Quiet updates. No noise.
          </p>
        </div>
        <div className="flex gap-0 max-w-[340px] w-full sm:w-auto">
          <input
            type="email"
            placeholder="Your email"
            className=" flex-1 border border-stone-200 border-r-0 px-4 py-2.5 text-[11px] text-stone-700 placeholder:text-stone-300 outline-none focus:border-stone-400 transition-colors bg-white tracking-wide"
          />
          <button className=" bg-stone-900 text-white text-[10px] tracking-[0.18em] uppercase px-5 py-2.5 hover:bg-stone-700 transition-colors duration-200 shrink-0">
            Join
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-8 md:mx-14 border-t border-stone-100 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className=" text-[10px] text-stone-300 font-regular tracking-wide">
          © 2025 Arcane. All rights reserved.
        </p>
        <div className="flex gap-5">
          {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-[12px] text-stone-500 hover:text-stone-600 transition-colors duration-200 tracking-wide"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
