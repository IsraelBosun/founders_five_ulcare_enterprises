"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logout } from "../actions/auth";

const HomeIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ProductsIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const PortfolioIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ReviewsIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const ContactIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ExternalIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const navItems = [
  { href: "/admin/dashboard", label: "Home",       exact: true, Icon: HomeIcon      },
  { href: "/admin/dashboard/products",     label: "Products",  Icon: ProductsIcon  },
  { href: "/admin/dashboard/portfolio",    label: "Portfolio", Icon: PortfolioIcon },
  { href: "/admin/dashboard/testimonials", label: "Reviews",   Icon: ReviewsIcon   },
  { href: "/admin/dashboard/settings",     label: "Contact",   Icon: ContactIcon   },
];

export default function Sidebar() {
  const pathname = usePathname();

  function isActive(item) {
    return item.exact ? pathname === item.href : pathname.startsWith(item.href);
  }

  return (
    <>
      {/* ── Desktop Sidebar ──────────────────────────────────── */}
      <aside className="hidden md:flex w-60 min-h-screen bg-[#0F2219] flex-col fixed top-0 left-0 z-40 animate-slide-left">
        <div className="px-6 py-5 border-b border-white/5">
          <Link href="/admin/dashboard" className="block">
            <Image
              src="/ulcare_logo.png"
              alt="Ulcare"
              width={120}
              height={44}
              className="h-9 w-auto brightness-0 invert"
            />
          </Link>
          <p className="font-body text-[#4A7A60] text-[10px] font-semibold uppercase tracking-[0.2em] mt-2.5">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item, i) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{ animationDelay: `${i * 0.05}s` }}
                className={`animate-fade-up relative flex items-center gap-3 px-3 py-2.5 text-sm font-body font-medium rounded-lg transition-all duration-200 group ${
                  active
                    ? "bg-[#1A3828] text-white"
                    : "text-[#4A7A60] hover:text-white hover:bg-[#1A3828]/60"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#F0B429] rounded-r-full animate-fade-up" />
                )}
                <span className={`transition-transform duration-200 ${active ? "scale-110 text-[#F0B429]" : "group-hover:scale-105"}`}>
                  <item.Icon />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-4 border-t border-white/5 pt-3 space-y-0.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 text-xs font-body text-[#4A7A60] hover:text-white transition-all duration-200 rounded-lg hover:bg-[#1A3828]/60 group"
          >
            <ExternalIcon />
            View site
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-body text-[#4A7A60] hover:text-red-400 transition-all duration-200 text-left rounded-lg hover:bg-red-950/40"
            >
              <LogoutIcon />
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* ── Mobile Top Header ─────────────────────────────────── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#0F2219]/95 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4">
        <Link href="/admin/dashboard">
          <Image
            src="/ulcare_logo.png"
            alt="Ulcare"
            width={100}
            height={36}
            className="h-7 w-auto brightness-0 invert"
          />
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            target="_blank"
            className="p-2.5 text-[#4A7A60] hover:text-white transition-colors rounded-lg"
            title="View site"
          >
            <ExternalIcon />
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="p-2.5 text-[#4A7A60] hover:text-red-400 transition-colors rounded-lg"
              title="Log out"
            >
              <LogoutIcon />
            </button>
          </form>
        </div>
      </header>

      {/* ── Mobile Bottom Tabs ─────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0F2219]/95 backdrop-blur-md border-t border-white/5 animate-slide-up-tab safe-area-inset-bottom">
        <div className="flex items-stretch h-[60px]">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-200 relative ${
                  active ? "text-[#F0B429]" : "text-[#4A7A60] active:text-[#7AAF95]"
                }`}
              >
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#F0B429] rounded-b-full" />
                )}
                <span className={`transition-all duration-200 ${active ? "scale-110" : "scale-100"}`}>
                  <item.Icon />
                </span>
                <span className={`text-[9px] font-body font-semibold leading-none tracking-wide transition-all duration-200 ${active ? "opacity-100" : "opacity-60"}`}>
                  {item.label.toUpperCase()}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
