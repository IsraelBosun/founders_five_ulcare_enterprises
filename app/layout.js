import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Ulcare Enterprise — Brand Identity & Corporate Documents",
  description:
    "Professional logo design, CV writing, business flyers, and corporate document templates for businesses across Nigeria.",
  keywords:
    "logo design Nigeria, business branding Port Harcourt, CV writing, corporate documents, business templates, graphic design Nigeria",
  openGraph: {
    title: "Ulcare Enterprise — Brand Identity & Corporate Documents",
    description:
      "Professional brand identity and corporate documents for Nigerian businesses.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
