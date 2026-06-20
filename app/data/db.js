import { createClient } from "../../lib/supabase/server";

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
