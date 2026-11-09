import fs from 'fs';
import path from 'path';
import { PortfolioData } from '@/types/portfolio';
import { initialPortfolioData } from '@/data/initialData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'portfolio.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Deep merge fallback utility to ensure all newly required fields,
 * trilingual translations, modules, and schema keys are guaranteed to exist.
 */
function mergeWithDefaults(saved: Partial<PortfolioData>, defaults: PortfolioData): PortfolioData {
  return {
    ...defaults,
    ...saved,
    hero: { ...defaults.hero, ...(saved.hero || {}) },
    profile: { ...defaults.profile, ...(saved.profile || {}) },
    experiences: (saved.experiences && saved.experiences.length > 0) ? saved.experiences : defaults.experiences,
    projects: (saved.projects && saved.projects.length > 0) ? saved.projects : defaults.projects,
    leadership: (saved.leadership && saved.leadership.length > 0) ? saved.leadership : defaults.leadership,
    competencies: (saved.competencies && saved.competencies.length > 0) ? saved.competencies : defaults.competencies,
    education: (saved.education && saved.education.length > 0) ? saved.education : defaults.education,
    certifications: (saved.certifications && saved.certifications.length > 0) ? saved.certifications : defaults.certifications,
    achievements: (saved.achievements && saved.achievements.length > 0) ? saved.achievements : defaults.achievements,
    tools: (saved.tools && saved.tools.length > 0) ? saved.tools : defaults.tools,
    languages: (saved.languages && saved.languages.length > 0) ? saved.languages : defaults.languages,
    gallery: (saved.gallery && saved.gallery.length > 0) ? saved.gallery : defaults.gallery,
    journal: (saved.journal && saved.journal.length > 0) ? saved.journal : defaults.journal,
    documents: (saved.documents && saved.documents.length > 0) ? saved.documents : defaults.documents,
    testimonials: (saved.testimonials && saved.testimonials.length > 0) ? saved.testimonials : defaults.testimonials,
    sections: (saved.sections && saved.sections.length > 0) ? saved.sections : defaults.sections,
    inquiries: saved.inquiries || defaults.inquiries || [],
    activityLogs: saved.activityLogs || defaults.activityLogs || [],
    contact: { ...defaults.contact, ...(saved.contact || {}) },
    theme: { ...defaults.theme, ...(saved.theme || {}) },
    seo: { ...defaults.seo, ...(saved.seo || {}) },
    cv: { ...defaults.cv, ...(saved.cv || {}) },
  };
}

/**
 * Get current portfolio data.
 * Priority:
 * 1. Saved JSON file in /data/portfolio.json (merged with defaults)
 * 2. Supabase if configured
 * 3. Default initial data
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  // Check local file persistence first
  try {
    ensureDataDir();
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && parsed.hero && parsed.profile) {
        return mergeWithDefaults(parsed, initialPortfolioData);
      }
    }
  } catch (error) {
    console.error('Failed to read local portfolio data:', error);
  }

  // Supabase fallback check if configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/portfolio_data?select=*&limit=1`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        cache: 'no-store',
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0 && rows[0].content) {
          return mergeWithDefaults(rows[0].content, initialPortfolioData);
        }
      }
    } catch (sbError) {
      console.warn('Supabase fetch failed, using fallback:', sbError);
    }
  }

  // Fallback to initial structured data and save it locally
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialPortfolioData, null, 2), 'utf-8');
  } catch (writeErr) {
    console.error('Failed to initialize local portfolio data file:', writeErr);
  }

  return initialPortfolioData;
}

/**
 * Save updated portfolio data persistently.
 * Saves to both local JSON and Supabase (if configured).
 */
export async function savePortfolioData(data: PortfolioData): Promise<{ success: boolean; error?: string }> {
  try {
    ensureDataDir();
    const updatedData: PortfolioData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    // 1. Write to local file atomically
    const tempFile = `${DATA_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(updatedData, null, 2), 'utf-8');
    fs.renameSync(tempFile, DATA_FILE);

    // 2. Sync to Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/portfolio_data`, {
          method: 'POST',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            Prefer: 'resolution=merge-duplicates',
          },
          body: JSON.stringify({
            id: 'current',
            content: updatedData,
            updated_at: new Date().toISOString(),
          }),
        });
      } catch (sbErr) {
        console.warn('Supabase sync warning:', sbErr);
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error('Save portfolio data error:', error);
    return { success: false, error: error?.message || 'Failed to save portfolio data' };
  }
}
