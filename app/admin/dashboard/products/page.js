import Link from "next/link";
import Image from "next/image";
import { createClient } from "../../../../lib/supabase/server";
import DeleteButton from "../../components/DeleteButton";
import { deleteProduct } from "../../actions/products";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, category, price, type, badge, images, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-body font-bold text-gray-900 text-2xl mb-0.5">Products</h1>
          <p className="font-body text-gray-500 text-sm">{products?.length ?? 0} products total</p>
        </div>
        <Link
          href="/admin/dashboard/products/new"
          className="bg-[#1A3828] text-white font-body font-semibold text-sm px-5 py-2.5 hover:bg-[#24503A] transition-colors"
        >
          + New product
        </Link>
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm font-body min-w-[420px]">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <th className="px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Product</th>
              <th className="px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Category</th>
              <th className="px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</th>
              <th className="px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Type</th>
              <th className="px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(products || []).map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 sm:px-5 py-3 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-9 h-9 bg-[#111111] flex-shrink-0 overflow-hidden relative">
                      {p.images?.[0] ? (
                        p.images[0].startsWith("http") ? (
                          <img src={p.images[0]} alt="" className="w-full h-full object-contain p-1" />
                        ) : (
                          <Image src={p.images[0]} alt="" fill className="object-contain p-1" sizes="36px" />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate max-w-[140px] sm:max-w-none">{p.name}</div>
                      {p.badge && (
                        <span className="text-[10px] text-gray-400">{p.badge}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-3 sm:px-5 py-3 sm:py-4 text-gray-500 hidden sm:table-cell">{p.category}</td>
                <td className="px-3 sm:px-5 py-3 sm:py-4 font-medium text-gray-900 whitespace-nowrap">₦{Number(p.price).toLocaleString()}</td>
                <td className="px-3 sm:px-5 py-3 sm:py-4 hidden md:table-cell">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wide ${
                    p.type === "download" ? "bg-[#F0B429]/15 text-[#8B6B00]" : "bg-[#1A3828]/10 text-[#1A3828]"
                  }`}>
                    {p.type}
                  </span>
                </td>
                <td className="px-3 sm:px-5 py-3 sm:py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/dashboard/products/${p.id}`}
                      className="text-xs font-medium text-[#1A3828] hover:underline whitespace-nowrap"
                    >
                      Edit
                    </Link>
                    <DeleteButton action={deleteProduct.bind(null, p.id)} label="product" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!products || products.length === 0) && (
          <div className="text-center py-16 text-gray-400 font-body text-sm">
            No products yet.{" "}
            <Link href="/admin/dashboard/products/new" className="text-[#1A3828] hover:underline">
              Add your first product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
