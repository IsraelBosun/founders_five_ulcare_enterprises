"use client";

import { useRef, useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import Image from "next/image";

export default function ImageUpload({ images = [], onChange }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabase.storage
      .from("ulcare-images")
      .upload(path, file, { upsert: true });

    if (!error) {
      const { data: { publicUrl } } = supabase.storage
        .from("ulcare-images")
        .getPublicUrl(data.path);
      onChange([...images, publicUrl]);
    } else {
      alert("Upload failed: " + error.message);
    }

    setUploading(false);
    e.target.value = "";
  }

  function remove(idx) {
    onChange(images.filter((_, i) => i !== idx));
  }

  function isAbsolute(src) {
    return src.startsWith("http") || src.startsWith("//");
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {images.map((src, i) => (
          <div key={i} className="relative group w-24 h-24 bg-[#111111] border border-gray-200 overflow-hidden">
            {isAbsolute(src) ? (
              <img src={src} alt="" className="w-full h-full object-contain p-2" />
            ) : (
              <Image src={src} alt="" fill className="object-contain p-2" sizes="96px" />
            )}
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-24 h-24 border-2 border-dashed border-gray-300 hover:border-[#1A3828] flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#1A3828] transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <span className="text-xs">Uploading…</span>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-[10px]">Upload</span>
            </>
          )}
        </button>
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      <p className="text-xs text-gray-400 font-body">
        Images upload to Supabase Storage. Make sure the <code className="bg-gray-100 px-1">ulcare-images</code> bucket exists and is public.
      </p>
    </div>
  );
}
