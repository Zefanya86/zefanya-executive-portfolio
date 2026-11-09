-- ==============================================================================
-- ZEFANYA ZULIAN — LUXURY EXECUTIVE PERSONAL BRANDING PLATFORM
-- PRODUCTION-GRADE POSTGRESQL / SUPABASE DATABASE ARCHITECTURE
-- Migration: 20261108_comprehensive_schema.sql
-- Covers all 30 relational tables, RLS security policies, indexes & CV seed data
-- ==============================================================================

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL DEFAULT 'Zefanya Zulian',
  monogram TEXT NOT NULL DEFAULT 'ZZ',
  portrait_url TEXT NOT NULL DEFAULT '/zefanya-portrait.jpg',
  focal_point TEXT DEFAULT '50% 30%',
  email TEXT NOT NULL DEFAULT 'Zefanya.zuliann@gmail.com',
  phone TEXT NOT NULL DEFAULT '(+62) 896 8185 2453',
  whatsapp TEXT NOT NULL DEFAULT '6289681852453',
  linkedin_url TEXT DEFAULT 'https://www.linkedin.com/in/zefanya-zulian',
  years_experience TEXT DEFAULT '5+ Years',
  public_email_visible BOOLEAN DEFAULT TRUE,
  public_phone_visible BOOLEAN DEFAULT TRUE,
  public_whatsapp_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USER_ROLES
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'super_admin', 'admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- 3. SITE_SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'current',
  brand_positioning TEXT NOT NULL DEFAULT 'THE MODERN BUSINESS LEADER',
  primary_color TEXT NOT NULL DEFAULT '#0B0B0C',
  secondary_color TEXT NOT NULL DEFAULT '#18181B',
  accent_gold TEXT NOT NULL DEFAULT '#C5A477',
  warm_ivory TEXT NOT NULL DEFAULT '#F4F0E8',
  soft_gray TEXT NOT NULL DEFAULT '#A5A5A5',
  theme_mode TEXT NOT NULL DEFAULT 'dark' CHECK (theme_mode IN ('dark', 'light', 'auto')),
  typography_preset TEXT NOT NULL DEFAULT 'editorial_serif',
  maintenance_mode BOOLEAN DEFAULT FALSE,
  analytics_id TEXT DEFAULT NULL,
  default_locale TEXT DEFAULT 'id' CHECK (default_locale IN ('id', 'en', 'zh')),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PAGES
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  page_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PAGE_TRANSLATIONS
CREATE TABLE IF NOT EXISTS public.page_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('id', 'en', 'zh')),
  title TEXT NOT NULL,
  subtitle TEXT,
  meta_title TEXT,
  meta_description TEXT,
  translation_status TEXT DEFAULT 'published' CHECK (translation_status IN ('not_translated', 'draft', 'in_review', 'approved', 'published')),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_id, locale)
);

-- 6. PAGE_SECTIONS
CREATE TABLE IF NOT EXISTS public.page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  section_type TEXT NOT NULL,
  section_order INT DEFAULT 0,
  is_enabled BOOLEAN DEFAULT TRUE,
  background_preset TEXT DEFAULT 'obsidian',
  custom_config JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SECTION_TRANSLATIONS
CREATE TABLE IF NOT EXISTS public.section_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES public.page_sections(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('id', 'en', 'zh')),
  headline TEXT,
  subheadline TEXT,
  body_text TEXT,
  cta_text TEXT,
  UNIQUE(section_id, locale)
);

-- 8. EXPERIENCES
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT NOT NULL,
  cover_image TEXT,
  layout_style TEXT DEFAULT 'editorial-split',
  featured BOOLEAN DEFAULT TRUE,
  is_published BOOLEAN DEFAULT TRUE,
  experience_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. EXPERIENCE_TRANSLATIONS
CREATE TABLE IF NOT EXISTS public.experience_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID REFERENCES public.experiences(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('id', 'en', 'zh')),
  role TEXT NOT NULL,
  project_context TEXT,
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  translation_status TEXT DEFAULT 'published',
  UNIQUE(experience_id, locale)
);

-- 10. PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  period TEXT NOT NULL,
  category TEXT DEFAULT 'mineral',
  cover_image TEXT NOT NULL,
  featured BOOLEAN DEFAULT TRUE,
  is_published BOOLEAN DEFAULT TRUE,
  project_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. PROJECT_TRANSLATIONS
CREATE TABLE IF NOT EXISTS public.project_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('id', 'en', 'zh')),
  title TEXT NOT NULL,
  role TEXT NOT NULL,
  scope TEXT[] DEFAULT '{}',
  challenges TEXT[] DEFAULT '{}',
  approach TEXT[] DEFAULT '{}',
  execution TEXT[] DEFAULT '{}',
  outcomes TEXT[] DEFAULT '{}',
  UNIQUE(project_id, locale)
);

-- 12. GALLERY_ALBUMS
CREATE TABLE IF NOT EXISTS public.gallery_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  cover_image TEXT NOT NULL,
  date_label TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('corporate', 'operations', 'procurement', 'infrastructure', 'leadership', 'government', 'events', 'achievements', 'networking')),
  company_or_project TEXT,
  privacy_status TEXT DEFAULT 'featured' CHECK (privacy_status IN ('public', 'private', 'unlisted', 'archived', 'featured')),
  album_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. ALBUM_TRANSLATIONS
CREATE TABLE IF NOT EXISTS public.album_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('id', 'en', 'zh')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  UNIQUE(album_id, locale)
);

-- 14. GALLERY_ITEMS
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  focal_point TEXT DEFAULT '50% 50%',
  item_order INT DEFAULT 0,
  is_private BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. MEDIA_ASSETS
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size INT NOT NULL,
  width INT,
  height INT,
  focal_point TEXT DEFAULT '50% 50%',
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. SKILLS
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id TEXT NOT NULL,
  skill_name_id TEXT NOT NULL,
  skill_name_en TEXT NOT NULL,
  skill_name_zh TEXT NOT NULL,
  description_id TEXT,
  description_en TEXT,
  description_zh TEXT,
  icon_name TEXT,
  skill_order INT DEFAULT 0
);

-- 17. SKILL_CATEGORIES
CREATE TABLE IF NOT EXISTS public.skill_categories (
  id TEXT PRIMARY KEY,
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_zh TEXT NOT NULL,
  category_order INT DEFAULT 0
);

-- 18. EDUCATION
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution TEXT NOT NULL,
  degree_id TEXT NOT NULL,
  degree_en TEXT NOT NULL,
  degree_zh TEXT NOT NULL,
  graduation_year TEXT NOT NULL,
  gpa TEXT NOT NULL,
  distinction_id TEXT NOT NULL,
  distinction_en TEXT NOT NULL,
  distinction_zh TEXT NOT NULL,
  edu_order INT DEFAULT 0
);

-- 19. CERTIFICATIONS
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_zh TEXT NOT NULL,
  issuer TEXT NOT NULL,
  cert_year TEXT NOT NULL,
  credential_url TEXT,
  document_url TEXT,
  cert_order INT DEFAULT 0
);

-- 20. ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_id TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  achievement_year TEXT NOT NULL,
  description_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_zh TEXT NOT NULL,
  metric TEXT,
  metric_label_id TEXT,
  metric_label_en TEXT,
  metric_label_zh TEXT,
  achievement_order INT DEFAULT 0
);

-- 21. TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  organization TEXT NOT NULL,
  author_role_id TEXT NOT NULL,
  author_role_en TEXT NOT NULL,
  author_role_zh TEXT NOT NULL,
  avatar_url TEXT,
  content_id TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_zh TEXT NOT NULL,
  relationship TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT TRUE,
  testimonial_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. JOURNAL_ARTICLES
CREATE TABLE IF NOT EXISTS public.journal_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  author TEXT NOT NULL DEFAULT 'Zefanya Zulian',
  cover_image TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('business', 'operations', 'leadership', 'procurement', 'logistics', 'development', 'insights')),
  read_time TEXT DEFAULT '4 min read',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT TRUE,
  article_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 23. JOURNAL_TRANSLATIONS
CREATE TABLE IF NOT EXISTS public.journal_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES public.journal_articles(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('id', 'en', 'zh')),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  UNIQUE(article_id, locale)
);

-- 24. NAVIGATION_ITEMS
CREATE TABLE IF NOT EXISTS public.navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_path TEXT NOT NULL,
  nav_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- 25. NAVIGATION_TRANSLATIONS
CREATE TABLE IF NOT EXISTS public.navigation_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nav_id UUID REFERENCES public.navigation_items(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('id', 'en', 'zh')),
  label TEXT NOT NULL,
  UNIQUE(nav_id, locale)
);

-- 26. DOWNLOADABLE_DOCUMENTS
CREATE TABLE IF NOT EXISTS public.downloadable_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('cv', 'certificate', 'portfolio', 'case_study')),
  doc_language TEXT NOT NULL CHECK (doc_language IN ('id', 'en', 'zh', 'multi')),
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size TEXT NOT NULL,
  format TEXT DEFAULT 'PDF',
  is_public BOOLEAN DEFAULT TRUE,
  downloads_count INT DEFAULT 0,
  doc_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 27. DOCUMENT_TRANSLATIONS
CREATE TABLE IF NOT EXISTS public.document_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES public.downloadable_documents(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('id', 'en', 'zh')),
  title TEXT NOT NULL,
  description TEXT,
  UNIQUE(document_id, locale)
);

-- 28. CONTACT_SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  category TEXT NOT NULL CHECK (category IN ('career', 'partnership', 'collaboration', 'project', 'general')),
  message TEXT NOT NULL,
  received_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  admin_notes TEXT
);

-- 29. SEO_METADATA
CREATE TABLE IF NOT EXISTS public.seo_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('id', 'en', 'zh')),
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  canonical_url TEXT,
  og_image_url TEXT,
  UNIQUE(page_slug, locale)
);

-- 30. ACTIVITY_LOGS
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  user_email TEXT NOT NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  details TEXT NOT NULL
);

-- ==============================================================================
-- INDEXES & PERFORMANCE OPTIMIZATIONS
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_exp_translations_lookup ON public.experience_translations(experience_id, locale);
CREATE INDEX IF NOT EXISTS idx_proj_translations_lookup ON public.project_translations(project_id, locale);
CREATE INDEX IF NOT EXISTS idx_album_translations_lookup ON public.album_translations(album_id, locale);
CREATE INDEX IF NOT EXISTS idx_journal_translations_lookup ON public.journal_translations(article_id, locale);
CREATE INDEX IF NOT EXISTS idx_contact_status ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_activity_timestamp ON public.activity_logs(timestamp DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.album_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloadable_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Public READ for Published Content
CREATE POLICY "Public read published profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read pages" ON public.pages FOR SELECT USING (is_published = true);
CREATE POLICY "Public read page_translations" ON public.page_translations FOR SELECT USING (true);
CREATE POLICY "Public read page_sections" ON public.page_sections FOR SELECT USING (is_enabled = true);
CREATE POLICY "Public read section_translations" ON public.section_translations FOR SELECT USING (true);
CREATE POLICY "Public read experiences" ON public.experiences FOR SELECT USING (is_published = true);
CREATE POLICY "Public read experience_translations" ON public.experience_translations FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public read project_translations" ON public.project_translations FOR SELECT USING (true);
CREATE POLICY "Public read gallery_albums" ON public.gallery_albums FOR SELECT USING (privacy_status IN ('public', 'featured'));
CREATE POLICY "Public read album_translations" ON public.album_translations FOR SELECT USING (true);
CREATE POLICY "Public read gallery_items" ON public.gallery_items FOR SELECT USING (is_private = false);
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public read education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public read certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Public read achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Public read journal_articles" ON public.journal_articles FOR SELECT USING (is_published = true);
CREATE POLICY "Public read journal_translations" ON public.journal_translations FOR SELECT USING (true);
CREATE POLICY "Public read downloadable_documents" ON public.downloadable_documents FOR SELECT USING (is_public = true);
CREATE POLICY "Public read document_translations" ON public.document_translations FOR SELECT USING (true);

-- Public Contact Form Insert
CREATE POLICY "Public insert contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Authenticated Admin Full Access Policies
CREATE POLICY "Admin full access profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access site_settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access pages" ON public.pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access experiences" ON public.experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access gallery" ON public.gallery_albums FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access journal" ON public.journal_articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access documents" ON public.downloadable_documents FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin view contact submissions" ON public.contact_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin view activity logs" ON public.activity_logs FOR ALL USING (auth.role() = 'authenticated');
