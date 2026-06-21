import { createClient } from "../../lib/supabase/server";
import { CONTENT_DEFAULTS } from "./content-defaults";

function pj(str, fallback) {
  try { return JSON.parse(str); } catch { return fallback; }
}

export async function getPageContent() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*");
  const raw = {};
  (data || []).forEach(({ key, value }) => { raw[key] = value; });
  const s = { ...CONTENT_DEFAULTS, ...raw };

  return {
    whatsapp: s.whatsapp || "2348165078755",
    email: s.email || "ulcare.enterprise@gmail.com",
    address: s.address || "",

    hero: {
      headline: s.hero_headline,
      subtext: s.hero_subtext,
      cities: pj(s.hero_cities, ["Port Harcourt", "Abuja", "Lagos"]),
      stats: pj(s.hero_stats, [
        { v: "500+", l: "Brands served" },
        { v: "60s", l: "Avg. download" },
        { v: "24/7", l: "WhatsApp" },
      ]),
      waMessage: s.hero_wa_message,
    },

    whatWeDo: {
      label: s.whatwedo_label,
      title: s.whatwedo_title,
      subtitle: s.whatwedo_subtitle,
      services: pj(s.whatwedo_services, [
        { name: "Branding", desc: "Logo + identity" },
        { name: "CV & Profile", desc: "Career upgrade" },
        { name: "Flyers", desc: "High-converting" },
        { name: "Templates", desc: "Instant download" },
      ]),
    },

    vault: {
      label: s.vault_label,
      title: s.vault_title,
      subtitle: s.vault_subtitle,
      customTitle: s.vault_custom_title,
      customText: s.vault_custom_text,
      customWa: s.vault_custom_wa,
    },

    homePortfolio: {
      label: s.home_portfolio_label,
      title: s.home_portfolio_title,
    },

    cta: {
      title: s.cta_title,
      text: s.cta_text,
      waMessage: s.cta_wa_message,
    },

    footer: {
      tagline: s.footer_tagline,
    },

    shop: {
      heroLabel: s.shop_hero_label,
      heroTitle: s.shop_hero_title,
      heroSubtitle: s.shop_hero_subtitle,
      servicesLabel: s.shop_services_label,
      servicesTitle: s.shop_services_title,
      servicesSubtitle: s.shop_services_subtitle,
      downloadsLabel: s.shop_downloads_label,
      downloadsTitle: s.shop_downloads_title,
      downloadsSubtitle: s.shop_downloads_subtitle,
      ctaTitle: s.shop_cta_title,
      ctaText: s.shop_cta_text,
      ctaWa: s.shop_cta_wa,
    },

    portfolio: {
      heroLabel: s.portfolio_page_label,
      heroTitle: s.portfolio_page_title,
      heroSubtitle: s.portfolio_page_subtitle,
      ctaLabel: s.portfolio_cta_label,
      ctaTitle: s.portfolio_cta_title,
      ctaText: s.portfolio_cta_text,
      ctaWa: s.portfolio_cta_wa,
    },

    contact: {
      heroLabel: s.contact_hero_label,
      heroTitle: s.contact_hero_title,
      heroSubtitle: s.contact_hero_subtitle,
      promises: pj(s.contact_promises, [
        "Response within minutes",
        "No upfront payment required",
        "Professional results, guaranteed",
        "Delivered straight to WhatsApp",
      ]),
      panelLabel: s.contact_panel_label,
      panelTitle: s.contact_panel_title,
      panelText: s.contact_panel_text,
      waMessage: s.contact_wa_message,
    },
  };
}

function buildWaLink(number, name, price) {
  return `https://wa.me/${number}?text=${encodeURIComponent(
    `Hi Ulcare! I'd like to order the *${name}* (₦${Number(price).toLocaleString()}). Please let me know how to proceed. 🙏`
  )}`;
}

function mapProduct(p, waNumber) {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    color: p.color,
    price: p.price,
    originalPrice: p.original_price,
    rating: p.rating,
    reviewCount: p.review_count,
    badge: p.badge,
    badgeColor: p.badge_color,
    shortDesc: p.short_desc,
    description: p.description,
    details: p.details || [],
    whatsInside: p.whats_inside || [],
    packages: p.packages || [],
    steps: p.steps || [],
    images: p.images || [],
    type: p.type,
    sort_order: p.sort_order,
    whatsappLink: buildWaLink(waNumber, p.name, p.price),
  };
}

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*");
  const settings = {};
  (data || []).forEach(({ key, value }) => {
    settings[key] = value;
  });
  return settings;
}

export async function getWhatsApp() {
  const settings = await getSiteSettings();
  return settings.whatsapp || "2348165078755";
}

export async function getProducts() {
  const supabase = await createClient();
  const [{ data: products }, wa] = await Promise.all([
    supabase.from("products").select("*").order("sort_order", { ascending: true }),
    getWhatsApp(),
  ]);
  return (products || []).map((p) => mapProduct(p, wa));
}

export async function getProduct(id) {
  const supabase = await createClient();
  const [{ data }, wa] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    getWhatsApp(),
  ]);
  if (!data) return null;
  return mapProduct(data, wa);
}

export async function getPortfolio() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("sort_order", { ascending: true });
  return data || [];
}

export async function getTestimonials() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data || []).map((t) => ({
    id: t.id,
    text: t.text,
    shortText: t.short_text,
    author: t.author,
    initials: t.initials,
    role: t.role,
    timeAgo: t.time_ago,
  }));
}
