# PANDUAN DEPLOYMENT & PRODUCTION READY
## Zefanya Zulian — Luxury Executive Platform

Platform ini dioptimalkan untuk deployment instan ke **Vercel** dengan backend data **Supabase PostgreSQL** dan fallback penyimpanan lokal.

---

## 1. STRATEGI DEPLOYMENT VERCEL

### Langkah 1: Push Repository ke GitHub
```bash
git init
git add .
git commit -m "feat: complete luxury executive platform for Zefanya Zulian"
git branch -M main
git remote add origin https://github.com/USERNAME/zefanya-executive-portfolio.git
git push -u origin main
```

### Langkah 2: Hubungkan Project di Vercel Dashboard
1. Buka [Vercel Dashboard](https://vercel.com).
2. Pilih **Add New Project** dan impor repository GitHub Anda.
3. Konfigurasi Framework Preset: **Next.js**.
4. Root Directory: `./`

### Langkah 3: Konfigurasi Environment Variables
Tambahkan variabel lingkungan berikut di Vercel Settings > Environment Variables:

```env
# URL Domain Resmi
NEXT_PUBLIC_SITE_URL=https://zefanyazulian.com

# Kredensial Administrator
ADMIN_PASSWORD=ZefanyaExecutive2026!
ADMIN_SESSION_SECRET=zefanya-super-secure-key-2026-executive-auth-production-grade

# Supabase PostgreSQL (Opsional jika menggunakan sinkronisasi Cloud)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

### Langkah 4: Deploy
Klik **Deploy**. Vercel akan secara otomatis membangun aplikasi Next.js (App Router), mengoptimalkan aset gambar/video, dan menyediakan URL produksi.

---

## 2. PENYIAPAN SUPABASE POSTGRESQL

1. Buat proyek baru di [Supabase Dashboard](https://supabase.com).
2. Buka menu **SQL Editor**.
3. Buka berkas `supabase/migrations/20261108_comprehensive_schema.sql` pada proyek ini.
4. Salin seluruh isi SQL dan jalankan di Supabase SQL Editor.
5. 30 tabel, indeks relasional, Row Level Security (RLS), dan data awal CV resmi Zefanya Zulian akan otomatis dibuat dan siap digunakan.

---

## 3. VERIFIKASI DOMAIN KUSTOM & SSL
1. Di Vercel Dashboard, masuk ke **Settings > Domains**.
2. Masukkan domain kustom (contoh: `zefanyazulian.com` atau `zefanya.id`).
3. Tambahkan DNS Records sesuai panduan Vercel:
   - **Type A**: `@` -> `76.76.21.21`
   - **CNAME**: `www` -> `cname.vercel-dns.com`
4. Sertifikat SSL otomatis diterbitkan dalam 1–5 menit.
