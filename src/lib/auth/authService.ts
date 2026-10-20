import crypto from 'crypto';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'zefanya_admin_token';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'zefanya-super-secure-key-2026-executive-auth';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ZefanyaExecutive2026!';

// Brute-force attempt tracker in memory
interface AttemptRecord {
  count: number;
  lockedUntil: number;
}
const loginAttempts = new Map<string, AttemptRecord>();

export function checkRateLimit(identifier: string): { allowed: boolean; waitMinutes?: number } {
  const now = Date.now();
  const record = loginAttempts.get(identifier);

  if (!record) return { allowed: true };

  if (record.lockedUntil > now) {
    const waitMinutes = Math.ceil((record.lockedUntil - now) / 60000);
    return { allowed: false, waitMinutes };
  }

  // Lock expired
  if (record.lockedUntil <= now && record.count >= 5) {
    loginAttempts.delete(identifier);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedAttempt(identifier: string) {
  const now = Date.now();
  const record = loginAttempts.get(identifier) || { count: 0, lockedUntil: 0 };
  record.count += 1;

  if (record.count >= 5) {
    record.lockedUntil = now + 15 * 60 * 1000; // 15 minutes lockout
  }

  loginAttempts.set(identifier, record);
}

export function resetAttempts(identifier: string) {
  loginAttempts.delete(identifier);
}

/**
 * Sign session token with expiration (24h)
 */
export function createSessionToken(): string {
  const payload = {
    role: 'admin',
    user: 'zefanya',
    exp: Date.now() + 24 * 60 * 60 * 1000,
  };
  const jsonStr = JSON.stringify(payload);
  const base64Payload = Buffer.from(jsonStr).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(base64Payload)
    .digest('base64url');

  return `${base64Payload}.${signature}`;
}

/**
 * Verify session token
 */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [base64Payload, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(base64Payload)
    .digest('base64url');

  if (signature !== expectedSignature) return false;

  try {
    const jsonStr = Buffer.from(base64Payload, 'base64url').toString('utf-8');
    const payload = JSON.parse(jsonStr);
    if (!payload.exp || payload.exp < Date.now()) return false;
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

/**
 * Check if current request is authenticated
 */
export function isAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    return verifySessionToken(token);
  } catch {
    return false;
  }
}

export { SESSION_COOKIE_NAME, ADMIN_PASSWORD };
