"use server";

import { createClient } from "../../../lib/supabase/server";
import { revalidatePath } from "next/cache";

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function createPortfolioItem(data) {
  const supabase = await createClient();
  const { error } = await supabase.from("portfolio_items").insert([{
    image: data.image || "",
    title: data.title,
    category: data.category || "",
    color: data.color || "#1A3828",
    sort_order: Number(data.sort_order) || 0,
  }]);
  if (error) return { error: error.message };
  revalidateAll();
  return { success: true };
}

export async function updatePortfolioItem(id, data) {
  const supabase = await createClient();
  const { error } = await supabase.from("portfolio_items").update({
    image: data.image || "",
    title: data.title,
    category: data.category || "",
    color: data.color || "#1A3828",
    sort_order: Number(data.sort_order) || 0,
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidateAll();
  return { success: true };
}

export async function deletePortfolioItem(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateAll();
  return { success: true };
}
