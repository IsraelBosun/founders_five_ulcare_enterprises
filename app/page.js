import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Reveal from "./components/Reveal";
import { getProducts, getPortfolio, getTestimonials, getPageContent } from "./data/db";

export const dynamic = "force-dynamic";

const WA_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Icons ordered by card position (index-based, not name-based)
const SERVICE_ICONS = [
  // Branding
  <svg key="branding" className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>,
  // CV & Profile
  <svg key="cv" className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>,
  // Flyers
  <svg key="flyers" className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>,
  // Templates
  <svg key="templates" className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
  </svg>,
];

function WhatWeDo({ content }) {
  const { label, title, subtitle, services } = content;
  return (
    <section className="bg-[#F7F5F0] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-[#A09B93] mb-4">
            {label}
          </div>
          <h2 className="font-body font-bold text-[#1A1A12] text-3xl sm:text-4xl mb-3">
            {title}
          </h2>
          <p className="font-body text-[#706D66] text-base mb-12">{subtitle}</p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {services.map((svc, i) => (
            <Reveal key={i} delay={i * 80}>
              <Link
                href="/products"
                className="group bg-white border border-[#E0DDD5] hover:border-[#1A3828]/30 p-5 transition-all duration-200 flex flex-col gap-4 h-full"
              >
                <div className="w-10 h-10 bg-[#1A3828] flex items-center justify-center rounded-sm group-hover:bg-[#24503A] transition-colors duration-200">
                  {SERVICE_ICONS[i]}
                </div>
                <div>
                  <div className="font-body font-semibold text-[#1A1A12] text-sm mb-1">{svc.name}</div>
                  <div className="font-body text-[#A09B93] text-xs">{svc.desc}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AssetVault({ products, whatsapp, content }) {
  const { label, title, subtitle, customTitle, customText, customWa } = content;
  const customLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(customWa)}`;

  return (
    <section className="bg-white py-20 sm:py-28 border-t border-[#E0DDD5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-[#A09B93] mb-4">
                {label}
              </div>
              <h2 className="font-body font-bold text-[#1A1A12] text-3xl sm:text-4xl mb-2">{title}</h2>
              <p className="font-body text-[#706D66] text-sm">{subtitle}</p>
            </div>
            <Link
              href="/products"
              className="font-body self-start sm:self-auto inline-flex items-center gap-2 text-sm font-medium text-[#706D66] border border-[#E0DDD5] px-5 py-2.5 hover:border-[#1A3828] hover:text-[#1A3828] transition-all duration-200"
            >
              View all
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 70}>
              <Link
                href={`/products/${product.id}`}
                className="group block border border-[#E0DDD5] hover:border-[#1A3828]/25 bg-white transition-all duration-200 h-full"
              >
                <div className="relative overflow-hidden bg-[#111111]" style={{ height: 160 }}>
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
                      <svg className="w-8 h-8 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
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
                <div className="p-4 border-t border-[#E0DDD5]">
                  <div className="font-body font-semibold text-[#1A1A12] text-sm mb-1 leading-snug">
                    {product.name}
                  </div>
                  <p className="font-body text-[#706D66] text-xs leading-relaxed mb-3">
                    {product.shortDesc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-body font-bold text-[#1A1A12] text-base">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <span className="font-body text-xs font-semibold text-white bg-[#1A3828] group-hover:bg-[#24503A] transition-colors px-3 py-1.5">
                      Buy
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}

          <Reveal delay={products.length * 70}>
            <a
              href={customLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-[#E0DDD5] hover:border-[#F0B429]/50 bg-[#F0B429]/8 transition-all duration-200 flex flex-col items-start justify-center p-8 gap-3 min-h-[220px] h-full"
            >
              <div className="font-body font-bold text-[#1A1A12] text-lg leading-snug">{customTitle}</div>
              <p className="font-body text-[#706D66] text-sm leading-relaxed">{customText}</p>
              <span className="font-body text-sm font-semibold text-[#1A3828] flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
                Start a project
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Portfolio({ portfolio, content }) {
  const { label, title } = content;
  return (
    <section className="bg-[#F7F5F0] py-20 sm:py-28 border-t border-[#E0DDD5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <div className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-[#A09B93] mb-4">
                {label}
              </div>
              <h2 className="font-body font-bold text-[#1A1A12] text-3xl sm:text-4xl">{title}</h2>
            </div>
            <Link
              href="/portfolio"
              className="font-body self-start sm:self-auto inline-flex items-center gap-2 text-sm font-medium text-[#706D66] border border-[#E0DDD5] px-5 py-2.5 hover:border-[#1A3828] hover:text-[#1A3828] transition-all duration-200"
            >
              See full portfolio
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>

        {portfolio.length >= 4 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
            <Reveal className="md:row-span-2 relative overflow-hidden bg-[#111111]" style={{ minHeight: 260 }}>
              <Image src={portfolio[0].image} alt={portfolio[0].title} fill className="object-contain p-5" sizes="(max-width: 768px) 50vw, 33vw" />
            </Reveal>
            <Reveal className="relative overflow-hidden bg-[#111111]" delay={80} style={{ minHeight: 180 }}>
              <Image src={portfolio[1].image} alt={portfolio[1].title} fill className="object-contain p-5" sizes="(max-width: 768px) 50vw, 33vw" />
            </Reveal>
            <Reveal className="relative overflow-hidden bg-[#111111]" delay={160} style={{ minHeight: 180 }}>
              <Image src={portfolio[3].image} alt={portfolio[3].title} fill className="object-contain p-5" sizes="(max-width: 768px) 50vw, 33vw" />
            </Reveal>
            <Reveal className="col-span-2 relative overflow-hidden bg-[#111111]" delay={120} style={{ minHeight: 200 }}>
              <Image src={portfolio[2].image} alt={portfolio[2].title} fill className="object-contain p-5" sizes="(max-width: 768px) 100vw, 66vw" />
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}

function CustomCTA({ whatsapp, email, content }) {
  const { title, text, waMessage } = content;
  const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(waMessage)}`;

  return (
    <section className="bg-[#1A3828] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="font-body font-bold text-white text-3xl sm:text-4xl mb-4">{title}</h2>
            <p className="font-body text-[#7AAF95] text-base leading-relaxed">{text}</p>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body inline-flex items-center justify-center gap-2.5 bg-[#22C55E] text-white font-semibold text-sm px-7 py-3.5 hover:bg-[#16A34A] transition-colors duration-200"
              >
                {WA_ICON}
                Chat on WhatsApp
              </a>
              <a
                href={`mailto:${email}`}
                className="font-body inline-flex items-center justify-center gap-2 border border-white/20 text-white font-medium text-sm px-7 py-3.5 hover:bg-white/5 hover:border-white/35 transition-all duration-200"
              >
                Send email
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const [products, portfolio, testimonials, content] = await Promise.all([
    getProducts(),
    getPortfolio(),
    getTestimonials(),
    getPageContent(),
  ]);

  return (
    <>
      <Navbar dark />
      <main>
        <Hero whatsapp={content.whatsapp} content={content.hero} />
        <WhatWeDo content={content.whatWeDo} />
        <AssetVault products={products} whatsapp={content.whatsapp} content={content.vault} />
        <Portfolio portfolio={portfolio} content={content.homePortfolio} />
        <Testimonials testimonials={testimonials} />
        <CustomCTA whatsapp={content.whatsapp} email={content.email} content={content.cta} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
