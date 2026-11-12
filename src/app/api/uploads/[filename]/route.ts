import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

const MIME_MAP: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.m4v': 'video/mp4',
  '.mkv': 'video/x-matroska',
  '.pdf': 'application/pdf',
};

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = path.basename(params.filename);

    const candidates = [
      path.join(process.cwd(), 'public', 'uploads', filename),
      path.join(os.tmpdir(), 'zefanya_uploads', filename),
      path.join(os.tmpdir(), 'uploads', filename),
    ];

    let foundPath = '';
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        foundPath = c;
        break;
      }
    }

    if (!foundPath) {
      return new NextResponse('File tidak ditemukan', { status: 404 });
    }

    const ext = path.extname(filename).toLowerCase();
    const contentType = MIME_MAP[ext] || 'application/octet-stream';
    const buffer = fs.readFileSync(foundPath);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
