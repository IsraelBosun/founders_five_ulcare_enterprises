"use server";

import { createClient } from "../../../lib/supabase/server";
import { revalidatePath } from "next/cache";

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/products/[id]", "page");
}

export async function createTestimonial(data) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert([{
    text: data.text,
    short_text: data.short_text || "",
    author: data.author,
    initials: data.initials || "",
    role: data.role || "",
    time_ago: data.time_ago || "",
    sort_order: Number(data.sort_order) || 0,
  }]);
  if (error) return { error: error.message };
  revalidateAll();
  return { success: true };
}

export async function updateTestimonial(id, data) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update({
    text: data.text,
    short_text: data.short_text || "",
    author: data.author,
    initials: data.initials || "",
    role: data.role || "",
    time_ago: data.time_ago || "",
    sort_order: Number(data.sort_order) || 0,
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidateAll();
  return { success: true };
}

export async function deleteTestimonial(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateAll();
  return { success: true };
}
