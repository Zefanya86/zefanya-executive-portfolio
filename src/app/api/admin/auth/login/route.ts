import { NextResponse } from 'next/server';
import {
  checkRateLimit,
  recordFailedAttempt,
  resetAttempts,
  createSessionToken,
  SESSION_COOKIE_NAME,
  ADMIN_PASSWORD,
} from '@/lib/auth/authService';

export async function POST(request: Request) {
  try {
    const { password, ip = '127.0.0.1' } = await request.json();

    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Terlalu banyak percobaan gagal. Silakan coba lagi dalam ${rateLimit.waitMinutes} menit.`,
        },
        { status: 429 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password wajib diisi.' },
        { status: 400 }
      );
    }

    // Verify against ADMIN_PASSWORD
    if (password !== ADMIN_PASSWORD) {
      recordFailedAttempt(ip);
      return NextResponse.json(
        { success: false, error: 'Password salah. Akses ditolak.' },
        { status: 401 }
      );
    }

    // Reset attempts on success
    resetAttempts(ip);

    // Create session token
    const token = createSessionToken();

    const response = NextResponse.json({
      success: true,
      message: 'Login berhasil.',
      user: { role: 'admin', username: 'zefanya' },
    });

    // Set secure cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Server authentication error' },
      { status: 500 }
    );
  }
}
