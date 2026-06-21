"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../../lib/supabase/client";
import { updateContent } from "../../actions/settings";
import { CONTENT_DEFAULTS } from "../../../data/content-defaults";

const TABS = ["Hero", "Homepage", "Products", "Portfolio", "Contact", "Footer"];

function pj(str, fallback) {
  try { return JSON.parse(str); } catch { return fallback; }
}

// ── Shared UI ─────────────────────────────────────────

const inputCls =
  "w-full border border-gray-300 px-3 py-2.5 text-sm font-body focus:outline-none focus:border-[#1A3828] transition-colors";

function Field({ label, hint, value, onChange, max, rows }) {
  const len = (value || "").length;
  const over = len > max;
  const near = len > max * 0.85;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="font-body text-sm font-medium text-gray-700">{label}</label>
        <span
          className={`font-body text-xs tabular-nums ${
            over ? "text-red-500 font-semibold" : near ? "text-amber-500" : "text-gray-400"
          }`}
        >
          {len}/{max}
        </span>
      </div>
      {rows ? (
        <textarea
          rows={rows}
          maxLength={max}
          className={`${inputCls} resize-none`}
          value={value || ""}
          onChange={onChange}
        />
      ) : (
        <input
          maxLength={max}
          className={inputCls}
          value={value || ""}
          onChange={onChange}
        />
      )}
      {hint && <p className="mt-1 text-xs text-gray-400 font-body">{hint}</p>}
    </div>
  );
}

function SectionHead({ title, desc }) {
  return (
    <div className="mb-5 pb-4 border-b border-gray-100">
      <h3 className="font-body font-semibold text-gray-800 text-[15px]">{title}</h3>
      {desc && <p className="font-body text-xs text-gray-500 mt-0.5">{desc}</p>}
    </div>
  );
}

function SaveRow({ saving, saved, error }) {
  return (
    <div className="flex items-center gap-4 pt-5 mt-2 border-t border-gray-200">
      <button
        type="submit"
        disabled={saving}
        className="bg-[#1A3828] text-white font-body font-semibold text-sm px-6 py-2.5 hover:bg-[#24503A] transition-colors disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
      {saved && (
        <span className="font-body text-sm text-green-600">Saved — live on site.</span>
      )}
      {error && <span className="font-body text-sm text-red-600">{error}</span>}
    </div>
  );
}

function useSave() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function doSave(entries) {
    setSaving(true);
    setSaved(false);
    setError("");
    const res = await updateContent(entries);
    setSaving(false);
    if (res?.error) setError(res.error);
    else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  return { saving, saved, error, doSave };
}

// ── Hero Tab ──────────────────────────────────────────

function HeroTab({ initial }) {
  const [form, setForm] = useState({
    headline: initial.hero_headline,
    subtext: initial.hero_subtext,
    waMessage: initial.hero_wa_message,
    cities: pj(initial.hero_cities, ["Port Harcourt", "Abuja", "Lagos"]),
    stats: pj(initial.hero_stats, [
      { v: "500+", l: "Brands served" },
      { v: "60s", l: "Avg. download" },
      { v: "24/7", l: "WhatsApp" },
    ]),
  });

  const { saving, saved, error, doSave } = useSave();
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    doSave([
      { key: "hero_headline", value: form.headline },
      { key: "hero_subtext", value: form.subtext },
      { key: "hero_wa_message", value: form.waMessage },
      { key: "hero_cities", value: JSON.stringify(form.cities) },
      { key: "hero_stats", value: JSON.stringify(form.stats) },
    ]);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <SectionHead title="Headline & Text" />
        <Field
          label="Headline"
          value={form.headline}
          onChange={set("headline")}
          max={80}
          rows={2}
          hint="Press Enter to add a line break."
        />
        <Field
          label="Subtext"
          value={form.subtext}
          onChange={set("subtext")}
          max={130}
          rows={2}
        />
        <Field
          label="WhatsApp enquiry message"
          value={form.waMessage}
          onChange={set("waMessage")}
          max={200}
          hint="Pre-filled text when the hero CTA opens WhatsApp."
        />
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-4">
        <SectionHead title="Location Pills" desc="Up to 3 cities shown below the headline." />
        {form.cities.map((city, i) => (
          <Field
            key={i}
            label={`City ${i + 1}`}
            value={city}
            onChange={(e) => {
              const next = [...form.cities];
              next[i] = e.target.value;
              setForm((f) => ({ ...f, cities: next }));
            }}
            max={20}
          />
        ))}
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-4">
        <SectionHead
          title="Stats Bar"
          desc="Three numbers shown at the bottom of the hero section."
        />
        {form.stats.map((stat, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <Field
              label={`Stat ${i + 1} — Number`}
              value={stat.v}
              onChange={(e) => {
                const next = form.stats.map((s, j) =>
                  j === i ? { ...s, v: e.target.value } : s
                );
                setForm((f) => ({ ...f, stats: next }));
              }}
              max={8}
              hint='e.g. "500+"'
            />
            <Field
              label="Label"
              value={stat.l}
              onChange={(e) => {
                const next = form.stats.map((s, j) =>
                  j === i ? { ...s, l: e.target.value } : s
                );
                setForm((f) => ({ ...f, stats: next }));
              }}
              max={24}
              hint='e.g. "Brands served"'
            />
          </div>
        ))}
      </div>

      <SaveRow saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ── Homepage Tab ──────────────────────────────────────

function HomepageTab({ initial }) {
  const [form, setForm] = useState({
    whatwedoLabel: initial.whatwedo_label,
    whatwedoTitle: initial.whatwedo_title,
    whatwedoSubtitle: initial.whatwedo_subtitle,
    services: pj(initial.whatwedo_services, [
      { name: "Branding", desc: "Logo + identity" },
      { name: "CV & Profile", desc: "Career upgrade" },
      { name: "Flyers", desc: "High-converting" },
      { name: "Templates", desc: "Instant download" },
    ]),
    vaultLabel: initial.vault_label,
    vaultTitle: initial.vault_title,
    vaultSubtitle: initial.vault_subtitle,
    vaultCustomTitle: initial.vault_custom_title,
    vaultCustomText: initial.vault_custom_text,
    vaultCustomWa: initial.vault_custom_wa,
    portfolioLabel: initial.home_portfolio_label,
    portfolioTitle: initial.home_portfolio_title,
    ctaTitle: initial.cta_title,
    ctaText: initial.cta_text,
    ctaWa: initial.cta_wa_message,
  });

  const { saving, saved, error, doSave } = useSave();
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    doSave([
      { key: "whatwedo_label", value: form.whatwedoLabel },
      { key: "whatwedo_title", value: form.whatwedoTitle },
      { key: "whatwedo_subtitle", value: form.whatwedoSubtitle },
      { key: "whatwedo_services", value: JSON.stringify(form.services) },
      { key: "vault_label", value: form.vaultLabel },
      { key: "vault_title", value: form.vaultTitle },
      { key: "vault_subtitle", value: form.vaultSubtitle },
      { key: "vault_custom_title", value: form.vaultCustomTitle },
      { key: "vault_custom_text", value: form.vaultCustomText },
      { key: "vault_custom_wa", value: form.vaultCustomWa },
      { key: "home_portfolio_label", value: form.portfolioLabel },
      { key: "home_portfolio_title", value: form.portfolioTitle },
      { key: "cta_title", value: form.ctaTitle },
      { key: "cta_text", value: form.ctaText },
      { key: "cta_wa_message", value: form.ctaWa },
    ]);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* What We Do */}
      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <SectionHead title="What We Do" desc="Service overview section." />
        <Field label="Eyebrow label" value={form.whatwedoLabel} onChange={set("whatwedoLabel")} max={30} />
        <Field label="Title" value={form.whatwedoTitle} onChange={set("whatwedoTitle")} max={60} />
        <Field label="Subtitle" value={form.whatwedoSubtitle} onChange={set("whatwedoSubtitle")} max={100} />
        <div>
          <p className="font-body text-sm font-medium text-gray-700 mb-3">Service cards</p>
          <div className="space-y-3">
            {form.services.map((svc, i) => (
              <div key={i} className="grid grid-cols-2 gap-3 p-3 bg-gray-50 border border-gray-200">
                <Field
                  label={`Card ${i + 1} — Name`}
                  value={svc.name}
                  onChange={(e) => {
                    const next = form.services.map((s, j) =>
                      j === i ? { ...s, name: e.target.value } : s
                    );
                    setForm((f) => ({ ...f, services: next }));
                  }}
                  max={20}
                />
                <Field
                  label="Tagline"
                  value={svc.desc}
                  onChange={(e) => {
                    const next = form.services.map((s, j) =>
                      j === i ? { ...s, desc: e.target.value } : s
                    );
                    setForm((f) => ({ ...f, services: next }));
                  }}
                  max={40}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Vault */}
      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <SectionHead title="Asset Vault" desc="Featured products section." />
        <Field label="Eyebrow label" value={form.vaultLabel} onChange={set("vaultLabel")} max={30} />
        <Field label="Title" value={form.vaultTitle} onChange={set("vaultTitle")} max={60} />
        <Field label="Subtitle" value={form.vaultSubtitle} onChange={set("vaultSubtitle")} max={100} />
        <div className="pt-3 border-t border-gray-100 space-y-4">
          <p className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Custom project card
          </p>
          <Field label="Card title" value={form.vaultCustomTitle} onChange={set("vaultCustomTitle")} max={40} />
          <Field label="Card text" value={form.vaultCustomText} onChange={set("vaultCustomText")} max={100} />
          <Field label="WhatsApp message" value={form.vaultCustomWa} onChange={set("vaultCustomWa")} max={200} />
        </div>
      </div>

      {/* Portfolio preview */}
      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <SectionHead title="Portfolio Preview" desc="Section heading above the portfolio grid." />
        <Field label="Eyebrow label" value={form.portfolioLabel} onChange={set("portfolioLabel")} max={30} />
        <Field label="Title" value={form.portfolioTitle} onChange={set("portfolioTitle")} max={60} />
      </div>

      {/* Custom CTA */}
      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <SectionHead title="Custom CTA Banner" desc="Dark green call-to-action block at the bottom of the homepage." />
        <Field label="Heading" value={form.ctaTitle} onChange={set("ctaTitle")} max={60} />
        <Field label="Body text" value={form.ctaText} onChange={set("ctaText")} max={160} rows={2} />
        <Field label="WhatsApp message" value={form.ctaWa} onChange={set("ctaWa")} max={200} />
      </div>

      <SaveRow saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ── Products Tab ──────────────────────────────────────

function ProductsTab({ initial }) {
  const [form, setForm] = useState({
    heroLabel: initial.shop_hero_label,
    heroTitle: initial.shop_hero_title,
    heroSubtitle: initial.shop_hero_subtitle,
    servicesLabel: initial.shop_services_label,
    servicesTitle: initial.shop_services_title,
    servicesSubtitle: initial.shop_services_subtitle,
    downloadsLabel: initial.shop_downloads_label,
    downloadsTitle: initial.shop_downloads_title,
    downloadsSubtitle: initial.shop_downloads_subtitle,
    ctaTitle: initial.shop_cta_title,
    ctaText: initial.shop_cta_text,
    ctaWa: initial.shop_cta_wa,
  });

  const { saving, saved, error, doSave } = useSave();
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    doSave([
      { key: "shop_hero_label", value: form.heroLabel },
      { key: "shop_hero_title", value: form.heroTitle },
      { key: "shop_hero_subtitle", value: form.heroSubtitle },
      { key: "shop_services_label", value: form.servicesLabel },
      { key: "shop_services_title", value: form.servicesTitle },
      { key: "shop_services_subtitle", value: form.servicesSubtitle },
      { key: "shop_downloads_label", value: form.downloadsLabel },
      { key: "shop_downloads_title", value: form.downloadsTitle },
      { key: "shop_downloads_subtitle", value: form.downloadsSubtitle },
      { key: "shop_cta_title", value: form.ctaTitle },
      { key: "shop_cta_text", value: form.ctaText },
      { key: "shop_cta_wa", value: form.ctaWa },
    ]);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <SectionHead title="Page Hero" />
        <Field label="Eyebrow label" value={form.heroLabel} onChange={set("heroLabel")} max={30} />
        <Field label="Title" value={form.heroTitle} onChange={set("heroTitle")} max={60} />
        <Field label="Subtitle" value={form.heroSubtitle} onChange={set("heroSubtitle")} max={120} rows={2} />
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <SectionHead title="Services Section" desc="Custom made-to-order products." />
        <Field label="Eyebrow label" value={form.servicesLabel} onChange={set("servicesLabel")} max={30} />
        <Field label="Title" value={form.servicesTitle} onChange={set("servicesTitle")} max={60} />
        <Field label="Subtitle" value={form.servicesSubtitle} onChange={set("servicesSubtitle")} max={100} />
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <SectionHead title="Downloads Section" desc="Instant-download products." />
        <Field label="Eyebrow label" value={form.downloadsLabel} onChange={set("downloadsLabel")} max={30} />
        <Field label="Title" value={form.downloadsTitle} onChange={set("downloadsTitle")} max={60} />
        <Field label="Subtitle" value={form.downloadsSubtitle} onChange={set("downloadsSubtitle")} max={100} />
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <SectionHead title="Custom CTA" desc="Banner at the bottom of the shop page." />
        <Field label="Heading" value={form.ctaTitle} onChange={set("ctaTitle")} max={60} />
        <Field label="Body text" value={form.ctaText} onChange={set("ctaText")} max={160} rows={2} />
        <Field label="WhatsApp message" value={form.ctaWa} onChange={set("ctaWa")} max={200} />
      </div>

      <SaveRow saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ── Portfolio Tab ─────────────────────────────────────

function PortfolioTab({ initial }) {
  const [form, setForm] = useState({
    heroLabel: initial.portfolio_page_label,
    heroTitle: initial.portfolio_page_title,
    heroSubtitle: initial.portfolio_page_subtitle,
    ctaLabel: initial.portfolio_cta_label,
    ctaTitle: initial.portfolio_cta_title,
    ctaText: initial.portfolio_cta_text,
    ctaWa: initial.portfolio_cta_wa,
  });

  const { saving, saved, error, doSave } = useSave();
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    doSave([
      { key: "portfolio_page_label", value: form.heroLabel },
      { key: "portfolio_page_title", value: form.heroTitle },
      { key: "portfolio_page_subtitle", value: form.heroSubtitle },
      { key: "portfolio_cta_label", value: form.ctaLabel },
      { key: "portfolio_cta_title", value: form.ctaTitle },
      { key: "portfolio_cta_text", value: form.ctaText },
      { key: "portfolio_cta_wa", value: form.ctaWa },
    ]);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <SectionHead title="Page Hero" />
        <Field label="Eyebrow label" value={form.heroLabel} onChange={set("heroLabel")} max={30} />
        <Field label="Title" value={form.heroTitle} onChange={set("heroTitle")} max={80} />
        <Field label="Subtitle" value={form.heroSubtitle} onChange={set("heroSubtitle")} max={160} rows={2} />
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <SectionHead
          title="Commission CTA"
          desc="Call-to-action panel below the portfolio grid."
        />
        <Field label="Eyebrow label" value={form.ctaLabel} onChange={set("ctaLabel")} max={30} />
        <Field label="Heading" value={form.ctaTitle} onChange={set("ctaTitle")} max={60} />
        <Field label="Body text" value={form.ctaText} onChange={set("ctaText")} max={200} rows={3} />
        <Field label="WhatsApp message" value={form.ctaWa} onChange={set("ctaWa")} max={200} />
      </div>

      <SaveRow saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ── Contact Tab ───────────────────────────────────────

function ContactTab({ initial }) {
  const [form, setForm] = useState({
    heroLabel: initial.contact_hero_label,
    heroTitle: initial.contact_hero_title,
    heroSubtitle: initial.contact_hero_subtitle,
    promises: pj(initial.contact_promises, [
      "Response within minutes",
      "No upfront payment required",
      "Professional results, guaranteed",
      "Delivered straight to WhatsApp",
    ]),
    panelLabel: initial.contact_panel_label,
    panelTitle: initial.contact_panel_title,
    panelText: initial.contact_panel_text,
    waMessage: initial.contact_wa_message,
  });

  const { saving, saved, error, doSave } = useSave();
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    doSave([
      { key: "contact_hero_label", value: form.heroLabel },
      { key: "contact_hero_title", value: form.heroTitle },
      { key: "contact_hero_subtitle", value: form.heroSubtitle },
      { key: "contact_promises", value: JSON.stringify(form.promises) },
      { key: "contact_panel_label", value: form.panelLabel },
      { key: "contact_panel_title", value: form.panelTitle },
      { key: "contact_panel_text", value: form.panelText },
      { key: "contact_wa_message", value: form.waMessage },
    ]);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <SectionHead title="Page Hero" />
        <Field label="Eyebrow label" value={form.heroLabel} onChange={set("heroLabel")} max={30} />
        <Field label="Title" value={form.heroTitle} onChange={set("heroTitle")} max={60} />
        <Field label="Subtitle" value={form.heroSubtitle} onChange={set("heroSubtitle")} max={120} rows={2} />
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-4">
        <SectionHead
          title="Promise List"
          desc="4 bullet points shown in the project panel."
        />
        {form.promises.map((p, i) => (
          <Field
            key={i}
            label={`Item ${i + 1}`}
            value={p}
            onChange={(e) => {
              const next = [...form.promises];
              next[i] = e.target.value;
              setForm((f) => ({ ...f, promises: next }));
            }}
            max={60}
          />
        ))}
      </div>

      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <SectionHead
          title="Project Panel"
          desc="The dark green panel on the right side of the contact page."
        />
        <Field label="Eyebrow label" value={form.panelLabel} onChange={set("panelLabel")} max={30} />
        <Field label="Heading" value={form.panelTitle} onChange={set("panelTitle")} max={60} />
        <Field label="Body text" value={form.panelText} onChange={set("panelText")} max={200} rows={3} />
        <Field label="WhatsApp message" value={form.waMessage} onChange={set("waMessage")} max={200} />
      </div>

      <SaveRow saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ── Footer Tab ────────────────────────────────────────

function FooterTab({ initial }) {
  const [form, setForm] = useState({ tagline: initial.footer_tagline });
  const { saving, saved, error, doSave } = useSave();

  function handleSubmit(e) {
    e.preventDefault();
    doSave([{ key: "footer_tagline", value: form.tagline }]);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-gray-200 p-6 space-y-5">
        <SectionHead title="Footer" desc="Appears at the bottom of every page." />
        <Field
          label="Brand tagline"
          value={form.tagline}
          onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
          max={120}
          hint="Short description displayed under the logo."
        />
      </div>
      <SaveRow saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ── Main Page ─────────────────────────────────────────

export default function ContentPage() {
  const [settings, setSettings] = useState(null);
  const [activeTab, setActiveTab] = useState("Hero");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase.from("site_settings").select("*");
      const map = { ...CONTENT_DEFAULTS };
      (data || []).forEach(({ key, value }) => { map[key] = value; });
      setSettings(map);
    }
    load();
  }, []);

  if (!settings) {
    return (
      <div className="text-sm font-body text-gray-400 py-8">Loading…</div>
    );
  }

  return (
    <div>
      <h1 className="font-body font-bold text-gray-900 text-2xl mb-1">Page Content</h1>
      <p className="font-body text-gray-500 text-sm mb-8">
        Edit every piece of text displayed on the public site. Changes are live immediately after saving.
      </p>

      {/* Tab bar */}
      <div className="grid grid-cols-3 sm:flex mb-8 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`font-body text-sm font-medium px-2 sm:px-4 py-2.5 border-b-2 -mb-px transition-colors duration-150 text-center sm:text-left ${
              activeTab === tab
                ? "border-[#1A3828] text-[#1A3828]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-2xl">
        {activeTab === "Hero" && <HeroTab initial={settings} />}
        {activeTab === "Homepage" && <HomepageTab initial={settings} />}
        {activeTab === "Products" && <ProductsTab initial={settings} />}
        {activeTab === "Portfolio" && <PortfolioTab initial={settings} />}
        {activeTab === "Contact" && <ContactTab initial={settings} />}
        {activeTab === "Footer" && <FooterTab initial={settings} />}
      </div>
    </div>
  );
}
