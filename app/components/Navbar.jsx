"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Shop", href: "/products" },
  { label: "Services", href: "/products" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/contact" },
  { label: "Contact", href: "/contact" },
];


export default function Navbar({ dark = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E0DDD5] transition-shadow duration-300 py-2 md:py-3">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 select-none leading-none">
            <Image
              src="/ulcare_logo.png"
              alt="Ulcare Enterprise"
              width={200}
              height={72}
              className="h-10 md:h-14 w-auto block"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-body text-sm font-medium transition-colors duration-200 ${
                    active ? "text-[#1A1A12]" : "text-[#706D66] hover:text-[#1A1A12]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="hidden md:inline-flex items-center font-body text-sm font-semibold px-5 py-2 bg-[#1A3828] text-white hover:bg-[#24503A] transition-colors duration-200"
            >
              Shop now
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={`md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-2 text-[#1A1A12] transition-colors duration-200 ${
                menuOpen ? "opacity-0 pointer-events-none" : ""
              }`}
            >
              <span className="block h-[1.5px] bg-current" />
              <span className="block h-[1.5px] bg-current" />
              <span className="block h-[1.5px] bg-current" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-60 md:hidden transition-all duration-300 ${
          menuOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute inset-y-0 right-0 w-full max-w-xs bg-[#111111] flex flex-col transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close button row */}
          <div className="flex items-center justify-end px-5 pt-5 pb-4 border-b border-white/8">
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-0">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`group flex items-center justify-between py-4 border-b border-white/8 transition-colors duration-200 ${
                      active ? "text-[#F0B429]" : "text-white/70 hover:text-white"
                    }`}
                  >
                    <span className="font-body font-semibold text-2xl tracking-tight">
                      {link.label}
                    </span>
                    <svg
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ${
                        active ? "text-[#F0B429]" : "text-white/15 group-hover:text-white/40"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </div>

            {/* Location tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {["Port Harcourt", "Abuja", "Lagos"].map((city) => (
                <span
                  key={city}
                  className="font-body text-[10px] font-medium uppercase tracking-[0.16em] text-white/25 border border-white/10 px-3 py-1.5"
                >
                  {city}
                </span>
              ))}
            </div>
          </nav>

          {/* Bottom CTA */}
          <div className="px-6 py-6 border-t border-white/8">
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="font-body flex items-center justify-center gap-1.5 w-full font-semibold text-sm py-3.5 bg-[#F0B429] text-[#1A1A12] hover:bg-[#E0A61F] transition-colors duration-200"
            >
              Shop now
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
