import Link from "next/link";
import Image from "next/image";
import { siteContact, WHATSAPP } from "../data/site";

const shopLinks = [
  { label: "Branding Kit", href: "/products/1" },
  { label: "CV Package", href: "/products/2" },
  { label: "Flyers", href: "/products/3" },
  { label: "Templates", href: "/products/4" },
];

const companyLinks = [
  { label: "About", href: "/contact" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F2219] border-t border-[#1A3828]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/ulcare_logo.png"
                alt="Ulcare Enterprise"
                width={160}
                height={58}
                className="h-12 w-auto block brightness-0 invert"
              />
            </Link>
            <p className="font-body text-[#4A7A60] text-sm leading-relaxed max-w-[220px]">
              Elite branding and corporate documentation, made simple.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-body text-white text-[10px] font-semibold uppercase tracking-[0.22em]">
              Shop
            </h4>
            <div className="space-y-2.5">
              {shopLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body block text-[#4A7A60] hover:text-white text-sm transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-body text-white text-[10px] font-semibold uppercase tracking-[0.22em]">
              Company
            </h4>
            <div className="space-y-2.5">
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body block text-[#4A7A60] hover:text-white text-sm transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Follow */}
          <div className="space-y-4">
            <h4 className="font-body text-white text-[10px] font-semibold uppercase tracking-[0.22em]">
              Follow
            </h4>
            <div className="space-y-2.5">
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body block text-[#4A7A60] hover:text-[#22C55E] text-sm transition-colors duration-200"
              >
                WhatsApp
              </a>

              <a
                href={`mailto:${siteContact.email}`}
                className="font-body block text-[#4A7A60] hover:text-white text-sm transition-colors duration-200"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1A3828] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-body text-[#2D5240] text-xs">
            © {new Date().getFullYear()} Ulcare Enterprise. All rights reserved.
          </p>
          <p className="font-body text-[#2D5240] text-xs">
            {siteContact.address}
          </p>
          <p className="font-body text-[#2D5240] text-xs">
            Built by{" "}
            <a
              href="http://bluehydralabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              BLUEHYDRA
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
