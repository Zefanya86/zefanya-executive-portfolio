# PANDUAN LENGKAP INSTALASI & PENGEMBANGAN LOKAL
## Zefanya Zulian — Luxury Executive Platform

Dokumen ini memandu langkah demi langkah untuk menjalankan, menguji, dan mengembangkan platform di komputer lokal Anda.

---

## 1. LOKASI WORKSPACE & STRUKTUR FILE

Proyek ini dibangun di dalam direktori:
```
C:\Users\ASUS\.gemini\antigravity\scratch\zefanya-executive-portfolio
```

> **Rekomendasi Penting**: Silakan tetapkan folder di atas sebagai **Active Workspace** di editor Anda untuk kemudahan eksplorasi berkas dan pengembangan lebih lanjut.

### Struktur Direktori Utama
```
zefanya-executive-portfolio/
├── data/
│   └── portfolio.json               # Berkas basis data lokal (dual-persistence fallback)
├── public/
│   ├── zefanya-portrait.jpg         # Foto portrait asli resmi Zefanya Zulian
│   ├── CV_Zefanya_Zulian.pdf        # Berkas PDF resmi Bahasa Indonesia
│   ├── CV_Zefanya_Zulian_English.pdf# Berkas PDF resmi English
│   └── videos/                      # Video sinematik latar belakang lokal
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Halaman Beranda Utama (/)
│   │   ├── about/                   # Profil Eksekutif & Filosofi (/about)
│   │   ├── experience/              # Katalog & Detail Pengalaman (/experience & [slug])
│   │   ├── leadership/              # Kepemimpinan Organisasi (/leadership & [slug])
│   │   ├── projects/                # Studi Kasus Proyek (/projects)
│   │   ├── gallery/                 # Galeri Aktivitas Eksekutif (/gallery)
│   │   ├── journal/                 # Jurnal & Opini (/journal & [slug])
│   │   ├── download/                # Pusat Unduhan Berkas Resmi (/download)
│   │   ├── card/                    # Kartu Nama Digital vCard 3.0 (/card)
│   │   ├── contact/                 # Kontak & Inisiasi Kemitraan (/contact)
│   │   ├── admin/                   # Master Admin CMS 20 Modul (/admin)
│   │   ├── api/                     # Backend API Routes (portfolio, contact, auth, upload)
│   │   └── globals.css              # Design tokens Ultra-Luxury (Obsidian, Gold, Charcoal)
│   ├── components/
│   │   ├── admin/                   # Komponen modular 20 modul CMS
│   │   ├── sections/                # Seksi-seksi tampilan publik
│   │   └── ui/                      # Navigation dock, CV modal, Media lightbox, Command palette
│   ├── context/
│   │   └── PortfolioContext.tsx     # Context trilingual (ID, EN, ZH) & state reaktif
│   ├── data/
│   │   └── initialData.ts           # Data seed otentik dari CV Zefanya Zulian
│   └── lib/
│       ├── auth/                    # Sistem autentikasi admin & brute-force protection
│       └── server/                  # Dual-persistence storage engine (Local JSON + Supabase)
├── supabase/
│   └── migrations/                  # Skema migrasi 30 tabel PostgreSQL relasional
├── ADMIN_GUIDE.md                   # Panduan lengkap 20 modul Admin CMS
├── DATABASE.md                      # Dokumentasi 30 tabel database & RLS
├── DEPLOYMENT.md                    # Panduan deployment Vercel & Supabase
├── INSTALLATION.md                  # Panduan instalasi lokal ini
└── README.md                        # Ringkasan platform eksekutif
```

---

## 2. LANGKAH-LANGKAH MENJALANKAN DI LOKAL

### Langkah 1: Buka Terminal PowerShell atau Command Prompt
```bash
cd C:\Users\ASUS\.gemini\antigravity\scratch\zefanya-executive-portfolio
```

### Langkah 2: Instalasi Dependensi
Jalankan perintah berikut:
```bash
npm.cmd install
```

### Langkah 3: Menjalankan Server Pengembangan (Dev Server)
```bash
npm.cmd run dev
```

Buka peramban di: `http://localhost:3000`

### Langkah 4: Mengakses Panel Admin CMS
Buka peramban di: `http://localhost:3000/admin`  
Kunci sandi default:
```
ZefanyaExecutive2026!
```

---

## 3. PENGUJIAN PRODUKSI & BUILD

Untuk memastikan seluruh rute statis dan fungsi server siap diluncurkan tanpa kendala:
```bash
# Kompilasi build produksi Next.js
npm.cmd run build

# Menjalankan server produksi
npm.cmd run start
```

Seluruh 27 rute statis (`/`, `/about`, `/experience`, `/projects`, `/gallery`, `/journal`, `/download`, `/card`, `/contact`, `/admin`, dll.) telah terverifikasi menghasilkan keluaran 100% tanpa error.
