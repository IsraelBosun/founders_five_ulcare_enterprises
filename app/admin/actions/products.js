"use server";

import { createClient } from "../../../lib/supabase/server";
import { revalidatePath } from "next/cache";

function toRow(data) {
  return {
    name: data.name,
    category: data.category || "",
    color: data.color || "#1A3828",
    price: Number(data.price) || 0,
    original_price: data.original_price ? Number(data.original_price) : null,
    rating: Number(data.rating) || 5.0,
    review_count: Number(data.review_count) || 0,
    badge: data.badge || null,
    badge_color: data.badge_color || null,
    short_desc: data.short_desc || "",
    description: data.description || "",
    details: data.details || [],
    whats_inside: data.whats_inside || [],
    packages: data.packages || [],
    steps: data.steps || [],
    images: data.images || [],
    type: data.type || "service",
    sort_order: Number(data.sort_order) || 0,
  };
}

function revalidateAll(id) {
  revalidatePath("/");
  revalidatePath("/products");
  if (id) revalidatePath(`/products/${id}`);
}

export async function createProduct(data) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").insert([toRow(data)]);
  if (error) return { error: error.message };
  revalidateAll();
  return { success: true };
}

export async function updateProduct(id, data) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({ ...toRow(data), updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidateAll(id);
  return { success: true };
}

export async function deleteProduct(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateAll();
  return { success: true };
}
