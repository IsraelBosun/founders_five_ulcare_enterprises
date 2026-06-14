import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { products, WHATSAPP } from "../data/site";

export const metadata = {
  title: "Shop — Ulcare Enterprise",
  description: "Professional branding services and instant-download business tools from Ulcare Enterprise.",
};


export default function ProductsPage() {
  const services = products.filter((p) => p.type === "service");
  const downloads = products.filter((p) => p.type === "download");

  const customLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    "Hi Ulcare! I have a custom project request I'd like to discuss. Can we talk?"
  )}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F5F0]">
        {/* Page header */}
        <div className="bg-[#1A3828] pt-32 pb-20 sm:pt-36 sm:pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-[#4A7A60] mb-6">
              The Asset Vault
            </div>
            <h1 className="font-body font-extrabold text-white text-5xl sm:text-6xl leading-tight mb-4 max-w-2xl">
              Buy. Download. Done.
            </h1>
            <p className="font-body text-[#7AAF95] text-base leading-relaxed max-w-md">
              Premium templates and services — ready to use in under 60 seconds.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-20 space-y-20">

          {/* Services */}
          <div>
            <div className="mb-10 pb-6 border-b border-[#E0DDD5] flex items-end justify-between gap-4">
              <div>
                <div className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-[#A09B93] mb-3">
                  Custom Services
                </div>
                <h2 className="font-body font-bold text-[#1A1A12] text-3xl sm:text-4xl">
                  We design it for you.
                </h2>
              </div>
              <p className="font-body text-sm text-[#A09B93] hidden sm:block max-w-xs text-right leading-relaxed">
                Delivered to your WhatsApp within 24–72 hours.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group border border-[#E0DDD5] hover:border-[#1A3828]/25 bg-white transition-all duration-200"
                >
                  <div className="relative overflow-hidden bg-[#111111]" style={{ height: 180 }}>
                    {product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-5"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                      </div>
                    )}
                    {product.badge && (
                      <div
                        className={`absolute top-3 right-3 font-body px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase ${
                          product.badgeColor === "amber"
                            ? "bg-[#F0B429] text-[#1A1A12]"
                            : "bg-[#1A3828] text-white"
                        }`}
                      >
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-5 border-t border-[#E0DDD5]">
                    <div className="font-body font-semibold text-[#1A1A12] text-sm mb-1 leading-snug">{product.name}</div>
                    <p className="font-body text-[#706D66] text-xs leading-relaxed mb-3">{product.shortDesc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-body font-bold text-[#1A1A12] text-base">₦{product.price.toLocaleString()}</span>
                      <span className="font-body text-xs font-semibold text-white bg-[#1A3828] group-hover:bg-[#24503A] transition-colors px-3 py-1.5">
                        Buy →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Downloads */}
          <div>
            <div className="mb-10 pb-6 border-b border-[#E0DDD5] flex items-end justify-between gap-4">
              <div>
                <div className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-[#A09B93] mb-3">
                  Instant Downloads
                </div>
                <h2 className="font-body font-bold text-[#1A1A12] text-3xl sm:text-4xl">
                  Buy once, use forever.
                </h2>
              </div>
              <p className="font-body text-sm text-[#A09B93] hidden sm:block max-w-xs text-right leading-relaxed">
                Delivered immediately after payment.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {downloads.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group border border-[#E0DDD5] hover:border-[#1A3828]/25 bg-white transition-all duration-200"
                >
                  <div className="relative overflow-hidden bg-[#111111]" style={{ height: 180 }}>
                    {product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-5"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 002 2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                      </div>
                    )}
                    {product.badge && (
                      <div className="absolute top-3 right-3 font-body px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase bg-[#1A3828] text-white">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-5 border-t border-[#E0DDD5]">
                    <div className="font-body font-semibold text-[#1A1A12] text-sm mb-1 leading-snug">{product.name}</div>
                    <p className="font-body text-[#706D66] text-xs leading-relaxed mb-3">{product.shortDesc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-body font-bold text-[#1A1A12] text-base">₦{product.price.toLocaleString()}</span>
                      <span className="font-body text-xs font-semibold text-white bg-[#1A3828] group-hover:bg-[#24503A] transition-colors px-3 py-1.5">
                        Buy →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Custom CTA */}
          <div className="bg-[#1A3828] p-10 sm:p-14">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div className="max-w-lg">
                <h3 className="font-body font-bold text-white text-2xl sm:text-3xl mb-3">
                  Need custom?
                </h3>
                <p className="font-body text-[#7AAF95] text-base leading-relaxed">
                  Tell us what you want. We&rsquo;ll build it — no jargon, just results.
                </p>
              </div>
              <a
                href={customLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body inline-flex items-center gap-2.5 bg-[#F0B429] text-[#1A1A12] font-semibold text-sm px-8 py-4 hover:bg-[#E0A61F] transition-colors duration-200 whitespace-nowrap"
              >
                Start a project
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
