"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "../../../../lib/supabase/client";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../../actions/testimonials";

const EMPTY = { text: "", short_text: "", author: "", initials: "", role: "", time_ago: "", sort_order: "0" };
const inputCls = "w-full border border-gray-300 px-3 py-2 text-sm font-body focus:outline-none focus:border-[#1A3828] transition-colors";

function TestimonialCard({ item, onRefresh }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...item, sort_order: String(item.sort_order) });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function setF(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const result = await updateTestimonial(item.id, form);
    setSaving(false);
    if (!result?.error) { setEditing(false); onRefresh(); }
    else alert(result.error);
  }

  async function handleDelete() {
    if (!confirm("Delete this testimonial?")) return;
    setDeleting(true);
    await deleteTestimonial(item.id);
    onRefresh();
  }

  if (!editing) {
    return (
      <div className="bg-white border border-gray-200 p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1A3828] flex items-center justify-center flex-shrink-0">
              <span className="font-body text-white text-xs font-semibold">{item.initials}</span>
            </div>
            <div>
              <div className="font-body font-semibold text-gray-900 text-sm">{item.author}</div>
              <div className="font-body text-gray-400 text-xs">{item.role} · {item.time_ago}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <button onClick={() => setEditing(true)} className="text-xs font-body font-medium text-[#1A3828] hover:underline">Edit</button>
            <button onClick={handleDelete} disabled={deleting} className="text-xs font-body font-medium text-red-600 hover:text-red-800 disabled:opacity-40">
              {deleting ? "…" : "Delete"}
            </button>
          </div>
        </div>
        <p className="font-body text-gray-600 text-sm leading-relaxed">&ldquo;{item.text}&rdquo;</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="bg-white border border-[#1A3828]/30 p-5 space-y-4">
      <Field label="Full quote *">
        <textarea rows={3} className={inputCls} value={form.text} onChange={(e) => setF("text", e.target.value)} required />
      </Field>
      <Field label="Short quote" hint="Shown in compact views">
        <input className={inputCls} value={form.short_text} onChange={(e) => setF("short_text", e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Author name *">
          <input className={inputCls} value={form.author} onChange={(e) => setF("author", e.target.value)} required />
        </Field>
        <Field label="Initials" hint="e.g. AE">
          <input className={inputCls} maxLength={3} value={form.initials} onChange={(e) => setF("initials", e.target.value)} />
        </Field>
        <Field label="Role">
          <input className={inputCls} placeholder="e.g. Business Owner" value={form.role} onChange={(e) => setF("role", e.target.value)} />
        </Field>
        <Field label="Time ago">
          <input className={inputCls} placeholder="e.g. 2 weeks ago" value={form.time_ago} onChange={(e) => setF("time_ago", e.target.value)} />
        </Field>
        <Field label="Sort order">
          <input type="number" className={inputCls} value={form.sort_order} onChange={(e) => setF("sort_order", e.target.value)} />
        </Field>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="bg-[#1A3828] text-white font-body text-sm px-5 py-2 hover:bg-[#24503A] disabled:opacity-60">
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={() => setEditing(false)} className="font-body text-sm text-gray-500 hover:text-gray-700">Cancel</button>
      </div>
    </form>
  );
}

function Field({ label, children, hint }) {
  return (
    <div>
      <label className="block font-body text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
      {hint && <p className="mt-0.5 text-xs text-gray-400 font-body">{hint}</p>}
    </div>
  );
}

function AddForm({ onRefresh }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  function setF(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const result = await createTestimonial(form);
    setSaving(false);
    if (!result?.error) { setForm(EMPTY); setOpen(false); onRefresh(); }
    else alert(result.error);
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="w-full border-2 border-dashed border-gray-300 hover:border-[#1A3828] py-6 text-sm font-body text-gray-400 hover:text-[#1A3828] transition-colors">
        + Add testimonial
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#1A3828]/30 p-5 space-y-4">
      <h3 className="font-body font-semibold text-gray-900 text-sm">New Testimonial</h3>
      <Field label="Full quote *">
        <textarea rows={3} className={inputCls} value={form.text} onChange={(e) => setF("text", e.target.value)} required />
      </Field>
      <Field label="Short quote">
        <input className={inputCls} value={form.short_text} onChange={(e) => setF("short_text", e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Author name *">
          <input className={inputCls} value={form.author} onChange={(e) => setF("author", e.target.value)} required />
        </Field>
        <Field label="Initials">
          <input className={inputCls} maxLength={3} value={form.initials} onChange={(e) => setF("initials", e.target.value)} />
        </Field>
        <Field label="Role">
          <input className={inputCls} placeholder="e.g. Business Owner" value={form.role} onChange={(e) => setF("role", e.target.value)} />
        </Field>
        <Field label="Time ago">
          <input className={inputCls} placeholder="e.g. 2 weeks ago" value={form.time_ago} onChange={(e) => setF("time_ago", e.target.value)} />
        </Field>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="bg-[#1A3828] text-white font-body text-sm px-5 py-2 hover:bg-[#24503A] disabled:opacity-60">
          {saving ? "Adding…" : "Add Testimonial"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="font-body text-sm text-gray-500 hover:text-gray-700">Cancel</button>
      </div>
    </form>
  );
}

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <h1 className="font-body font-bold text-gray-900 text-2xl mb-1">Testimonials</h1>
      <p className="font-body text-gray-500 text-sm mb-6">Changes appear on the site immediately after saving.</p>

      {loading ? (
        <div className="text-sm font-body text-gray-400 py-8">Loading…</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <TestimonialCard key={item.id} item={item} onRefresh={load} />
          ))}
          <AddForm onRefresh={load} />
        </div>
      )}
    </div>
  );
}
