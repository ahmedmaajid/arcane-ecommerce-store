"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingBag, User, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock cart items — replace with your real cart state/context
const CART_ITEMS = [
  {
    id: 1,
    name: "The Meridian Tech-Knit Hoodie",
    category: "Women's",
    price: 420,
    qty: 1,
    img: "/products/Hoodie-1.jpg",
  },
  {
    id: 2,
    name: "The Heritage Monogram Pullover",
    category: "Men's",
    price: 310,
    qty: 2,
    img: "/products/Hoodie-2.png",
  },
  {
    id: 3,
    name: "The Élégance Grand Satchel",
    category: "Accessories",
    price: 145,
    qty: 1,
    img: "/products/bag-1.png",
  },
];

function CartDropdown({ onClose }) {
  const total = CART_ITEMS.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="absolute top-full right-0 mt-3 w-[300px] bg-white border border-stone-200 z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
        <p className="text-[12px] font-medium text-stone-800">
          Your Bag ({CART_ITEMS.length})
        </p>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-700 transition-colors"
        >
          <X size={13} strokeWidth={1.5} />
        </button>
      </div>

      {/* Items list */}
      <div className="flex flex-col divide-y divide-stone-100 max-h-[260px] overflow-y-auto">
        {CART_ITEMS.map((item) => (
          <div key={item.id} className="flex gap-3 px-4 py-3">
            {/* Thumbnail */}
            <div className="relative w-12 h-12 bg-gray-200 shrink-0 overflow-hidden">
              <Image
                src={item.img}
                fill
                alt={item.name}
                className="object-contain object-top"
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-stone-800 leading-snug truncate">
                {item.name}
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {item.category} · Qty {item.qty}
              </p>
              <p className="text-[13px] text-stone-700 font-medium mt-1">
                ${(item.price * item.qty).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 pt-3 pb-4 border-t border-stone-100">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[12px] font-medium text-stone-400">Subtotal</p>
          <p className="text-[13px] font-semibold text-stone-800">
            ${total.toLocaleString()}
          </p>
        </div>
        <Link
          href="/cart"
          onClick={onClose}
          className="block w-full bg-stone-900 text-white text-[13px] font-medium text-center py-3 hover:bg-stone-700 transition-colors duration-200"
        >
          View Bag
        </Link>
        <button
          onClick={onClose}
          className="block w-full text-center text-[11px] text-stone-500 hover:text-stone-600 transition-colors mt-2"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    };
    if (cartOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [cartOpen]);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${
            scrolled
              ? "bg-white/85 backdrop-blur-md border-b border-stone-200/80 py-3"
              : "bg-white py-5"
          }
        `}
      >
        <nav className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          {/* LEFT — Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="group flex flex-col gap-[5px] cursor-pointer p-1 -ml-1"
            aria-label="Open menu"
          >
            <span className="block w-5 h-[2px] bg-stone-800 transition-all duration-300 group-hover:w-9" />
            <span className="block w-7 h-[2px] bg-stone-800 transition-all duration-300 group-hover:w-9" />
            <span className="block w-9 h-[2px] bg-stone-800 transition-all duration-300" />
          </button>

          {/* CENTER — Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 tracking-widest text-[16px] font-semibold text-stone-800 uppercase hover:opacity-60 transition-opacity duration-300"
            style={{
              fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
            }}
          >
            Arcane
          </Link>

          {/* RIGHT — Account + Cart */}
          <div className="flex items-center gap-1 sm:gap-3">
            <button
              aria-label="Account"
              className="p-1.5 text-stone-600 flex items-center gap-1 hover:text-stone-900 transition-colors duration-200"
            >
              <User size={16} strokeWidth={1.5} />
              <span className="hidden sm:inline text-[13px]">Account</span>
            </button>

            {/* Cart wrapper */}
            <div ref={cartRef} className="relative">
              <button
                aria-label="Cart"
                onClick={() => setCartOpen((p) => !p)}
                className="relative p-1.5 flex items-center gap-1 text-stone-600 hover:text-stone-900 transition-colors duration-200"
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                <span className="hidden sm:inline text-[13px]">Cart</span>
                <span className="absolute -top-1 -right-1 sm:static sm:ml-0.5 w-[15px] h-[15px] rounded-full bg-stone-800 text-white text-[9px] flex items-center justify-center font-bold">
                  {CART_ITEMS.length}
                </span>
              </button>

              {cartOpen && <CartDropdown onClose={() => setCartOpen(false)} />}
            </div>
          </div>
        </nav>
      </header>

      {/* FULLSCREEN MENU OVERLAY */}
      <div
        className={`
          fixed inset-0 z-[100] bg-stone-50 flex flex-col
          transition-all duration-700 ease-in-out
          ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-6 w-full pt-5 flex justify-between items-center">
          <span
            className="tracking-widest text-[16px] font-bold text-stone-800 uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
            }}
          >
            Arcane
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-12 md:px-24 gap-3">
          {[
            ["New Arrivals", "/collections/new"],
            ["Collections", "/collections"],
            ["Women", "/collections/women"],
            ["Men", "/collections/men"],
            ["About", "/#"],
            ["Stores", "/#"],
          ].map(([label, href], i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-baseline gap-4 py-2 border-b border-stone-200/60 hover:border-stone-400 transition-colors duration-300"
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              <span className="text-[10px] text-stone-400 w-6 font-light tracking-widest">
                0{i + 1}
              </span>
              <span
                className="text-3xl md:text-5xl text-stone-800 tracking-tight group-hover:translate-x-2 transition-transform duration-300 inline-block"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', 'Garamond', Georgia, serif",
                }}
              >
                {label}
              </span>
            </Link>
          ))}
        </div>

        <div className="px-12 md:px-24 pb-10 flex gap-8">
          {["Instagram", "Pinterest", "Newsletter"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-[10px] tracking-[0.14em] uppercase text-stone-400 hover:text-stone-700 transition-colors"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
