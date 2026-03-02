"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import allProducts from "@/data/products.json";
import Spinner from "./components/Spinner";
import FilterSidebar from "./components/FilterSidebar";
import ProductCard from "./components/ProductCard";

gsap.registerPlugin(ScrollTrigger);

// ── FILTER CONFIG ────────────────────────────────────────────
const categories = ["All", "Women's", "Men's", "Accessories"];
const TAGS = [
  "new",
  "bestseller",
  "featured",
  "tops",
  "bottoms",
  "outerwear",
  "accessories",
];
const SORT_OPTIONS = [
  { label: "Newest", value: "new" },
  { label: "Price: Low", value: "price-asc" },
  { label: "Price: High", value: "price-desc" },
  { label: "Name A–Z", value: "name-asc" },
];
const PRICE_RANGES = [
  { label: "Under $300", min: 0, max: 300 },
  { label: "$300 – $600", min: 300, max: 600 },
  { label: "$600 – $1000", min: 600, max: 1000 },
  { label: "Over $1000", min: 1000, max: Infinity },
];

// ── PAGE ─────────────────────────────────────────────────────
export default function CollectionsPage() {
  // Add this inside CollectionsPage(), before the useState:
  const params = useParams();

  const SLUG_TO_CATEGORY = {
    women: "Women's",
    men: "Men's",
    accessories: "Accessories",
    new: "All", // handle via tag instead
  };

  // Change your filters useState to:
  const [filters, setFilters] = useState({
    category: SLUG_TO_CATEGORY[params?.slug] || "All",
    priceRange: null,
    tags: params?.slug === "new" ? ["new"] : [],
    sort: "new",
  });

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const headerRef = useRef(null);

  // Simulate fetch with interval
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let result = [...allProducts];

      if (filters.category !== "All") {
        result = result.filter((p) => p.category === filters.category);
      }
      if (filters.priceRange) {
        result = result.filter(
          (p) =>
            p.price >= filters.priceRange.min &&
            p.price < filters.priceRange.max
        );
      }
      if (filters.tags.length > 0) {
        result = result.filter((p) =>
          filters.tags.every((t) => p.tags.includes(t))
        );
      }

      // Sort
      if (filters.sort === "price-asc")
        result.sort((a, b) => a.price - b.price);
      else if (filters.sort === "price-desc")
        result.sort((a, b) => b.price - a.price);
      else if (filters.sort === "name-asc")
        result.sort((a, b) => a.name.localeCompare(b.name));

      setProducts(result);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [filters]);

  // Header entrance
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* ── PAGE HEADER ── */}
      <div
        ref={headerRef}
        className="px-8 md:px-10 py-10 border-b border-stone-100"
      >
        <p className="font-manrope text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-2">
          SS 2025
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h1
            className="text-[clamp(32px,4vw,52px)] font-semibold text-stone-800 leading-tight tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif",
            }}
          >
            All Collections
          </h1>
          <p className="font-manrope text-[12px] text-stone-400">
            {loading ? "—" : `${products.length} pieces`}
          </p>
        </div>
      </div>

      {/* ── TOOLBAR ── */}
      <div className="px-8 md:px-10 py-4 border-b border-stone-100 flex items-center justify-between gap-4">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="md:hidden flex items-center gap-2 font-manrope text-[12px] tracking-[0.04em] uppercase text-stone-600 font-medium hover:text-stone-900 transition-colors"
        >
          <SlidersHorizontal size={13} strokeWidth={1.5} />
          Filter
        </button>

        {/* Active filter pills */}
        <div className="hidden md:flex items-center gap-2 flex-wrap flex-1">
          {filters.category !== "All" && (
            <span className="font-semibold text-[11px] uppercase bg-stone-50 text-stone-600 px-2.5 py-1 flex items-center gap-1.5">
              {filters.category}
              <button
                onClick={() => setFilters((p) => ({ ...p, category: "All" }))}
              >
                <X size={10} />
              </button>
            </span>
          )}
          {filters.tags.map((tag) => (
            <span
              key={tag}
              className="font-semibold text-[11px] uppercase bg-stone-100 text-stone-600 px-2.5 py-1 flex items-center gap-1.5"
            >
              {tag}
              <button
                onClick={() =>
                  setFilters((p) => ({
                    ...p,
                    tags: p.tags.filter((t) => t !== tag),
                  }))
                }
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>

        {/* Sort */}
        <div className="ml-auto flex items-center gap-2">
          <span className="font-manrope text-[13px] text-stone-400 hidden sm:block">
            Sort:
          </span>
          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters((p) => ({ ...p, sort: e.target.value }))
            }
            className="font-manrope text-[12px] text-stone-700 border border-stone-200 px-3 py-1.5 bg-white outline-none hover:border-stone-400 transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── BODY: sidebar + grid ── */}
      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden md:block w-[320px] shrink-0 border-r border-stone-100 px-8 py-8 sticky top-[72px] self-start h-[calc(100vh-72px)] overflow-y-auto">
          <FilterSidebar
            filters={filters}
            PRICE_RANGES={PRICE_RANGES}
            categories={categories}
            TAGS={TAGS}
            setFilters={setFilters}
            isMobile={false}
          />
        </div>

        {/* Products area */}
        <div className="flex-1 px-2 md:px-10 py-8">
          {loading ? (
            <Spinner />
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <p className="font-manrope text-[13px] text-stone-400">
                No pieces match your filters.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    category: "All",
                    priceRange: null,
                    tags: [],
                    sort: "new",
                  })
                }
                className="font-manrope text-[11px] tracking-[0.16em] uppercase text-stone-600 border-b border-stone-300 pb-0.5 hover:text-stone-900 hover:border-stone-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            /* Grid on mobile (min 2 cols), flex wrap on desktop */
            <div className="grid grid-cols-2  sm:grid-cols-2 md:flex md:flex-row md:flex-wrap gap-y-6 gap-1 md:gap-5">
              {products.map((product, i) => (
                <div
                  key={product.id}
                  className="md:w-[calc(33.33%-14px)] lg:w-[calc(25%-15px)]"
                >
                  <ProductCard product={product} index={i} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE FILTER DRAWER ── */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[200] flex">
          <div
            className="flex-1 bg-stone-900/30"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="w-[80vw] max-w-[320px] bg-white h-full overflow-y-auto shadow-none">
            <FilterSidebar
              categories={categories}
              filters={filters}
              PRICE_RANGES={PRICE_RANGES}
              TAGS={TAGS}
              setFilters={setFilters}
              onClose={() => setMobileFilterOpen(false)}
              isMobile={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
