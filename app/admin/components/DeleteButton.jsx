"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ action, label = "item" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!confirm(`Delete this ${label}? This cannot be undone.`)) return;
    setLoading(true);
    await action();
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="text-xs font-body font-medium text-red-600 hover:text-red-800 disabled:opacity-40 transition-colors"
    >
      {loading ? "Deleting…" : "Delete"}
    </button>
  );
}
