import Link from "next/link";
import ProductForm from "../../../components/ProductForm";
import { createProduct } from "../../../actions/products";

export default function NewProductPage() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/dashboard/products" className="font-body text-sm text-gray-500 hover:text-gray-700">
          Products
        </Link>
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="font-body text-sm text-gray-900">New Product</span>
      </div>

      <h1 className="font-body font-bold text-gray-900 text-2xl mb-6">Add New Product</h1>

      <ProductForm onSave={createProduct} submitLabel="Create Product" />
    </div>
  );
}
