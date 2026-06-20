# Ulcare Enterprise

Website for **Ulcare Enterprise** — a branding and corporate document business based in Port Harcourt, Nigeria. Built by [BLUEHYDRA](https://bluehydra.dev).

## Stack

- **Next.js 16** (App Router, server components)
- **React 19**
- **Tailwind CSS v4** (config-less, `@theme` in globals.css)
- **Supabase** — PostgreSQL database, Auth, and Storage
- **Vercel Analytics**

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in your Supabase credentials
cp .env.local.example .env.local

# 3. Start dev server
npm run dev        # http://localhost:3000

# 4. Build check
npm run build
```

## Supabase setup

1. Create a Supabase project
2. Run `supabase/schema.sql` in the SQL Editor — creates all tables and seeds the initial content
3. Create a public Storage bucket named **`ulcare-images`**
4. Add your admin user via **Authentication → Users** in the Supabase dashboard
5. Fill `.env.local` with your project URL and anon key

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Admin panel

Visit `/admin` to sign in. The dashboard lets the site owner manage all content without touching code.

| Route | Purpose |
|---|---|
| `/admin` | Login |
| `/admin/dashboard` | Overview — counts and quick links |
| `/admin/dashboard/products` | Add / edit / delete products |
| `/admin/dashboard/portfolio` | Add / edit / delete portfolio items |
| `/admin/dashboard/testimonials` | Add / edit / delete testimonials |
| `/admin/dashboard/settings` | WhatsApp number, email, address |

## Project structure

```
app/
  data/db.js              # All public data fetch functions (Supabase)
  admin/                  # Admin panel (auth-protected)
    actions/              # Server actions (CRUD + auth)
    components/           # Sidebar, ProductForm, ImageUpload, DeleteButton
    dashboard/            # Dashboard pages
  components/             # Public site components
  (pages)/                # Home, products, portfolio, contact
lib/supabase/
  client.js               # Browser Supabase client
  server.js               # Server Supabase client (cookie-based)
proxy.js                  # Route protection middleware (Next.js 16)
supabase/schema.sql       # DB schema + seed data
public/
  products/               # Product images (local)
  portfolio/              # Portfolio images (local)
```

## Deployment

Deploy to [Vercel](https://vercel.com). Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables in the Vercel project settings. Enable **Analytics** in the Vercel dashboard after first deploy.
