"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../../lib/supabase/client";
import { updateSettings } from "../../actions/settings";

const inputCls = "w-full border border-gray-300 px-3 py-2.5 text-sm font-body focus:outline-none focus:border-[#1A3828] transition-colors";

export default function SettingsPage() {
  const [form, setForm] = useState({ whatsapp: "", email: "", address: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase.from("site_settings").select("*");
      const settings = {};
      (data || []).forEach(({ key, value }) => { settings[key] = value; });
      setForm({
        whatsapp: settings.whatsapp || "",
        email: settings.email || "",
        address: settings.address || "",
      });
      setLoading(false);
    }
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    const result = await updateSettings(form);
    setSaving(false);
    if (result?.error) setError(result.error);
    else { setSaved(true); setTimeout(() => setSaved(false), 3000); }
  }

  if (loading) {
    return <div className="text-sm font-body text-gray-400 py-8">Loading…</div>;
  }

  return (
    <div>
      <h1 className="font-body font-bold text-gray-900 text-2xl mb-1">Contact</h1>
      <p className="font-body text-gray-500 text-sm mb-8">Contact details used across the entire site.</p>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
        <div className="bg-white border border-gray-200 p-6 space-y-5">
          <div>
            <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
              WhatsApp Number
            </label>
            <input
              className={inputCls}
              value={form.whatsapp}
              onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
              placeholder="2348165078755"
            />
            <p className="mt-1 text-xs text-gray-400 font-body">
              International format without +. All purchase links use this number.
            </p>
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              className={inputCls}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="ulcare.enterprise@gmail.com"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
              Physical Address
            </label>
            <textarea
              rows={3}
              className={inputCls}
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              placeholder="Shop 4, Power Encounter Junction…"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-body">{error}</div>
        )}

        {saved && (
          <div className="bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 font-body">
            Settings saved. Changes are live on the site.
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-[#1A3828] text-white font-body font-semibold text-sm px-8 py-3 hover:bg-[#24503A] transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
