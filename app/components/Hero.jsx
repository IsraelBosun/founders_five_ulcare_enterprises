import Link from "next/link";
import { WHATSAPP } from "../data/site";

export default function Hero() {
  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    "Hi Ulcare! I'd like to enquire about your services. Please let me know your availability."
  )}`;

  return (
    <section className="relative bg-[#1A3828] min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-16">
      {/* Subtle radial glow */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 10%, rgba(240,180,41,0.07) 0%, transparent 60%)",
        }}
      />
      {/* Fine dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* Location pills */}
        <div className="flex flex-wrap gap-2 mb-10 animate-fade-up">
          {["Port Harcourt", "Abuja", "Lagos"].map((city) => (
            <span
              key={city}
              className="font-body text-[11px] font-medium px-3 py-1 rounded-full border border-[#F0B429]/30 text-[#F0B429] bg-[#F0B429]/8"
            >
              {city}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1
          className="font-body font-extrabold text-white leading-[1.0] tracking-tight mb-6 animate-fade-up-1 max-w-2xl"
          style={{ fontSize: "clamp(44px, 7vw, 80px)" }}
        >
          Elite branding,<br />made simple.
        </h1>

        {/* Subtext */}
        <p className="font-body text-[#7AAF95] text-base sm:text-[17px] leading-relaxed max-w-[440px] mb-10 animate-fade-up-2">
          World-class logos, CVs and business templates. No jargon. Buy in seconds — or order custom.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-16 animate-fade-up-3">
          <Link
            href="/products"
            className="font-body inline-flex items-center justify-center gap-2 bg-[#F0B429] text-[#1A1A12] font-semibold text-sm px-7 py-3.5 hover:bg-[#E0A61F] transition-colors duration-200"
          >
            Shop templates
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/portfolio"
            className="font-body inline-flex items-center justify-center gap-2 border border-white/20 text-white font-medium text-sm px-7 py-3.5 hover:bg-white/5 hover:border-white/35 transition-all duration-200"
          >
            See our work
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-10 pt-8 border-t border-white/10 animate-fade-up-3">
          {[
            { v: "500+", l: "Brands served" },
            { v: "60s", l: "Avg. download" },
            { v: "24/7", l: "WhatsApp" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-body font-bold text-white text-2xl leading-none mb-1">{s.v}</div>
              <div className="font-body text-[#7AAF95] text-[11px] font-medium uppercase tracking-[0.12em]">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
