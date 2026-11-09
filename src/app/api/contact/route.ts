import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'inquiries.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, organization, category, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address provided.' },
        { status: 400 }
      );
    }

    ensureDataDir();

    let existingInquiries: any[] = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      try {
        const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
        existingInquiries = JSON.parse(raw);
      } catch {
        existingInquiries = [];
      }
    }

    const newInquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: String(name).trim().slice(0, 100),
      email: String(email).trim().slice(0, 120),
      organization: String(organization || '').trim().slice(0, 150),
      category: ['career', 'partnership', 'collaboration', 'project', 'general'].includes(category)
        ? category
        : 'partnership',
      message: String(message).trim().slice(0, 3000),
      receivedAt: new Date().toISOString(),
      status: 'new', // 'new' | 'read' | 'replied' | 'archived'
      read: false,
    };

    existingInquiries.unshift(newInquiry);

    // Save locally
    const tempFile = `${MESSAGES_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(existingInquiries, null, 2), 'utf-8');
    fs.renameSync(tempFile, MESSAGES_FILE);

    // If Supabase configured, sync to contact_submissions table
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
          method: 'POST',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newInquiry.name,
            email: newInquiry.email,
            organization: newInquiry.organization,
            category: newInquiry.category,
            message: newInquiry.message,
            received_at: newInquiry.receivedAt,
            status: newInquiry.status,
          }),
        });
      } catch (sbErr) {
        console.warn('Supabase inquiry sync warning:', sbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully.',
    });
  } catch (error: any) {
    console.error('Contact submit error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error processing inquiry.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    ensureDataDir();
    if (!fs.existsSync(MESSAGES_FILE)) {
      return NextResponse.json({ inquiries: [] });
    }
    const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    const inquiries = JSON.parse(raw);
    return NextResponse.json({ inquiries });
  } catch {
    return NextResponse.json({ inquiries: [] });
  }
}
