import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { isAuthenticated } from '@/lib/auth/authService';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB for high-res images & video reels

const ALLOWED_EXTENSIONS = [
  // Images
  '.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif', '.heic', '.heif',
  // Videos
  '.mp4', '.webm', '.mov', '.m4v', '.mkv', '.avi',
  // Documents
  '.pdf'
];

function isFileTypeAllowed(file: File): boolean {
  if (file.type) {
    if (file.type.startsWith('image/') || file.type.startsWith('video/') || file.type === 'application/pdf') {
      return true;
    }
  }
  const ext = path.extname(file.name).toLowerCase();
  return ALLOWED_EXTENSIONS.includes(ext);
}

function resolveUploadTarget(): { dir: string; isTmp: boolean } {
  try {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
    const testFile = path.join(UPLOAD_DIR, `.write_check_${Date.now()}`);
    fs.writeFileSync(testFile, 'ok');
    fs.unlinkSync(testFile);
    return { dir: UPLOAD_DIR, isTmp: false };
  } catch {
    const tmpDir = path.join(os.tmpdir(), 'zefanya_uploads');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    return { dir: tmpDir, isTmp: true };
  }
}

export async function POST(request: Request) {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ success: false, error: 'Sesi login tidak sah atau telah berakhir.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'Tidak ada berkas yang dikirimkan.' }, { status: 400 });
    }

    if (!isFileTypeAllowed(file)) {
      return NextResponse.json(
        {
          success: false,
          error: `Format berkas (${file.type || file.name}) tidak didukung. Harap unggah format gambar (JPG, PNG, WEBP, HEIC, GIF), video (MP4, WEBM, MOV), atau dokumen PDF.`
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Ukuran berkas melebihi batas 100MB.' },
        { status: 400 }
      );
    }

    const { dir, isTmp } = resolveUploadTarget();

    // Sanitize filename
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const ext = path.extname(originalName) || (file.type?.startsWith('video/') ? '.mp4' : '.jpg');
    const baseName = path.basename(originalName, ext).slice(0, 50);
    const uniqueFileName = `${baseName}_${Date.now()}${ext.toLowerCase()}`;
    const filePath = path.join(dir, uniqueFileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = isTmp ? `/api/uploads/${uniqueFileName}` : `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      originalName: file.name,
      size: file.size,
      mimeType: file.type || (ext.startsWith('.mp4') ? 'video/mp4' : 'image/jpeg'),
      isTmp,
    });
  } catch (error: any) {
    console.error('Upload handler error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Terjadi kesalahan sistem saat memproses berkas.' },
      { status: 500 }
    );
  }
}
