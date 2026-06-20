import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../../../lib/supabase/server";
import ProductForm from "../../../components/ProductForm";
import { updateProduct } from "../../../actions/products";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("*").eq("id", id).single();

  if (!product) notFound();

  const initial = {
    ...product,
    originalPrice: product.original_price,
    reviewCount: product.review_count,
    badgeColor: product.badge_color,
    shortDesc: product.short_desc,
    whatsInside: product.whats_inside || [],
  };

  async function save(data) {
    "use server";
    return updateProduct(id, data);
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/dashboard/products" className="font-body text-sm text-gray-500 hover:text-gray-700">
          Products
        </Link>
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="font-body text-sm text-gray-900 truncate max-w-xs">{product.name}</span>
      </div>

      <h1 className="font-body font-bold text-gray-900 text-2xl mb-6">Edit Product</h1>

      <ProductForm initial={initial} onSave={save} submitLabel="Save Changes" />
    </div>
  );
}
