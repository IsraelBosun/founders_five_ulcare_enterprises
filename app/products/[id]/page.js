import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";
import ProductPurchase from "../../components/ProductPurchase";
import ProductGallery from "../../components/ProductGallery";
import { products, testimonials } from "../../data/site";

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products.find((p) => String(p.id) === id);
  if (!product) return {};
  return {
    title: `${product.name} — Ulcare Enterprise`,
    description: product.shortDesc,
  };
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? "text-[#F0B429]" : "text-[#E0DDD5]"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}


export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = products.find((p) => String(p.id) === id);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F5F0]">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#E0DDD5] pt-20 sm:pt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 font-body text-sm text-[#706D66]">
              <Link href="/products" className="hover:text-[#1A1A12] transition-colors">Shop</Link>
              <svg className="w-3 h-3 text-[#A09B93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[#A09B93]">{product.category}</span>
              <svg className="w-3 h-3 text-[#A09B93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[#1A1A12] font-medium truncate max-w-[200px] sm:max-w-none">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

            {/* Left: Gallery */}
            <div className="lg:sticky lg:top-28">
              <ProductGallery
                images={product.images}
                name={product.name}
                badge={product.badge}
                badgeColor={product.badgeColor}
              />
            </div>

            {/* Right: Interactive purchase panel */}
            <ProductPurchase product={product} />
          </div>

          {/* What's Inside */}
          {product.whatsInside?.length > 0 && (
            <div className="mt-20 sm:mt-24 pt-16 border-t border-[#E0DDD5]">
              <div className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-[#A09B93] mb-4">
                What&rsquo;s Inside
              </div>
              <h2 className="font-body font-bold text-[#1A1A12] text-2xl sm:text-3xl mb-10">
                Everything you need to look elite.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.whatsInside.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white border border-[#E0DDD5] p-5">
                    <div className="w-9 h-9 bg-[#1A3828] flex items-center justify-center flex-shrink-0 rounded-sm">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-body font-semibold text-[#1A1A12] text-sm mb-1">{item.title}</div>
                      <div className="font-body text-[#706D66] text-xs leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How It Works */}
          {product.steps?.length > 0 && (
            <div className="mt-16 sm:mt-20 pt-16 border-t border-[#E0DDD5]">
              <div className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-[#A09B93] mb-4">
                How It Works
              </div>
              <h2 className="font-body font-bold text-[#1A1A12] text-2xl sm:text-3xl mb-10">
                From payment to brand in 4 steps.
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {product.steps.map((step) => (
                  <div key={step.n}>
                    <div className="font-body font-bold text-[#F0B429] text-2xl mb-3">{step.n}</div>
                    <div className="font-body font-semibold text-[#1A1A12] text-sm mb-1">{step.title}</div>
                    <div className="font-body text-[#706D66] text-xs leading-relaxed">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="mt-16 sm:mt-20 pt-16 border-t border-[#E0DDD5]">
            <div className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-[#A09B93] mb-4">
              Reviews
            </div>
            <div className="flex items-center justify-between gap-4 mb-10">
              <h2 className="font-body font-bold text-[#1A1A12] text-2xl sm:text-3xl">
                {product.rating} out of 5 — {product.reviewCount} happy clients.
              </h2>
              <button className="font-body hidden sm:inline-flex items-center text-sm font-medium text-[#706D66] border border-[#E0DDD5] px-5 py-2.5 hover:border-[#1A3828] hover:text-[#1A3828] transition-all duration-200 whitespace-nowrap">
                Write a review
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white border border-[#E0DDD5] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#1A3828] flex items-center justify-center flex-shrink-0">
                        <span className="font-body text-white text-xs font-semibold">{t.initials}</span>
                      </div>
                      <div>
                        <div className="font-body font-semibold text-[#1A1A12] text-sm">{t.author}</div>
                        <div className="font-body text-[#A09B93] text-xs">{t.timeAgo}</div>
                      </div>
                    </div>
                    <StarRating rating={5} />
                  </div>
                  <p className="font-body text-[#706D66] text-sm leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16 sm:mt-20 pt-16 border-t border-[#E0DDD5]">
              <div className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-[#A09B93] mb-4">
                You Might Also Like
              </div>
              <h2 className="font-body font-bold text-[#1A1A12] text-2xl sm:text-3xl mb-8">
                Pair it with these.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="group border border-[#E0DDD5] hover:border-[#1A3828]/25 bg-white transition-all duration-200"
                  >
                    <div className="relative overflow-hidden bg-[#111111]" style={{ height: 140 }}>
                      {p.images[0] ? (
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          className="object-contain p-4"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4 border-t border-[#E0DDD5]">
                      <div className="font-body font-semibold text-[#1A1A12] text-sm mb-2 leading-snug">{p.name}</div>
                      <div className="flex items-center justify-between">
                        <span className="font-body font-bold text-[#1A1A12] text-base">₦{p.price.toLocaleString()}</span>
                        <span className="font-body text-xs font-semibold text-white bg-[#1A3828] group-hover:bg-[#24503A] transition-colors px-3 py-1.5">Buy</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
