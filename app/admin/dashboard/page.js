import Link from "next/link";
import { createClient } from "../../../lib/supabase/server";

export const dynamic = "force-dynamic";

async function getCounts() {
  const supabase = await createClient();
  const [p, f, t] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("portfolio_items").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
  ]);
  return { products: p.count ?? 0, portfolio: f.count ?? 0, testimonials: t.count ?? 0 };
}

const statCards = [
  {
    key: "products",
    label: "Products",
    href: "/admin/dashboard/products",
    accent: "#1A3828",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    key: "portfolio",
    label: "Portfolio items",
    href: "/admin/dashboard/portfolio",
    accent: "#F0B429",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: "testimonials",
    label: "Reviews",
    href: "/admin/dashboard/testimonials",
    accent: "#6366F1",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: "Add new product",      href: "/admin/dashboard/products/new" },
  { label: "Edit portfolio",       href: "/admin/dashboard/portfolio" },
  { label: "Manage reviews",       href: "/admin/dashboard/testimonials" },
  { label: "Update contact info",  href: "/admin/dashboard/settings" },
];

const delays = ["animate-fade-up", "animate-fade-up-1", "animate-fade-up-2"];

export default async function DashboardPage() {
  const counts = await getCounts();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-body font-bold text-gray-900 text-2xl mb-1">Dashboard</h1>
        <p className="font-body text-gray-500 text-sm">Manage your site content from here.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statCards.map((card, i) => (
          <Link
            key={card.key}
            href={card.href}
            className={`${delays[i]} bg-white border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group overflow-hidden relative`}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: card.accent }}
            />
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{ background: card.accent + "18", color: card.accent }}
              >
                {card.icon}
              </div>
              <svg
                className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-all duration-200 group-hover:translate-x-0.5"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="font-body font-bold text-gray-900 text-3xl mb-0.5">
              {counts[card.key]}
            </div>
            <div className="font-body text-sm text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
              {card.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="animate-fade-up-3 bg-white border border-gray-200 p-5">
        <h2 className="font-body font-semibold text-gray-800 text-sm mb-4 uppercase tracking-wide">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {quickLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 px-4 py-3 border border-gray-100 hover:border-[#1A3828]/25 hover:bg-[#1A3828]/[0.03] transition-all duration-200 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0B429] shrink-0 transition-transform duration-200 group-hover:scale-125" />
              <span className="font-body text-sm text-gray-700 group-hover:text-[#1A3828] transition-colors duration-200">
                {l.label}
              </span>
              <svg
                className="w-3.5 h-3.5 ml-auto text-gray-300 group-hover:text-[#1A3828] transition-all duration-200 group-hover:translate-x-0.5"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
