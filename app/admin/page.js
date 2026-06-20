"use client";

import { useState } from "react";
import Image from "next/image";
import { login } from "./actions/auth";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0F2219] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image
            src="/ulcare_logo.png"
            alt="Ulcare Enterprise"
            width={140}
            height={52}
            className="h-12 w-auto mx-auto brightness-0 invert mb-6"
          />
          <h1 className="font-body font-bold text-white text-2xl">Admin Portal</h1>
          <p className="font-body text-[#4A7A60] text-sm mt-1">Sign in to manage your site</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-5">
          <div>
            <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body focus:outline-none focus:border-[#1A3828] transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-gray-300 px-3 py-2.5 text-sm font-body focus:outline-none focus:border-[#1A3828] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-body">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A3828] text-white font-body font-semibold text-sm py-3 hover:bg-[#24503A] transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
