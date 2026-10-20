import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth/authService';

export const dynamic = 'force-dynamic';

export async function GET() {
  const authenticated = isAuthenticated();
  return NextResponse.json({
    authenticated,
    user: authenticated ? { role: 'admin', username: 'zefanya' } : null,
  });
}
