"use server";

import { createClient } from "../../../lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateContent(entries) {
  const supabase = await createClient();
  for (const { key, value } of entries) {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value }, { onConflict: "key" });
    if (error) return { error: error.message };
  }
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateSettings(data) {
  const supabase = await createClient();

  const entries = [
    { key: "whatsapp", value: data.whatsapp || "" },
    { key: "email", value: data.email || "" },
    { key: "address", value: data.address || "" },
  ];

  for (const entry of entries) {
    const { error } = await supabase
      .from("site_settings")
      .upsert(entry, { onConflict: "key" });
    if (error) return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}
