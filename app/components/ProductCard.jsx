"use client";
import { useState } from "react";
import Link from "next/link";

const SpreadsheetPlaceholder = () => (
  <div className="w-full h-full bg-[#EDEAE3] flex flex-col items-center justify-center gap-3 select-none">
    <svg className="w-8 h-8 text-[#A09B93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M3 14h18M10 3v18M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6z" />
    </svg>
    <p className="font-body text-[#706D66] text-xs font-medium">Excel / Google Sheets</p>
  </div>
);

export default function ProductCard({ product }) {
  const [current, setCurrent] = useState(0);
  const hasImages = product.images.length > 0;
  const total = product.images.length;

  const prev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c - 1 + total) % total);
  };
  const next = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c + 1) % total);
  };

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <div className="border border-[#E0DDD5] hover:border-[#B8862A]/35 bg-white transition-all duration-300 flex flex-col h-full">
        {/* Image */}
        <div className="relative overflow-hidden bg-[#EDEAE3]" style={{ height: "210px" }}>
          {hasImages ? (
            <>
              <img
                src={product.images[current]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {total > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#F7F5F0]/92 border border-[#E0DDD5] flex items-center justify-center text-[#1A1A12] opacity-0 group-hover:opacity-100 transition-all duration-200"
                    aria-label="Previous image"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#F7F5F0]/92 border border-[#E0DDD5] flex items-center justify-center text-[#1A1A12] opacity-0 group-hover:opacity-100 transition-all duration-200"
                    aria-label="Next image"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {product.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrent(i); }}
                        className={`h-px transition-all duration-200 ${i === current ? "w-6 bg-[#B8862A]" : "w-2 bg-[#E0DDD5]"}`}
                        aria-label={`Image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <SpreadsheetPlaceholder />
          )}

          {product.badge && (
            <div className={`absolute top-3 left-3 font-body px-2 py-0.5 text-[10px] font-medium tracking-[0.1em] uppercase ${
              product.badgeColor === "green"
                ? "bg-[#0F0F0E] text-[#EDE9E3]"
                : "bg-[#B8862A] text-white"
            }`}>
              {product.badge}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1 gap-3 border-t border-[#E0DDD5]">
          <div className="font-body text-[10px] font-medium uppercase tracking-[0.16em] text-[#A09B93]">
            {product.type === "download" ? "Digital Download" : "Custom Service"}
          </div>
          <h3 className="font-body text-[#1A1A12] font-medium text-sm leading-snug">
            {product.name}
          </h3>
          <p className="font-body text-[#706D66] text-xs leading-relaxed flex-1">
            {product.shortDesc}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-[#EDEAE3]">
            <span className="font-body text-[#1A1A12] font-semibold text-base">
              ₦{product.price.toLocaleString()}
            </span>
            <span className="font-body text-[#A09B93] text-xs font-medium flex items-center gap-1 group-hover:text-[#1A1A12] transition-colors duration-200">
              Details
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
