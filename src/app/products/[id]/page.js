"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronLeft,
  Phone,
  MapPin,
  Plus,
  ShieldCheck,
  RefreshCw,
  Package,
} from "lucide-react";
import allProducts from "@/data/products.json";

gsap.registerPlugin(ScrollTrigger);

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

// Generate placeholder sub-images using canvas-style data URIs with labels
function PlaceholderImage({ label, bg = "#e8e5e0" }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: bg }}
    >
      <span className="font-manrope text-[11px] tracking-[0.14em] uppercase text-stone-400 font-medium select-none">
        {label}
      </span>
    </div>
  );
}

const SUB_LABELS = ["Front", "Back", "Detail", "Side"];
const SUB_BG = ["#ede9e4", "#e5e1db", "#ece8e3", "#e9e5e0"];

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const product = allProducts.find((p) => String(p.id) === String(id));

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [expandedSection, setExpandedSection] = useState("details");

  const mainImgRef = useRef(null);
  const infoRef = useRef(null);
  const pageRef = useRef(null);

  // Page entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 24 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 0.2 }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // Image swap animation
  const handleImgChange = (idx) => {
    if (idx === activeImg) return;
    gsap.to(mainImgRef.current, {
      opacity: 0,
      scale: 1.03,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setActiveImg(idx);
        gsap.fromTo(
          mainImgRef.current,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
        );
      },
    });
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      gsap.fromTo(
        ".size-section",
        { x: -6 },
        { x: 0, duration: 0.4, ease: "elastic.out(1,0.3)" }
      );
      return;
    }
    setSizeError(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const toggleSection = (key) =>
    setExpandedSection((prev) => (prev === key ? null : key));

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-[72px]">
        <div className="text-center">
          <p className="font-manrope text-[13px] text-stone-500 mb-4">
            Product not found.
          </p>
          <Link
            href="/collections"
            className="font-manrope text-[12px] tracking-[0.16em] uppercase text-stone-800 border-b border-stone-400 pb-0.5"
          >
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const accordionSections = [
    {
      key: "details",
      label: "Product Details",
      content:
        product.description +
        " Each piece is constructed to exacting standards using ethically sourced materials. Designed to be worn for decades, not seasons.",
    },
    {
      key: "care",
      label: "Care & Composition",
      content:
        "Dry clean recommended. Store folded, away from direct sunlight. This piece is made from natural fibres that improve in character with careful wear.",
    },
    {
      key: "delivery",
      label: "Delivery & Returns",
      content:
        "Complimentary standard delivery on all orders. Express available at checkout. Returns accepted within 30 days in original condition with packaging intact.",
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-white pt-[92px]">
      {/* ── BREADCRUMB ── */}
      <div className="px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 transition-colors duration-200"
        >
          <ChevronLeft size={14} strokeWidth={1.5} />
          <span className="font-manrope text-[12px] tracking-[0.08em]">
            Collections
          </span>
        </button>
        <span className="text-stone-300 text-[12px]">/</span>
        <span className="font-manrope text-[12px] text-stone-400">
          {product.category}
        </span>
        <span className="text-stone-300 text-[12px]">/</span>
        <span className="font-manrope text-[12px] text-stone-700 font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="flex flex-col lg:flex-row gap-0">
        {/* LEFT — Image gallery */}
        <div className="lg:w-[58%] px-2 flex flex-col sm:flex-row gap-0">
          {/* Thumbnail strip */}
          <div className="flex flex-row sm:flex-col gap-1.5  sm:pt-0 pt-2 sm:pr-2 order-2 sm:order-1">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                onClick={() => handleImgChange(idx)}
                className={`relative shrink-0 border transition-all duration-200 ${
                  activeImg === idx
                    ? "border-stone-700"
                    : "border-stone-200 hover:border-stone-400"
                }`}
                style={{ width: 64, height: 80 }}
              >
                {idx === 0 ? (
                  <Image
                    src={product.img}
                    fill
                    alt={`View ${idx + 1}`}
                    className="object-cover object-top"
                  />
                ) : (
                  <PlaceholderImage label={SUB_LABELS[idx]} bg={SUB_BG[idx]} />
                )}
              </button>
            ))}
          </div>

          {/* Main image */}
          <div
            className="flex-1 relative  order-1 sm:order-2 bg-stone-50"
            style={{ minHeight: "520px", maxHeight: "780px" }}
          >
            <div ref={mainImgRef} className="absolute inset-0">
              {activeImg === 0 ? (
                <Image
                  src={product.img}
                  fill
                  alt={product.name}
                  className="object-cover object-top"
                  priority
                />
              ) : (
                <PlaceholderImage
                  label={`${product.name} — ${SUB_LABELS[activeImg]}`}
                  bg={SUB_BG[activeImg]}
                />
              )}
            </div>

            {/* Tag badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.tags.includes("new") && (
                <span className="font-manrope text-[10px] tracking-[0.18em] uppercase bg-stone-900 text-white px-2.5 py-1 font-medium">
                  New
                </span>
              )}
              {product.tags.includes("bestseller") && (
                <span className="font-manrope text-[10px] tracking-[0.18em] uppercase bg-white border border-stone-200 text-stone-700 px-2.5 py-1 font-medium">
                  Bestseller
                </span>
              )}
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 right-4 z-10">
              <span className="font-manrope text-[11px] text-stone-400 bg-white/80 px-2 py-1 backdrop-blur-sm">
                {activeImg + 1} / 4
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — Product info */}
        <div
          ref={infoRef}
          className="lg:w-[42%] px-6 md:px-10 lg:px-12 py-8 lg:py-12 flex flex-col gap-6 lg:sticky lg:top-[72px] lg:self-start lg:max-h-[calc(100vh-72px)] lg:overflow-y-auto"
        >
          {/* Category + brand */}
          <div>
            <p className="font-manrope text-[11px] tracking-[0.14em] uppercase text-stone-400 font-medium mb-2">
              {product.brand} — {product.category}
            </p>

            {/* Product name */}
            <h1
              className="text-[clamp(22px,2.8vw,30px)] font-manrope font-medium text-stone-700 leading-tight tracking-tight mb-3"
              style={
                {
                  // fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
                }
              }
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-manrope text-[22px] font-semibold text-stone-900">
                ${product.price.toLocaleString()}
              </span>
              <span className="font-manrope text-[12px] text-stone-400">
                USD · Tax included
              </span>
            </div>
          </div>

          {/* Hairline */}
          <div className="h-[1px] bg-stone-100" />

          {/* Size selector */}
          <div className="size-section">
            <div className="flex items-center justify-between mb-3">
              <p className="font-manrope text-[12px] tracking-[0.06em] uppercase text-stone-700 font-semibold">
                Select Size
              </p>
              <button className="font-manrope text-[12px] text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-2">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className={`font-manrope text-[12px] font-medium w-10 h-8 border transition-all duration-150 ${
                    selectedSize === size
                      ? "bg-stone-900 text-white border-stone-900"
                      : "bg-white text-stone-700 border-stone-300 hover:border-stone-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="font-manrope text-[12px] text-red-500 mt-2 font-medium">
                Please select a size to continue.
              </p>
            )}
          </div>

          {/* Add to bag */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToBag}
              className={`w-full font-manrope text-[12px] tracking-[0.08em] uppercase font-semibold py-4 transition-all duration-300 ${
                added
                  ? "bg-stone-600 text-white"
                  : "bg-stone-900 text-white hover:bg-stone-700"
              }`}
            >
              {added ? "Added to Bag ✓" : "Add to Bag"}
            </button>
            <button className="w-full font-manrope text-[12px] tracking-[0.08em] uppercase font-semibold py-4 border border-stone-300 text-stone-700 hover:border-stone-800 hover:text-stone-900 transition-all duration-200 bg-white">
              Save to Wishlist
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-stone-100">
            {[
              {
                icon: <ShieldCheck size={16} strokeWidth={1.5} />,
                label: "Secure Payment",
              },
              {
                icon: <RefreshCw size={16} strokeWidth={1.5} />,
                label: "Free Returns",
              },
              {
                icon: <Package size={16} strokeWidth={1.5} />,
                label: "Gift Packaging",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1.5 text-center"
              >
                <span className="text-stone-500">{item.icon}</span>
                <span className="font-manrope text-[11px] text-stone-500 font-medium leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Accordion */}
          <div className="flex flex-col">
            {accordionSections.map((section) => (
              <div key={section.key} className="border-b border-stone-100">
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full flex items-center justify-between py-4"
                >
                  <span className="font-manrope text-[12px] tracking-[0.02em] uppercase text-stone-800 font-semibold">
                    {section.label}
                  </span>
                  <Plus
                    size={14}
                    strokeWidth={1.5}
                    className={`text-stone-500  transition-transform duration-200 ${
                      expandedSection === section.key ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {expandedSection === section.key && (
                  <p className="font-manrope text-[13px] text-stone-600 leading-relaxed pb-4 font-medium">
                    {section.content}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Gucci-style service links */}
          <div className="flex flex-col gap-3 pt-2">
            <a href="tel:" className="flex items-center gap-3 group">
              <Phone
                size={14}
                strokeWidth={1.5}
                className="text-stone-400 shrink-0"
              />
              <span className="font-manrope text-[13px] text-stone-700 font-medium underline underline-offset-2 group-hover:text-stone-900 transition-colors">
                Order by Phone
              </span>
            </a>
            <a href="#" className="flex items-center gap-3 group">
              <MapPin
                size={14}
                strokeWidth={1.5}
                className="text-stone-400 shrink-0"
              />
              <span className="font-manrope text-[13px] text-stone-700 font-medium underline underline-offset-2 group-hover:text-stone-900 transition-colors">
                Find in Store & Book an Appointment
              </span>
            </a>
            <div className="mt-1 pt-3 border-t border-stone-100">
              <p className="font-manrope text-[12px] text-stone-400 leading-relaxed">
                Complimentary Shipping · Complimentary Exchanges & Returns ·
                Secure Payments · Signature Packaging
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── YOU MAY ALSO LIKE ── */}
      <div className="px-6 mt-6 md:px-14 py-12">
        <p className="font-manrope text-[11px] tracking-[0.08em] uppercase text-stone-400 font-semibold mb-0">
          Continue Browsing
        </p>
        <h2
          className="text-[clamp(24px,2.5vw,32px)] font-semibold text-stone-800  leading-tight tracking-tighter mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
          }}
        >
          You may also like.
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {allProducts
            .filter(
              (p) => p.id !== product.id && p.category === product.category
            )
            .slice(0, 4)
            .map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group shrink-0 w-[200px] sm:w-[220px]"
              >
                <div
                  className="relative w-full bg-stone-50 border border-stone-100 overflow-hidden mb-3"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image
                    src={p.img}
                    fill
                    alt={p.name}
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="font-manrope text-[12px] font-semibold text-stone-800 leading-snug">
                  {p.name}
                </p>
                <p className="font-manrope text-[12px] text-stone-500 mt-1 font-medium">
                  ${p.price.toLocaleString()}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
