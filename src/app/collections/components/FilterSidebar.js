"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export default function FilterSidebar({
  categories,
  PRICE_RANGES,
  TAGS,
  filters,
  setFilters,
  onClose,
  isMobile,
}) {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    tags: true,
  });

  const toggle = (key) => setOpenSections((p) => ({ ...p, [key]: !p[key] }));

  const Section = ({ id, label, children }) => (
    <div className="py-5 border-b border-stone-200">
      <button
        className="w-full flex items-center justify-between mb-4"
        onClick={() => toggle(id)}
      >
        <span className="font-manrope text-[13px] uppercase text-stone-700 font-semibold tracking-wider">
          {label}
        </span>
        {openSections[id] ? (
          <ChevronUp size={14} strokeWidth={1.5} className="text-stone-500" />
        ) : (
          <ChevronDown size={14} strokeWidth={1.5} className="text-stone-500" />
        )}
      </button>
      {openSections[id] && children}
    </div>
  );

  return (
    <aside className={`bg-white ${isMobile ? "p-6" : "pr-8 pt-2"} min-w-0`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-stone-200 mb-1">
        <p className="font-manrope text-[13px] tracking-[0.05em] uppercase text-stone-900 font-bold">
          Filter
        </p>
        {isMobile && (
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Category */}
      <Section id="category" label="Category">
        <div className="flex flex-col gap-1">
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters((p) => ({ ...p, category: cat }))}
              className={`text-left font-manrope text-[13px] py-1.5 transition-colors duration-150 flex items-center justify-between group ${
                filters.category === cat
                  ? "text-stone-900 font-semibold"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && (
                <span className="w-1.5 h-1.5 bg-stone-900 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </Section>

      {/* Price */}
      <Section id="price" label="Price">
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setFilters((p) => ({ ...p, priceRange: null }))}
            className={`text-left font-manrope text-[13px] py-1.5 transition-colors duration-150 flex items-center justify-between ${
              !filters.priceRange
                ? "text-stone-900 font-semibold"
                : "text-stone-500 hover:text-stone-900"
            }`}
          >
            <span>All Prices</span>
            {!filters.priceRange && (
              <span className="w-1.5 h-1.5 bg-stone-900 rounded-full" />
            )}
          </button>
          {PRICE_RANGES?.map((r) => (
            <button
              key={r.label}
              onClick={() => setFilters((p) => ({ ...p, priceRange: r }))}
              className={`text-left font-manrope text-[13px] py-1.5 transition-colors duration-150 flex items-center justify-between ${
                filters.priceRange?.label === r.label
                  ? "text-stone-900 font-semibold"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              <span>{r.label}</span>
              {filters.priceRange?.label === r.label && (
                <span className="w-1.5 h-1.5 bg-stone-900 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </Section>

      {/* Tags */}
      <Section id="tags" label="Tags">
        <div className="flex flex-wrap gap-1">
          {TAGS?.map((tag) => {
            const active = filters.tags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() =>
                  setFilters((p) => ({
                    ...p,
                    tags: active
                      ? p.tags.filter((t) => t !== tag)
                      : [...p.tags, tag],
                  }))
                }
                className={`font-manrope tracking-wide text-[11px] font-bold uppercase px-3 py-1.5 rounded-full border transition-all duration-150 ${
                  active
                    ? "bg-stone-900 text-white border-stone-900"
                    : "bg-white text-stone-600 border-stone-300 hover:border-stone-700 hover:text-stone-900"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Clear all */}
      {(filters.category !== "All" ||
        filters.priceRange ||
        filters.tags.length > 0) && (
        <button
          onClick={() =>
            setFilters({
              category: "All",
              priceRange: null,
              tags: [],
              sort: filters.sort,
            })
          }
          className="mt-6 w-full font-manrope text-[12px] tracking-[0.06em] uppercase text-stone-600 hover:text-stone-900 font-bold border border-stone-300 hover:border-stone-700 py-2.5 transition-all duration-200 rounded-full"
        >
          Clear All Filters
        </button>
      )}
    </aside>
  );
}
