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
 * Get current portfolio data.
 * Priority:
 * 1. Saved JSON file in /data/portfolio.json
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
        return parsed as PortfolioData;
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
          return rows[0].content as PortfolioData;
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
