"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import {
  X,
  ShieldCheck,
  RefreshCw,
  Package,
  Truck,
  Lock,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import allProducts from "@/data/products.json";

// Pull first 4 products as initial cart items
const INITIAL_CART = allProducts.slice(0, 4).map((p) => ({
  ...p,
  qty: 1,
  size: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)],
  cartId: `cart-${p.id}`,
}));

const DELIVERY_FEE = 0; // complimentary
const TRUST_ITEMS = [
  {
    icon: <Lock size={15} strokeWidth={1.5} />,
    label: "Secure Checkout",
    sub: "256-bit SSL encryption",
  },
  {
    icon: <RefreshCw size={15} strokeWidth={1.5} />,
    label: "Free Returns",
    sub: "Within 30 days",
  },
  {
    icon: <Truck size={15} strokeWidth={1.5} />,
    label: "Complimentary Shipping",
    sub: "On all orders",
  },
  {
    icon: <Package size={15} strokeWidth={1.5} />,
    label: "Signature Packaging",
    sub: "Gift-ready by default",
  },
];

function CartItem({ item, onRemove, onQtyChange }) {
  const rowRef = useRef(null);

  const handleRemove = () => {
    gsap.to(rowRef.current, {
      opacity: 0,
      x: -20,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 0,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => onRemove(item.cartId),
    });
  };

  return (
    <div
      ref={rowRef}
      className="flex gap-4 py-6 border-b border-stone-100 overflow-hidden"
    >
      {/* Product image */}
      <Link href={`/products/${item.id}`} className="shrink-0">
        <div
          className="relative bg-stone-50 border border-stone-100 overflow-hidden"
          style={{ width: 88, height: 110 }}
        >
          <Image
            src={item.img}
            fill
            alt={item.name}
            className="object-cover object-top"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-manrope text-[11px] tracking-[0.08em] uppercase text-stone-400 font-medium mb-1">
              {item.brand} · {item.category}
            </p>
            <h3 className="text-[15px] font-manrope text-stone-900 leading-snug font-medium">
              {item.name}
            </h3>
            <p className="font-manrope font-medium text-[13px] text-stone-500 mt-1">
              Size:{" "}
              <span className="font-semibold text-stone-700">{item.size}</span>
            </p>
          </div>

          {/* Remove */}
          <button
            onClick={handleRemove}
            className="shrink-0 p-1 text-stone-300 hover:text-stone-700 transition-colors duration-200 mt-0.5"
            aria-label="Remove item"
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Qty + price row */}
        <div className="flex items-center justify-between mt-3">
          {/* Qty control */}
          <div className="flex items-center border border-stone-200 gap-0">
            <button
              onClick={() =>
                onQtyChange(item.cartId, Math.max(1, item.qty - 1))
              }
              className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
            >
              <Minus size={11} strokeWidth={1.5} />
            </button>
            <span className="font-manrope text-[12px] font-semibold text-stone-800 w-7 text-center">
              {item.qty}
            </span>
            <button
              onClick={() => onQtyChange(item.cartId, item.qty + 1)}
              className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
            >
              <Plus size={11} strokeWidth={1.5} />
            </button>
          </div>

          {/* Price */}
          <p className="font-manrope text-[14px] font-semibold text-stone-900">
            ${(item.price * item.qty).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const pageRef = useRef(null);
  const summaryRef = useRef(null);

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = subtotal + DELIVERY_FEE;

  // Page entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(
        summaryRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.15 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleRemove = (cartId) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const handleQtyChange = (cartId, qty) => {
    setCartItems((prev) =>
      prev.map((i) => (i.cartId === cartId ? { ...i, qty } : i))
    );
  };

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Page header */}
      <div className="px-6 md:px-14 py-8 border-b border-stone-100">
        <p className="font-manrope text-[10px] tracking-[0.08em] uppercase text-stone-400 font-bold mb-1">
          Arcane
        </p>
        <h1
          className="text-[clamp(24px,3.5vw,44px)] font-bold text-stone-900 leading-tight tracking-tight"
          style={{
            fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
          }}
        >
          Your Bag
          {cartItems.length > 0 && (
            <span className="font-manrope text-[16px] font-normal text-stone-400 ml-3">
              ({cartItems.length})
            </span>
          )}
        </h1>
      </div>

      {cartItems.length === 0 ? (
        /* ── EMPTY STATE ── */
        <div className="flex flex-col items-center justify-center py-32 px-6 gap-5">
          <div className="w-16 h-16 border border-stone-200 flex items-center justify-center">
            <Package size={22} strokeWidth={1} className="text-stone-300" />
          </div>
          <div className="text-center">
            <p className="text-[22px] tracking-tight font-medium text-stone-700 mb-2">
              Your bag is empty.
            </p>
            <p className="font-manrope font-semibold text-[13px] text-stone-400">
              Discover pieces made to last.
            </p>
          </div>
          <Link
            href="/collections"
            className="font-manrope text-[12px] tracking-[0.08em] uppercase font-semibold bg-stone-900 text-white px-6 py-2.5 hover:bg-stone-700 transition-colors duration-200 mt-2"
          >
            Shop Collections
          </Link>
        </div>
      ) : (
        /* ── TWO COLUMN LAYOUT ── */
        <div ref={pageRef} className="flex flex-col lg:flex-row">
          {/* LEFT — Cart items */}
          <div className="flex-1 px-6 md:px-14 py-8 lg:border-r border-stone-100">
            {/* Column label */}
            <div className="flex items-center justify-between mb-2 pb-3 border-b border-stone-200">
              <p className="font-manrope text-[12px] tracking-[0.06em] uppercase text-stone-500 font-bold">
                Item
              </p>
              <p className="font-manrope text-[11px] tracking-[0.02em] uppercase text-stone-500 font-bold">
                Total
              </p>
            </div>

            {/* Items list */}
            <div>
              {cartItems.map((item) => (
                <CartItem
                  key={item.cartId}
                  item={item}
                  onRemove={handleRemove}
                  onQtyChange={handleQtyChange}
                />
              ))}
            </div>

            {/* Continue shopping */}
            <div className="mt-6">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 font-manrope text-[12px] tracking-[0.05em] uppercase text-stone-500 hover:text-stone-900 transition-colors duration-200 font-medium"
              >
                <ChevronRight
                  size={13}
                  strokeWidth={1.5}
                  className="rotate-180"
                />
                Continue Shopping
              </Link>
            </div>

            {/* Trust strip — mobile only, appears below items */}
            <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-stone-100 lg:hidden">
              {TRUST_ITEMS.map((t) => (
                <div key={t.label} className="flex items-start gap-3">
                  <span className="text-stone-400 mt-0.5 shrink-0">
                    {t.icon}
                  </span>
                  <div>
                    <p className="font-manrope text-[12px] font-semibold text-stone-700 leading-snug">
                      {t.label}
                    </p>
                    <p className="font-manrope text-[11px] text-stone-400 mt-0.5">
                      {t.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Order summary */}
          <div
            ref={summaryRef}
            className="lg:w-[400px] xl:w-[440px] shrink-0 px-6 md:px-10 lg:px-12 py-8 lg:sticky lg:top-[72px] lg:self-start"
          >
            <p className="font-manrope text-[11px] tracking-[0.08em] uppercase text-stone-500 font-bold mb-6">
              Order Summary
            </p>

            {/* Price breakdown */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="font-manrope font-medium text-[13px] text-stone-600">
                  Subtotal ({cartItems.reduce((s, i) => s + i.qty, 0)} items)
                </span>
                <span className="font-manrope text-[13px] font-semibold text-stone-800">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center font-medium justify-between">
                <span className="font-manrope text-[13px] text-stone-600">
                  Estimated Delivery
                </span>
                <span className="font-manrope text-[13px] font-semibold text-emerald-600">
                  Complimentary
                </span>
              </div>
              <div className="flex items-center font-medium justify-between">
                <span className="font-manrope text-[13px] text-stone-600">
                  Estimated Tax
                </span>
                <span className="font-manrope text-[13px] text-stone-400">
                  Calculated at checkout
                </span>
              </div>
            </div>

            {/* Hairline */}
            <div className="h-[1px] bg-stone-200 mb-5" />

            {/* Total */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-manrope text-[14px] font-semibold text-stone-900 tracking-wide">
                Total
              </span>
              <span className="text-[20px] font-medium text-stone-900">
                ${total.toLocaleString()}
              </span>
            </div>

            {/* Promo code */}
            <div className="mb-6">
              <button
                onClick={() => setPromoOpen((p) => !p)}
                className="flex items-center gap-2 font-manrope text-[12px] text-stone-500 hover:text-stone-800 transition-colors font-medium"
              >
                <Plus
                  size={13}
                  strokeWidth={1.5}
                  className={`transition-transform duration-200 ${
                    promoOpen ? "rotate-45" : ""
                  }`}
                />
                Add Promo Code
              </button>
              {promoOpen && (
                <div className="flex gap-0 mt-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 border border-stone-200 border-r-0 px-3 py-2.5 font-manrope text-[12px] text-stone-700 placeholder:text-stone-300 outline-none focus:border-stone-500 transition-colors"
                  />
                  <button className="bg-stone-900 text-white font-manrope text-[11px] tracking-[0.04em] uppercase font-bold px-4 py-2.5 hover:bg-stone-700 transition-colors shrink-0">
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Checkout button */}
            <button className="w-full bg-stone-900 text-white font-manrope text-[12px] tracking-[0.05em] uppercase font-semibold py-4 hover:bg-stone-700 transition-colors duration-200 mb-3">
              Proceed to Checkout
            </button>

            {/* PayPal / Apple Pay alternative */}
            <button className="w-full border border-stone-200 text-stone-600 font-manrope text-[12px] tracking-[0.05em] uppercase font-semibold py-3.5 hover:border-stone-500 hover:text-stone-900 transition-colors duration-200 mb-6">
              Express Checkout
            </button>

            {/* Secure checkout note */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <ShieldCheck
                size={13}
                strokeWidth={1.5}
                className="text-stone-400"
              />
              <p className="font-manrope text-[11px] text-stone-400">
                256-bit SSL · Payments secured by Stripe
              </p>
            </div>

            {/* Trust items — desktop only */}
            <div className="hidden lg:flex flex-col gap-4 pt-6 border-t border-stone-100">
              {TRUST_ITEMS.map((t) => (
                <div key={t.label} className="flex items-center gap-3">
                  <span className="text-stone-400 shrink-0">{t.icon}</span>
                  <div>
                    <p className="font-manrope text-[12px] font-semibold text-stone-700">
                      {t.label}
                    </p>
                    <p className="font-manrope text-[11px] text-stone-400">
                      {t.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
