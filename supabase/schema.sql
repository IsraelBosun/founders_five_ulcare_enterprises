-- ============================================================
-- Ulcare Enterprise — Supabase Schema
-- Run this entire file in the Supabase SQL Editor
-- ============================================================

-- Products
CREATE TABLE IF NOT EXISTS products (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  category      TEXT DEFAULT '',
  color         TEXT DEFAULT '#1A3828',
  price         INTEGER NOT NULL DEFAULT 0,
  original_price INTEGER,
  rating        DECIMAL(3,1) DEFAULT 5.0,
  review_count  INTEGER DEFAULT 0,
  badge         TEXT,
  badge_color   TEXT,
  short_desc    TEXT DEFAULT '',
  description   TEXT DEFAULT '',
  details       JSONB DEFAULT '[]',
  whats_inside  JSONB DEFAULT '[]',
  packages      JSONB DEFAULT '[]',
  steps         JSONB DEFAULT '[]',
  images        JSONB DEFAULT '[]',
  type          TEXT DEFAULT 'service',
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio items
CREATE TABLE IF NOT EXISTS portfolio_items (
  id         BIGSERIAL PRIMARY KEY,
  image      TEXT DEFAULT '',
  title      TEXT NOT NULL,
  category   TEXT DEFAULT '',
  color      TEXT DEFAULT '#1A3828',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id         BIGSERIAL PRIMARY KEY,
  text       TEXT NOT NULL,
  short_text TEXT DEFAULT '',
  author     TEXT NOT NULL,
  initials   TEXT DEFAULT '',
  role       TEXT DEFAULT '',
  time_ago   TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site settings (key/value store)
CREATE TABLE IF NOT EXISTS site_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE products       ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials    ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings   ENABLE ROW LEVEL SECURITY;

-- Public can read everything
CREATE POLICY "Public read products"       ON products       FOR SELECT USING (true);
CREATE POLICY "Public read portfolio"      ON portfolio_items FOR SELECT USING (true);
CREATE POLICY "Public read testimonials"   ON testimonials    FOR SELECT USING (true);
CREATE POLICY "Public read site_settings"  ON site_settings   FOR SELECT USING (true);

-- Authenticated users (admin) can write
CREATE POLICY "Auth write products"       ON products       FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write portfolio"      ON portfolio_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write testimonials"   ON testimonials    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write site_settings"  ON site_settings   FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- Storage bucket for uploaded images
-- Run separately in Storage → New bucket → "ulcare-images" → Public
-- Or uncomment these if you have storage permissions in SQL:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('ulcare-images', 'ulcare-images', true) ON CONFLICT DO NOTHING;
-- CREATE POLICY "Public read images"  ON storage.objects FOR SELECT USING (bucket_id = 'ulcare-images');
-- CREATE POLICY "Auth upload images"  ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'ulcare-images');
-- CREATE POLICY "Auth delete images"  ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'ulcare-images');
-- ============================================================

-- ============================================================
-- Seed data — current site content
-- ============================================================

INSERT INTO site_settings (key, value) VALUES
  ('whatsapp', '2348165078755'),
  ('email',    'ulcare.enterprise@gmail.com'),
  ('address',  'Shop 4, Power Encounter Junction, East/West Road, Rumuodara, Port-Harcourt, Rivers State.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO products (name, category, color, price, original_price, rating, review_count, badge, badge_color, short_desc, description, details, whats_inside, packages, steps, images, type, sort_order) VALUES
(
  'Premium Logo & Business Branding Kit', 'Branding', '#1A3828', 20000, 30000, 4.9, 47, 'Bestseller', 'amber',
  'Logo, business cards, letterhead — built to look elite and trustworthy.',
  'Get a world-class visual identity for your business. A professional logo, high-impact business cards, and official letterhead — designed to make your brand look elite and completely trustworthy to your clients.',
  '["Custom logo design (up to 3 unique concepts)","Business card design (front & back, print-ready)","Company letterhead (A4 — print & digital)","Professional email signature","Brand colour palette & typography guide","High-resolution exports: PNG, PDF, SVG, JPG","Unlimited revisions until you''re 100% satisfied","Delivered to your WhatsApp within 48–72 hours"]',
  '[{"title":"Custom logo design","desc":"3 concepts, your favourite refined to perfection."},{"title":"Business cards","desc":"Front and back designs, print-ready files."},{"title":"Letterhead","desc":"Official document template for proposals."},{"title":"Brand colours & fonts","desc":"A simple guide so your brand stays consistent."},{"title":"Social media kit","desc":"WhatsApp DP, IG covers, and post templates."},{"title":"All editable files","desc":"PNG, JPG, PDF and source files included."}]',
  '[{"name":"Standard","description":"Logo + 1 revision","price":20000},{"name":"Premium","description":"Logo + cards + unlimited","price":35000}]',
  '[{"n":"01","title":"Pay securely","desc":"Card, bank transfer, or USSD."},{"n":"02","title":"Share your brief","desc":"Quick form. No jargon, plain English."},{"n":"03","title":"We design","desc":"Concepts ready in 48 hours."},{"n":"04","title":"Receive files","desc":"All assets sent via WhatsApp & email."}]',
  '["/products/product_1_1.jpg","/products/product_1_2.jpg","/products/product_1_3.png"]',
  'service', 1
),
(
  'CV & Profile Package', 'CV & Profile', '#EDE9E0', 15000, NULL, 4.8, 23, NULL, NULL,
  'Precision-engineered CV remodeling and cover letter for industry leaders.',
  'Your CV is your first impression — and it either opens doors or gets ignored. We rebuild your CV from scratch, crafting a document that positions you as the top candidate in any room. Optimised for both human recruiters and ATS screening systems.',
  '["Complete CV redesign & content rewrite","Tailored cover letter (industry-specific)","LinkedIn profile optimisation tips","ATS-friendly format (passes screening software)","Modern, recruiter-approved layout","PDF & Word formats included","1 round of revisions included","Delivered within 24–48 hours"]',
  '[{"title":"Complete CV redesign","desc":"Rebuilt from scratch, tailored to your industry."},{"title":"Cover letter","desc":"Crafted to position you as the top candidate."},{"title":"ATS optimisation","desc":"Passes screening software every time."},{"title":"LinkedIn tips","desc":"Make your profile impossible to ignore."},{"title":"PDF & Word formats","desc":"Two formats ready for any application."},{"title":"1 revision round","desc":"We fine-tune until you''re fully satisfied."}]',
  'null',
  '[{"n":"01","title":"Pay securely","desc":"Card, bank transfer, or USSD."},{"n":"02","title":"Share your brief","desc":"Quick form. No jargon, plain English."},{"n":"03","title":"We design","desc":"Your new CV ready in 24–48 hours."},{"n":"04","title":"Receive files","desc":"PDF & Word delivered via WhatsApp & email."}]',
  '["/products/product_2_1.jpg","/products/product_2_2.jpg","/products/product_2_3.jpg"]',
  'service', 2
),
(
  'Business Flyer Design', 'Flyers', '#F0B429', 10000, NULL, 4.7, 31, NULL, NULL,
  'Sharp promotional designs that turn viewers into customers.',
  'In a world of endless scrolling, your flyer has 3 seconds to stop someone in their tracks. We design high-impact visuals that communicate your offer clearly, look stunning in print and online, and drive real action from real people.',
  '["Custom flyer design (A4 or A5 format)","Social media version (Instagram & WhatsApp optimised)","High-resolution print-ready files","Branded colours using your existing brand kit","Up to 2 design concepts to choose from","PNG, PDF & JPG exports","1 round of revisions","Delivered within 24 hours"]',
  '[{"title":"Custom flyer design","desc":"A4 or A5 format, built around your brand."},{"title":"Social media version","desc":"Instagram & WhatsApp optimised sizes."},{"title":"Print-ready files","desc":"High-resolution, ready for any print shop."},{"title":"Branded colours","desc":"Consistent with your existing brand kit."},{"title":"2 design concepts","desc":"Pick your favourite or combine elements."},{"title":"PNG, PDF & JPG","desc":"All formats included for every use case."}]',
  'null',
  '[{"n":"01","title":"Pay securely","desc":"Card, bank transfer, or USSD."},{"n":"02","title":"Share your brief","desc":"Tell us your offer and brand details."},{"n":"03","title":"We design","desc":"Your flyer ready in 24 hours."},{"n":"04","title":"Receive files","desc":"All formats sent via WhatsApp & email."}]',
  '["/products/product_3_1.jpg","/products/product_3_2.jpg","/products/product_3_3.jpg"]',
  'service', 3
),
(
  'Startup Vault', 'Templates', '#1A3828', 5000, NULL, 4.9, 58, 'Instant Download', 'green',
  'Invoices, receipts and admin forms ready in 60 seconds — no skills needed.',
  'Stop sending clients plain messages as invoices. This vault gives you polished, professional templates that make your business look established from day one. Fully editable in Microsoft Word or Google Docs — no design skills needed.',
  '["Professional invoice template (fully editable)","Payment receipt template","Business proposal template","Service agreement / contract template","Quotation & price list template","Works in Microsoft Word & Google Docs","Easy to customise with your logo & details","Instant delivery to your WhatsApp or email"]',
  '[{"title":"Invoice template","desc":"Professional, fully editable in Word or Google Docs."},{"title":"Payment receipt","desc":"Official-looking and client-ready."},{"title":"Business proposal","desc":"Structure that wins deals."},{"title":"Service agreement","desc":"Protect your work with a clear contract."},{"title":"Quotation template","desc":"Price list format that looks credible."},{"title":"Instant delivery","desc":"All files sent immediately after payment."}]',
  'null',
  '[{"n":"01","title":"Pay securely","desc":"Card, bank transfer, or USSD."},{"n":"02","title":"Instant delivery","desc":"Files sent to your WhatsApp or email immediately."},{"n":"03","title":"Fill your details","desc":"Add your business info using Word or Google Docs."},{"n":"04","title":"Done!","desc":"Your professional documents are ready to use."}]',
  '["/products/product_4_1.jpg","/products/product_4_2.jpg","/products/product_4_3.jpg"]',
  'download', 4
),
(
  'Ops Spreadsheet', 'Templates', '#EDE9E0', 7500, NULL, 4.6, 15, 'Instant Download', 'green',
  'Automated bookkeeping and sales tracking — no skills needed.',
  'Run your finances like a CFO without hiring one. This automated spreadsheet handles your bookkeeping, generates visual charts, and keeps you in full control of your business numbers — all without needing any accounting qualification. Built specifically for Nigerian SMEs.',
  '["Automated income & expense tracker","Sales pipeline dashboard","Visual charts & monthly reports (auto-generated)","Inventory tracking sheet","Profit & loss summary (updates automatically)","Compatible with Microsoft Excel & Google Sheets","Step-by-step setup guide included","Instant delivery — download immediately after payment"]',
  '[{"title":"Income & expense tracker","desc":"Automated calculations — no manual math."},{"title":"Sales pipeline dashboard","desc":"See your deals at a glance."},{"title":"Visual charts","desc":"Monthly reports generated automatically."},{"title":"Inventory tracking","desc":"Know your stock without spreadsheet skills."},{"title":"P&L summary","desc":"Profit and loss updated live as you enter data."},{"title":"Setup guide","desc":"Step-by-step instructions included."}]',
  'null',
  '[{"n":"01","title":"Pay securely","desc":"Card, bank transfer, or USSD."},{"n":"02","title":"Instant delivery","desc":"Files sent to your WhatsApp or email immediately."},{"n":"03","title":"Open and fill","desc":"Works in Microsoft Excel or Google Sheets."},{"n":"04","title":"Done!","desc":"Your business finances are now organised."}]',
  '[]',
  'download', 5
);

INSERT INTO portfolio_items (image, title, category, color, sort_order) VALUES
  ('/portfolio/photo_1.jpg', 'Corporate Letterhead',    'Document Design',   '#1A3828', 1),
  ('/portfolio/photo_2.jpg', 'Brand Identity System',   'Logo Design',       '#EDE9E0', 2),
  ('/portfolio/photo_3.jpg', 'Business Branding',       'Corporate Branding','#F0B429', 3),
  ('/portfolio/photo_4.jpg', 'Event Promotional Flyer', 'Flyer Design',      '#1A3828', 4);

INSERT INTO testimonials (text, short_text, author, initials, role, time_ago, sort_order) VALUES
  (
    'Absolutely loved the result. The logo looks expensive and my business cards turned heads at my last meeting.',
    'Absolutely loved the result.',
    'Asunmo E.', 'AE', 'Business Owner', '2 weeks ago', 1
  ),
  (
    'Delivered on time and exceeded my expectations. Communication was easy on WhatsApp, no confusing back-and-forth.',
    'Delivered on time and exceeded my expectations.',
    'Ogbonnaya S.', 'OS', 'Corporate Professional', '1 month ago', 2
  );
