# ZEFANYA ZULIAN — WORLD-CLASS CINEMATIC 3D EXECUTIVE PORTFOLIO & RESUME PLATFORM

> **Official Executive Portfolio & Digital Resume Platform for Zefanya Zulian**  
> *General Manager | Operations · Procurement · Business Management*  
> Location: Bekasi, Jawa Barat, Indonesia

---

## 🌟 Executive Overview & Art Direction

Website ini dibangun secara khusus sebagai representasi profesional tingkat eksekutif kelas dunia bagi **Zefanya Zulian**, memadukan estetika editorial kontemporer, kedalaman interaktif 3D Three.js, visualisasi video sinematik, serta platform Content Management System (CMS) terintegrasi pada route `/admin`.

### Visual Design Tokens
- **Base Obsidian Black**: `#090A0D` (Latar utama ruang visual gelap tak terbatas)
- **Deep Graphite**: `#11141A` (Permukaan latar belakang sekunder)
- **Elevated Surface**: `#191D24` (Kartu editorial berkedalaman halus)
- **Cinematic Crimson**: `#D72E43` (Aksen dinamis, rim-glow, highlight, dan status indikator)
- **Platinum Silver**: `#D8DDE5` & `#A6ADB8` (Tipografi tajam, pembatas mikro, refleksi metalik)
- **Warm White**: `#F4F3EF` (Keterbacaan teks utama standar WCAG AA)

---

## 🚀 Fitur Unggulan Platform

### 1. Hero Section Sinematik (100svh)
- Background video gedung modern & arsitektur urban malam hari dengan kontrol pause/play aksesibel.
- Fallback poster berkualitas tinggi yang otomatis aktif jika koneksi lambat atau video diblokir browser.
- Lapisan vignette dan pencahayaan bertingkat yang menjamin teks tetap sangat mudah dibaca.
- Responsif di seluruh breakpoint (Mobile, Tablet, Laptop, Ultra-wide).

### 2. Immersive 3D Experience (Three.js WebGL)
- **Signature 3D Monolith**: Monolith geometris arsitektural Three.js dengan rotasi organik, material metalik gloss, refleksi cahaya platinum, dan rim light crimson.
- **3D Portrait Card**: Kartu potret asli Zefanya Zulian dengan tilt interaktif berbasis pointer mouse, specular glare dinamis, dan kedalaman translasi z-axis.
- **Graceful Fallback**: Mendukung perangkat tanpa WebGL dan secara otomatis menghormati preferensi `prefers-reduced-motion`.

### 3. Arsitektur 10 Bagian Eksekutif Sesuai Fakta CV Asli
- **01 // Hero**: Identitas eksekutif, video cover, 3D Monolith, 3D portrait, status ketersediaan, CTA ganda.
- **02 // Executive Introduction**: Refleksi kepemimpinan (*"More Than Managing Operations."*) dan 4 pilar operasional utama.
- **03 // Professional Experience**: Jalur timeline editorial berisi 3 rekam jejak riil:
  1. *PT. Aba Mandiri Sejahtera* — General Manager (2026 — Sekarang)
  2. *PT. Mahaputra Baruna Logistik* — Site Operations Manager (Bayah Mineral Flow Transport, 2025)
  3. *PT. Asri — Praya, KSO* — Head of Logistics / Material Procurement (Proyek Jembatan Kalimantan - Pulau Laut, 2024–2025)
- **04 // Areas of Expertise**: Grid 15 kompetensi inti terverifikasi dengan filter kategori dinamis.
- **05 // Leadership & Organization**: Rekam jejak kepemimpinan publik di *GEMA-RI* (Branch Leader) dan *BEM Universitas Bhayangkara Jakarta Raya* (Presiden Mahasiswa).
- **06 // Education & Credentials**: Gelar Sarjana Ilmu Komunikasi (S.Ikom, GPA 3.25/4.00, Predikat Lulus Baik) dan 4 sertifikasi resmi (LSP PR, TOEFL 533 B2, STMIK Office, BNSP Programmer).
- **07 // Selected Achievements**: Program Vaksinasi COVID-19 (1.100 dosis) dan Juara 1 Kejuaraan Basket Fakultas Porseni 2019.
- **08 // Tools & Capabilities**: Ekosistem pemodelan data & dokumentasi serta kecakapan dwibahasa (Indonesia Native & English Upper Intermediate).
- **09 // Contact & Inquiry System**: Form pengiriman pesan eksekutif yang tervalidasi dengan penyimpanan persisten backend, link WhatsApp langsung, email resmi, dan LinkedIn.
- **10 // Minimalist Footer**: Navigasi cepat, hak cipta tahun berjalan, dan link diskret ke portal admin.

### 4. Dwibahasa Penuh (Bahasa Indonesia & English)
- Switcher interaktif `[ ID | EN ]` yang langsung menerjemahkan seluruh konten halaman, bukan sekadar label tombol.
- Semua string bilingual tersimpan di database dan dapat dikelola dari Admin Dashboard.

### 5. Fitur Unduh & Pratinjau Dokumen CV Asli
- Menyimpan file PDF asli Zefanya Zulian di `/public/CV_Zefanya_Zulian.pdf`.
- Modal pratinjau PDF interaktif tanpa harus meninggalkan halaman.
- Tombol unduh resmi dengan penamaan profesional `CV_Zefanya_Zulian_Operations_Executive.pdf`.

### 6. Admin Dashboard & Real CMS (`/admin`)
- **Autentikasi Terproteksi**: Login berbasis session token HMAC aman dengan proteksi brute-force rate-limiting.
- **CRUD Penuh**: Dapat menambah, mengedit, dan menghapus teks, perusahaan, kompetensi, sertifikasi, dan pengaturan tema.
- **Penyimpanan Persisten**: Perubahan langsung tersimpan ke disk server (`data/portfolio.json`) dan dapat tersinkronisasi otomatis ke Supabase PostgreSQL jika dikonfigurasi.
- **Pusat Pesan Masuk**: Melihat pesan dan penawaran kerja sama yang masuk dari form publik secara real-time.
- **Media Manager**: Upload foto portrait, video hero, poster, dan file CV PDF baru secara langsung dari browser.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js
- **Icons**: Lucide React
- **Icons/Utilities**: clsx, tailwind-merge
- **Database/Storage**: Hybrid Storage Engine (Local Atomic JSON + Supabase Client Support)
- **Deployment Target**: Vercel + GitHub + Supabase

---

## ⚡ Panduan Menjalankan Secara Lokal

### 1. Masuk ke Direktori Proyek
```bash
cd C:\Users\ASUS\.gemini\antigravity\scratch\zefanya-executive-portfolio
```

### 2. Konfigurasi Environment Variable
Salin `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```

Isi default pada `.env.local`:
```env
ADMIN_PASSWORD=ZefanyaExecutive2026!
ADMIN_SESSION_SECRET=zefanya_cinematic_executive_secret_key_prod_2026
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser pada: `http://localhost:3000`

### 4. Masuk ke Dashboard Admin
- Kunjungi: `http://localhost:3000/admin`
- Masukkan password: `ZefanyaExecutive2026!`

---

## ☁️ Panduan Deploy ke Vercel & GitHub

### 1. Inisialisasi Git & Push ke GitHub
```bash
git init
git add .
git commit -m "feat: world-class cinematic 3D executive portfolio for Zefanya Zulian"
git branch -M main
git remote add origin https://github.com/USERNAME/zefanya-executive-portfolio.git
git push -u origin main
```

### 2. Deploy ke Vercel
1. Buka [Vercel Dashboard](https://vercel.com/dashboard) dan pilih **Add New Project**.
2. Hubungkan repository GitHub `zefanya-executive-portfolio`.
3. Di bagian **Environment Variables**, tambahkan:
   - `ADMIN_PASSWORD`: (Password rahasia Anda)
   - `ADMIN_SESSION_SECRET`: (String acak untuk tanda tangan token)
   - `NEXT_PUBLIC_SITE_URL`: `https://domain-anda.vercel.app`
4. Klik **Deploy**. Website akan aktif dalam waktu kurang dari 2 menit.

---

## 🗄️ Menghubungkan Supabase (Opsional untuk Multi-Cloud Persistence)

Jika Anda ingin menyimpan data ke database PostgreSQL cloud Supabase:
1. Buat proyek baru di [Supabase](https://supabase.com).
2. Di SQL Editor Supabase, jalankan file skrip migrasi yang telah disediakan:
   `supabase/migrations/20261021_init_schema.sql`
3. Salin **Project URL** dan **Service Role Key** dari *Project Settings > API*.
4. Masukkan ke `.env.local` (atau Environment Variables di Vercel):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
   ```
5. Setiap kali Anda menekan tombol **Simpan Perubahan** di `/admin`, data otomatis disinkronkan ke tabel `portfolio_data` di Supabase!

---

## 🛡️ Hak Cipta & Integritas Profesional
Seluruh informasi dalam portofolio ini didasarkan pada dokumen rekam jejak riil Zefanya Zulian tanpa klaim fiktif. Seluruh hak cipta dilindungi.
