import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { getPortfolio, getWhatsApp } from "../data/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Work — Ulcare Enterprise",
  description: "Selected work — brand identity, corporate documents, and design systems for Nigerian businesses.",
};

export default async function PortfolioPage() {
  const [portfolio, whatsapp] = await Promise.all([getPortfolio(), getWhatsApp()]);

  const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi Ulcare! I saw your portfolio and I'd like to commission something similar. Can we discuss?"
  )}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F5F0]">
        <div className="bg-[#1A3828] pt-32 pb-20 sm:pt-36 sm:pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-[#4A7A60] mb-6">
              Portfolio
            </div>
            <h1 className="font-body font-extrabold text-white text-5xl sm:text-6xl leading-tight max-w-2xl mb-4">
              A look at our work.
            </h1>
            <p className="font-body text-[#7AAF95] text-base leading-relaxed max-w-md">
              Every piece is built with precision — professional quality that makes
              your business look exactly as serious as it is.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {portfolio.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden group cursor-pointer bg-[#111111]"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-5"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#1A3828]/0 group-hover:bg-[#1A3828]/60 transition-all duration-300 flex flex-col justify-end p-7 opacity-0 group-hover:opacity-100">
                  <span className="font-body text-[#F0B429] text-[10px] font-medium uppercase tracking-[0.18em] mb-2">
                    {item.category}
                  </span>
                  <span className="font-body text-white font-medium text-base">{item.title}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A3828]/70 to-transparent p-5 sm:hidden">
                  <span className="font-body text-[#F0B429] text-[10px] font-medium uppercase tracking-[0.15em] block mb-1">
                    {item.category}
                  </span>
                  <span className="font-body text-white font-medium text-sm">{item.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 sm:mt-24 bg-[#1A3828] p-12 sm:p-16">
            <div className="max-w-lg">
              <div className="font-body text-[11px] font-medium tracking-[0.22em] uppercase text-[#4A7A60] mb-6">
                Commission Work
              </div>
              <h2 className="font-body font-bold text-white text-3xl sm:text-4xl mb-4">
                Want something like this?
              </h2>
              <p className="font-body text-[#7AAF95] text-base leading-relaxed mb-10">
                Tell us what you need and we&rsquo;ll get back to you within
                minutes on WhatsApp. No long forms, no waiting.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body inline-flex items-center gap-2.5 bg-[#F0B429] text-[#1A1A12] font-semibold text-sm px-8 py-4 hover:bg-[#E0A61F] transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Start on WhatsApp
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
