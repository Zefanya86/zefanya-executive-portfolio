import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/server/portfolioStorage';
import { isAuthenticated } from '@/lib/auth/authService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    if (!isAuthenticated()) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized access. Please login.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    if (!body || !body.hero || !body.profile) {
      return NextResponse.json(
        { success: false, error: 'Invalid portfolio schema' },
        { status: 400 }
      );
    }

    const result = await savePortfolioData(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Portfolio updated successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update data' },
      { status: 500 }
    );
  }
}
