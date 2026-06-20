"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createClient } from "../../../../lib/supabase/client";
import ImageUpload from "../../components/ImageUpload";
import {
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from "../../actions/portfolio";

const EMPTY = { image: "", title: "", category: "", color: "#1A3828", sort_order: "0" };
const inputCls = "w-full border border-gray-300 px-3 py-2 text-sm font-body focus:outline-none focus:border-[#1A3828] transition-colors";

function ItemCard({ item, onRefresh }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...item, sort_order: String(item.sort_order) });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function setF(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const result = await updatePortfolioItem(item.id, form);
    setSaving(false);
    if (!result?.error) { setEditing(false); onRefresh(); }
    else alert(result.error);
  }

  async function handleDelete() {
    if (!confirm("Delete this portfolio item?")) return;
    setDeleting(true);
    await deletePortfolioItem(item.id);
    onRefresh();
  }

  const imgSrc = item.image;
  const isAbsolute = imgSrc?.startsWith("http");

  if (!editing) {
    return (
      <div className="bg-white border border-gray-200 p-4 flex items-center gap-4">
        <div className="w-16 h-16 bg-[#111111] flex-shrink-0 relative overflow-hidden">
          {imgSrc ? (
            isAbsolute ? (
              <img src={imgSrc} alt="" className="w-full h-full object-contain p-1" />
            ) : (
              <Image src={imgSrc} alt="" fill className="object-contain p-1" sizes="64px" />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">No img</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-body font-semibold text-gray-900 text-sm">{item.title}</div>
          <div className="font-body text-gray-400 text-xs">{item.category} · order {item.sort_order}</div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <button onClick={() => setEditing(true)} className="text-xs font-body font-medium text-[#1A3828] hover:underline">Edit</button>
          <button onClick={handleDelete} disabled={deleting} className="text-xs font-body font-medium text-red-600 hover:text-red-800 disabled:opacity-40">
            {deleting ? "…" : "Delete"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="bg-white border border-[#1A3828]/30 p-5 space-y-4">
      <ImageUpload
        images={form.image ? [form.image] : []}
        onChange={(imgs) => setF("image", imgs[imgs.length - 1] || "")}
      />
      <div className="grid grid-cols-2 gap-3">
        <input className={inputCls} placeholder="Title *" value={form.title} onChange={(e) => setF("title", e.target.value)} required />
        <input className={inputCls} placeholder="Category" value={form.category} onChange={(e) => setF("category", e.target.value)} />
        <div className="flex items-center gap-2">
          <input type="color" value={form.color} onChange={(e) => setF("color", e.target.value)} className="w-9 h-9 border border-gray-300 cursor-pointer" />
          <input className={`${inputCls} flex-1`} value={form.color} onChange={(e) => setF("color", e.target.value)} placeholder="#1A3828" />
        </div>
        <input type="number" className={inputCls} placeholder="Sort order" value={form.sort_order} onChange={(e) => setF("sort_order", e.target.value)} />
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

function AddForm({ onRefresh }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  function setF(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const result = await createPortfolioItem(form);
    setSaving(false);
    if (!result?.error) { setForm(EMPTY); setOpen(false); onRefresh(); }
    else alert(result.error);
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="w-full border-2 border-dashed border-gray-300 hover:border-[#1A3828] py-6 text-sm font-body text-gray-400 hover:text-[#1A3828] transition-colors">
        + Add portfolio item
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#1A3828]/30 p-5 space-y-4">
      <h3 className="font-body font-semibold text-gray-900 text-sm">New Portfolio Item</h3>
      <ImageUpload images={form.image ? [form.image] : []} onChange={(imgs) => setF("image", imgs[imgs.length - 1] || "")} />
      <div className="grid grid-cols-2 gap-3">
        <input className={inputCls} placeholder="Title *" value={form.title} onChange={(e) => setF("title", e.target.value)} required />
        <input className={inputCls} placeholder="Category" value={form.category} onChange={(e) => setF("category", e.target.value)} />
        <div className="flex items-center gap-2">
          <input type="color" value={form.color} onChange={(e) => setF("color", e.target.value)} className="w-9 h-9 border border-gray-300 cursor-pointer" />
          <input className={`${inputCls} flex-1`} value={form.color} onChange={(e) => setF("color", e.target.value)} placeholder="#1A3828" />
        </div>
        <input type="number" className={inputCls} placeholder="Sort order" value={form.sort_order} onChange={(e) => setF("sort_order", e.target.value)} />
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="bg-[#1A3828] text-white font-body text-sm px-5 py-2 hover:bg-[#24503A] disabled:opacity-60">
          {saving ? "Adding…" : "Add Item"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="font-body text-sm text-gray-500 hover:text-gray-700">Cancel</button>
      </div>
    </form>
  );
}

export default function PortfolioAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <h1 className="font-body font-bold text-gray-900 text-2xl mb-1">Portfolio</h1>
      <p className="font-body text-gray-500 text-sm mb-6">Changes appear on the site immediately after saving.</p>

      {loading ? (
        <div className="text-sm font-body text-gray-400 py-8">Loading…</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} onRefresh={load} />
          ))}
          <AddForm onRefresh={load} />
        </div>
      )}
    </div>
  );
}
