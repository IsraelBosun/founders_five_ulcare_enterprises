"use client";
import { useState } from "react";

const WA_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? "text-[#F0B429]" : "text-[#E0DDD5]"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductPurchase({ product }) {
  const [selectedPackage, setSelectedPackage] = useState(0);

  const activePrice = product.packages
    ? product.packages[selectedPackage].price
    : product.price;

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const waLink = product.packages
    ? `https://wa.me/${product.whatsappLink.split("wa.me/")[1].split("?")[0]}?text=${encodeURIComponent(
        `Hi Ulcare! I'd like to order the *${product.name}* — *${product.packages[selectedPackage].name} package* (₦${product.packages[selectedPackage].price.toLocaleString()}). Please let me know how to proceed. 🙏`
      )}`
    : product.whatsappLink;

  return (
    <div className="space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">
        {product.badge && (
          <span className={`font-body text-[10px] font-semibold uppercase tracking-[0.1em] px-3 py-1.5 ${
            product.badgeColor === "amber"
              ? "bg-[#F0B429] text-[#1A1A12]"
              : "bg-[#1A3828] text-white"
          }`}>
            {product.badge}
          </span>
        )}
        <span className="font-body text-[10px] font-medium uppercase tracking-[0.12em] text-[#706D66] border border-[#E0DDD5] px-3 py-1.5">
          {product.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-body font-bold text-[#1A1A12] text-3xl sm:text-4xl leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <StarRating rating={product.rating} />
        <span className="font-body font-semibold text-[#1A1A12] text-sm">{product.rating}</span>
        <span className="font-body text-[#A09B93] text-sm">·</span>
        <span className="font-body text-[#A09B93] text-sm">{product.reviewCount} reviews</span>
      </div>

      {/* Description */}
      <p className="font-body text-[#706D66] text-base leading-[1.7]">
        {product.description}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="font-body font-bold text-[#1A1A12] text-3xl">
          ₦{activePrice.toLocaleString()}
        </span>
        {product.originalPrice && (
          <>
            <span className="font-body text-[#A09B93] text-lg line-through">
              ₦{product.originalPrice.toLocaleString()}
            </span>
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.08em] bg-[#F0B429] text-[#1A1A12] px-2 py-1">
              Save {discount}%
            </span>
          </>
        )}
      </div>

      {/* Delivery note */}
      <p className="font-body text-[#706D66] text-sm flex items-center gap-2">
        <svg className="w-4 h-4 text-[#22C55E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Instant delivery via email after payment
      </p>

      {/* Package selector */}
      {product.packages && (
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1A1A12] mb-3">
            Choose your package
          </p>
          <div className="flex gap-3">
            {product.packages.map((pkg, i) => (
              <button
                key={i}
                onClick={() => setSelectedPackage(i)}
                className={`flex-1 border p-4 text-left transition-all duration-200 ${
                  selectedPackage === i
                    ? "border-[#1A3828] bg-[#1A3828]/4"
                    : "border-[#E0DDD5] hover:border-[#1A3828]/40"
                }`}
              >
                <div className="font-body font-semibold text-[#1A1A12] text-sm mb-1">{pkg.name}</div>
                <div className="font-body text-[#A09B93] text-xs mb-2">{pkg.description}</div>
                <div className="font-body font-bold text-[#1A1A12] text-sm">₦{pkg.price.toLocaleString()}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA buttons */}
      <div className="space-y-3 pt-1">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body flex items-center justify-center gap-2 bg-[#1A3828] text-white font-semibold text-sm px-6 py-4 hover:bg-[#24503A] transition-colors duration-200 w-full"
        >
          Buy now
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body flex items-center justify-center gap-2.5 bg-[#22C55E] text-white font-semibold text-sm px-6 py-4 hover:bg-[#16A34A] transition-colors duration-200 w-full"
        >
          {WA_ICON}
          Ask us anything on WhatsApp
        </a>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-[#E0DDD5]">
        {[
          { icon: "shield", label: "Secure payment" },
          { icon: "download", label: "Instant download" },
          { icon: "refresh", label: "Free revisions" },
        ].map((t) => (
          <div key={t.label} className="flex flex-col items-center gap-1.5">
            <svg className="w-5 h-5 text-[#1A3828]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {t.icon === "shield" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
              {t.icon === "download" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />}
              {t.icon === "refresh" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />}
            </svg>
            <span className="font-body text-[#706D66] text-xs font-medium text-center">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
