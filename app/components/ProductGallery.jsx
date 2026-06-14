"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

const NoImageFallback = () => (
  <div
    className="w-full bg-[#111111] flex flex-col items-center justify-center gap-4 select-none"
    style={{ aspectRatio: "4/3" }}
  >
    <svg className="w-12 h-12 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M3 14h18M10 3v18M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6z" />
    </svg>
    <div className="text-center px-6">
      <p className="font-body text-white/40 font-medium text-sm">Excel / Google Sheets</p>
      <p className="font-body text-white/20 text-xs mt-1">Automated spreadsheet template</p>
    </div>
    <div className="flex flex-wrap gap-2 justify-center px-6">
      {["Sales Tracker", "Reports", "Charts", "Inventory", "P&L"].map((tag) => (
        <span key={tag} className="font-body border border-white/10 text-white/20 text-[10px] px-2.5 py-1 font-medium">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default function ProductGallery({ images, name, badge, badgeColor }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const total = images.length;

  const prev = useCallback(() => {
    if (total > 1) setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    if (total > 1) setCurrent((c) => (c + 1) % total);
  }, [total]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
      dx > 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!images || total === 0) return <NoImageFallback />;

  return (
    <div className="space-y-2">
      {/* Sliding image container */}
      <div
        className="relative overflow-hidden bg-[#111111] select-none"
        style={{ aspectRatio: "4/3" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Sliding track */}
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{
            width: `${total * 100}%`,
            transform: `translateX(-${(current / total) * 100}%)`,
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / total}%` }}
            >
              <Image
                src={img}
                alt={`${name} — view ${i + 1}`}
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Badge */}
        {badge && (
          <div
            className={`absolute top-3 left-3 z-10 font-body px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase ${
              badgeColor === "amber"
                ? "bg-[#F0B429] text-[#1A1A12]"
                : "bg-[#1A3828] text-white"
            }`}
          >
            {badge}
          </div>
        )}

        {/* Desktop arrow buttons */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 items-center justify-center text-white transition-colors duration-200"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 items-center justify-center text-white transition-colors duration-200"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Mobile dot indicators */}
        {total > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 md:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  i === current ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop thumbnail strip */}
      {total > 1 && (
        <div className="hidden md:flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative flex-shrink-0 bg-[#111111] transition-all duration-200 ${
                i === current
                  ? "ring-1 ring-[#F0B429]"
                  : "opacity-50 hover:opacity-80"
              }`}
              style={{ width: 72, height: 56 }}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                className="object-contain p-1.5"
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
