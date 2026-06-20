# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build (run to check for errors before committing)
npm run start    # serve the production build locally
```

No linter or test runner is configured.

## Stack

- **Next.js 16** (App Router, no Pages Router)
- **React 19**
- **Tailwind CSS v4** — config-less, uses `@theme` in `globals.css` instead of `tailwind.config.js`
- **Supabase** — PostgreSQL DB, Auth (email/password), Storage (`ulcare-images` bucket)
- **Vercel Analytics** — `<Analytics />` in root layout

## Architecture

### Data layer
All site content is stored in **Supabase** and fetched at request time. `app/data/site.js` is legacy — do not edit it. Use `app/data/db.js` instead, which exports:
- `getProducts()`, `getProduct(id)`, `getPortfolio()`, `getTestimonials()`, `getSiteSettings()`, `getWhatsApp()`

All public pages use `export const dynamic = "force-dynamic"` so changes in the DB appear immediately without a redeploy.

### Routing
```
/              → app/page.js                          (home)
/products      → app/products/page.js                 (listing)
/products/[id] → app/products/[id]/page.js            (detail, no generateStaticParams)
/portfolio     → app/portfolio/page.js
/contact       → app/contact/page.js
/admin         → app/admin/page.js                    (login)
/admin/dashboard         → app/admin/dashboard/page.js
/admin/dashboard/products        → product list/add/edit
/admin/dashboard/portfolio       → portfolio manage
/admin/dashboard/testimonials    → testimonials manage
/admin/dashboard/settings        → WhatsApp, email, address
```

### Admin panel
- Protected by `proxy.js` (Next.js 16 middleware — export must be named `proxy`, not `middleware`)
- Login via Supabase Auth (email/password); create the admin user in Supabase dashboard
- Server actions live in `app/admin/actions/` (products, portfolio, testimonials, settings, auth)
- `DeleteButton.jsx` always shows a confirm dialog before deleting
- `ImageUpload.jsx` uploads to Supabase Storage bucket `ulcare-images` (must be public)
- Admin sidebar is responsive: fixed left drawer on desktop, top header + bottom tab bar on mobile

### Server vs client components
Most pages are server components. Client components (`"use client"`) are isolated to:
- `Navbar.jsx` — scroll state, mobile drawer open/close, body scroll lock
- `ProductPurchase.jsx` — package selector on product detail page
- `ProductGallery.jsx` — swipeable image gallery (touch events, IntersectionObserver)
- `Reveal.jsx` — scroll-triggered fade-up animations via IntersectionObserver
- `Hero.jsx`, `Testimonials.jsx` — minor interactivity

### Styling conventions
- `font-body` (`Inter`) is used for almost everything — apply it to every text element
- `font-display` (`Cormorant Garamond`) exists but is rarely used
- Brand colors are defined as CSS custom properties in `globals.css` under `@theme`, but throughout the codebase they are written as raw hex values (e.g. `#1A3828`, `#F0B429`) rather than as Tailwind tokens — keep this consistent
- Page backgrounds: `#F7F5F0` (cream canvas) for most pages, `#1A3828` (forest green) for dark sections, `#111111` for image display containers
- All custom animations (`animate-fade-up`, `animate-wa-pulse`, etc.) are defined in `globals.css` — add new ones there, not via Tailwind plugins

### Images
Product and portfolio images live in `public/products/` and `public/portfolio/`. All use `next/image` with `fill` + `object-contain p-5/p-6` on a `bg-[#111111]` container — this is the intentional "dark gallery" display treatment for flat design exports.

### WhatsApp-first purchase flow
There is no payment gateway or cart. Every "buy" action opens a WhatsApp pre-filled message. The `whatsappLink` on each product in `site.js` is the single source for this. The floating `WhatsAppButton` component appears on every page via individual page files (not the root layout).

### z-index layers
- `z-50` — fixed header/navbar
- `z-60` — mobile nav overlay (must stay above z-50 so the close button receives clicks)
- `z-50` — floating WhatsApp button
