"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";

const EMPTY = {
  name: "", category: "", color: "#1A3828", price: "", original_price: "",
  rating: "5.0", review_count: "0", badge: "", badge_color: "",
  short_desc: "", description: "", type: "service", sort_order: "0",
  details: [], whats_inside: [], packages: [], steps: [], images: [],
};

function Field({ label, children, hint }) {
  return (
    <div>
      <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-gray-400 font-body">{hint}</p>}
    </div>
  );
}

const inputCls = "w-full border border-gray-300 px-3 py-2 text-sm font-body focus:outline-none focus:border-[#1A3828] transition-colors";

export default function ProductForm({ initial, onSave, submitLabel = "Save Product" }) {
  const router = useRouter();
  const [form, setForm] = useState(initial ? {
    ...initial,
    price: String(initial.price || ""),
    original_price: String(initial.originalPrice || ""),
    rating: String(initial.rating || "5.0"),
    review_count: String(initial.reviewCount || "0"),
    sort_order: String(initial.sort_order || "0"),
    badge: initial.badge || "",
    badge_color: initial.badgeColor || "",
    short_desc: initial.shortDesc || "",
    details: initial.details || [],
    whats_inside: initial.whatsInside || initial.whats_inside || [],
    packages: initial.packages || [],
    steps: initial.steps || [],
    images: initial.images || [],
  } : EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  // --- Details (string[]) ---
  function addDetail() { set("details", [...form.details, ""]); }
  function setDetail(i, v) { set("details", form.details.map((d, j) => j === i ? v : d)); }
  function removeDetail(i) { set("details", form.details.filter((_, j) => j !== i)); }

  // --- What's Inside ({title,desc}[]) ---
  function addWI() { set("whats_inside", [...form.whats_inside, { title: "", desc: "" }]); }
  function setWI(i, k, v) { set("whats_inside", form.whats_inside.map((x, j) => j === i ? { ...x, [k]: v } : x)); }
  function removeWI(i) { set("whats_inside", form.whats_inside.filter((_, j) => j !== i)); }

  // --- Packages ({name,description,price}[]) ---
  function addPkg() { set("packages", [...form.packages, { name: "", description: "", price: "" }]); }
  function setPkg(i, k, v) { set("packages", form.packages.map((x, j) => j === i ? { ...x, [k]: v } : x)); }
  function removePkg(i) { set("packages", form.packages.filter((_, j) => j !== i)); }

  // --- Steps ({n,title,desc}[]) ---
  function addStep() {
    const n = String(form.steps.length + 1).padStart(2, "0");
    set("steps", [...form.steps, { n, title: "", desc: "" }]);
  }
  function setStep(i, k, v) { set("steps", form.steps.map((x, j) => j === i ? { ...x, [k]: v } : x)); }
  function removeStep(i) { set("steps", form.steps.filter((_, j) => j !== i)); }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const result = await onSave(form);
    if (result?.error) {
      setError(result.error);
      setSaving(false);
    } else {
      router.push("/admin/dashboard/products");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">

      {/* Basic Info */}
      <section className="bg-white border border-gray-200 p-6 space-y-5">
        <h2 className="font-body font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">Basic Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Product Name *">
            <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </Field>
          <Field label="Category">
            <input className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. Branding" />
          </Field>
          <Field label="Type">
            <select className={inputCls} value={form.type} onChange={(e) => set("type", e.target.value)}>
              <option value="service">Service</option>
              <option value="download">Instant Download</option>
            </select>
          </Field>
          <Field label="Accent Colour">
            <div className="flex items-center gap-2">
              <input type="color" value={form.color} onChange={(e) => set("color", e.target.value)} className="w-10 h-10 border border-gray-300 cursor-pointer" />
              <input className={`${inputCls} flex-1`} value={form.color} onChange={(e) => set("color", e.target.value)} placeholder="#1A3828" />
            </div>
          </Field>
          <Field label="Sort Order" hint="Lower = appears first">
            <input type="number" className={inputCls} value={form.sort_order} onChange={(e) => set("sort_order", e.target.value)} />
          </Field>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white border border-gray-200 p-6 space-y-5">
        <h2 className="font-body font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">Pricing & Badge</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Price (₦) *">
            <input type="number" className={inputCls} value={form.price} onChange={(e) => set("price", e.target.value)} required />
          </Field>
          <Field label="Original Price (₦)" hint="Shows crossed-out if set">
            <input type="number" className={inputCls} value={form.original_price} onChange={(e) => set("original_price", e.target.value)} />
          </Field>
          <Field label="Badge Text" hint='e.g. "Bestseller" or "Instant Download"'>
            <input className={inputCls} value={form.badge} onChange={(e) => set("badge", e.target.value)} />
          </Field>
          <Field label="Badge Colour">
            <select className={inputCls} value={form.badge_color} onChange={(e) => set("badge_color", e.target.value)}>
              <option value="">None</option>
              <option value="amber">Amber (gold)</option>
              <option value="green">Green</option>
            </select>
          </Field>
          <Field label="Rating">
            <input type="number" step="0.1" min="0" max="5" className={inputCls} value={form.rating} onChange={(e) => set("rating", e.target.value)} />
          </Field>
          <Field label="Review Count">
            <input type="number" className={inputCls} value={form.review_count} onChange={(e) => set("review_count", e.target.value)} />
          </Field>
        </div>
      </section>

      {/* Description */}
      <section className="bg-white border border-gray-200 p-6 space-y-5">
        <h2 className="font-body font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">Description</h2>
        <Field label="Short Description" hint="One line shown on product cards">
          <input className={inputCls} value={form.short_desc} onChange={(e) => set("short_desc", e.target.value)} />
        </Field>
        <Field label="Full Description">
          <textarea rows={4} className={inputCls} value={form.description} onChange={(e) => set("description", e.target.value)} />
        </Field>
      </section>

      {/* Images */}
      <section className="bg-white border border-gray-200 p-6 space-y-4">
        <h2 className="font-body font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">Images</h2>
        <ImageUpload images={form.images} onChange={(imgs) => set("images", imgs)} />
      </section>

      {/* Details */}
      <section className="bg-white border border-gray-200 p-6 space-y-4">
        <h2 className="font-body font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">Details (bullet list)</h2>
        <div className="space-y-2">
          {form.details.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className={`${inputCls} flex-1`}
                value={d}
                onChange={(e) => setDetail(i, e.target.value)}
                placeholder={`Detail ${i + 1}`}
              />
              <button type="button" onClick={() => removeDetail(i)} className="text-red-500 hover:text-red-700 px-2 text-lg leading-none">×</button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addDetail} className="text-sm font-body text-[#1A3828] hover:underline">+ Add detail</button>
      </section>

      {/* What's Inside */}
      <section className="bg-white border border-gray-200 p-6 space-y-4">
        <h2 className="font-body font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">What&apos;s Inside</h2>
        <div className="space-y-3">
          {form.whats_inside.map((item, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 items-start">
              <input className={inputCls} placeholder="Title" value={item.title} onChange={(e) => setWI(i, "title", e.target.value)} />
              <div className="flex gap-2">
                <input className={`${inputCls} flex-1`} placeholder="Description" value={item.desc} onChange={(e) => setWI(i, "desc", e.target.value)} />
                <button type="button" onClick={() => removeWI(i)} className="text-red-500 hover:text-red-700 px-2 text-lg leading-none">×</button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addWI} className="text-sm font-body text-[#1A3828] hover:underline">+ Add item</button>
      </section>

      {/* Packages */}
      <section className="bg-white border border-gray-200 p-6 space-y-4">
        <h2 className="font-body font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">Packages <span className="text-gray-400 font-normal text-xs">(optional — e.g. Standard / Premium)</span></h2>
        <div className="space-y-3">
          {form.packages.map((pkg, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 items-center">
              <input className={inputCls} placeholder="Name" value={pkg.name} onChange={(e) => setPkg(i, "name", e.target.value)} />
              <input className={inputCls} placeholder="Description" value={pkg.description} onChange={(e) => setPkg(i, "description", e.target.value)} />
              <div className="flex gap-2">
                <input type="number" className={`${inputCls} flex-1`} placeholder="Price ₦" value={pkg.price} onChange={(e) => setPkg(i, "price", e.target.value)} />
                <button type="button" onClick={() => removePkg(i)} className="text-red-500 hover:text-red-700 px-2 text-lg leading-none">×</button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addPkg} className="text-sm font-body text-[#1A3828] hover:underline">+ Add package</button>
      </section>

      {/* Steps */}
      <section className="bg-white border border-gray-200 p-6 space-y-4">
        <h2 className="font-body font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">How It Works (steps)</h2>
        <div className="space-y-3">
          {form.steps.map((step, i) => (
            <div key={i} className="grid grid-cols-[60px_1fr_1fr_auto] gap-2 items-center">
              <input className={inputCls} placeholder="01" value={step.n} onChange={(e) => setStep(i, "n", e.target.value)} />
              <input className={inputCls} placeholder="Title" value={step.title} onChange={(e) => setStep(i, "title", e.target.value)} />
              <input className={inputCls} placeholder="Description" value={step.desc} onChange={(e) => setStep(i, "desc", e.target.value)} />
              <button type="button" onClick={() => removeStep(i)} className="text-red-500 hover:text-red-700 px-2 text-lg leading-none">×</button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addStep} className="text-sm font-body text-[#1A3828] hover:underline">+ Add step</button>
      </section>

      {error && (
        <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-body">{error}</div>
      )}

      <div className="flex items-center gap-4 pb-8">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#1A3828] text-white font-body font-semibold text-sm px-8 py-3 hover:bg-[#24503A] transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/dashboard/products")}
          className="font-body text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
