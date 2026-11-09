# ARSITEKTUR BASIS DATA & SKEMA SUPABASE (30 TABEL)
## Zefanya Zulian — Luxury Executive Personal Branding Platform

Platform ini dirancang dengan **Dual-Persistence Layer**:
1. **Cloud PostgreSQL (Supabase)**: Skema relasional 30 tabel tingkat enterprise dengan relasi foreign key, indeks performa B-Tree, dan Row Level Security (RLS) policies.
2. **Local Dual-Persistence Fallback**: File penyimpanan lokal terstruktur (`data/portfolio.json`) yang memastikan platform dapat berjalan secara instan di lingkungan lokal tanpa ketergantungan wajib pada koneksi cloud.

---

## 1. STRUKTUR 30 TABEL BASIS DATA

Skema migrasi lengkap terletak di: `supabase/migrations/20261108_comprehensive_schema.sql`

| No | Nama Tabel | Deskripsi & Entitas |
|---|---|---|
| 1 | `profiles` | Identitas resmi, monogram ("ZZ"), gelar eksekutif, bio narasi, kontak, dan filosofi operasional |
| 2 | `hero_settings` | Konfigurasi hero video, preset latar bergerak, overlay opacity, dan focal point foto portrait |
| 3 | `experiences` | Pengalaman manajerial (PT Aba Mandiri Sejahtera, PT Mahaputra Baruna Logistik, PT Asri - Praya KSO) |
| 4 | `experience_responsibilities` | Uraian tugas & tanggung jawab eksekutif multibahasa (ID, EN, ZH) |
| 5 | `experience_media` | Dokumentasi visual pendukung pada rekam jejak pengalaman kerja |
| 6 | `leadership_records` | Kepemimpinan publik & organisasi mahasiswa (Presma Ubhara, Branch Leader GEMA-RI) |
| 7 | `leadership_highlights` | Sorotan tata kelola dan inisiatif advokasi strategis organisasi |
| 8 | `leadership_media` | Dokumentasi visual aktivitas kepemimpinan publik |
| 9 | `projects` | Studi kasus proyek mendalam (Bayah Mineral Flow Transport, Kalimantan Island Bridge, dll.) |
| 10 | `project_scopes` | Ruang lingkup tanggung jawab proyek |
| 11 | `project_challenges` | Tantangan operasional dan kendala medan lapangan |
| 12 | `project_approaches` | Pendekatan manajerial, SOP, dan mitigasi risiko operasional |
| 13 | `project_executions` | Eksekusi lapangan, koordinasi armada, dan pengawasan kualitas material |
| 14 | `project_outcomes` | Hasil terukur, kepatuhan jadwal, dan metrik keselamatan |
| 15 | `project_media` | Galeri visual teknis proyek dan diagram alur logistik |
| 16 | `competencies` | 15 kompetensi inti manajerial terverifikasi sesuai CV resmi |
| 17 | `education` | Gelar akademik Sarjana Ilmu Komunikasi (S.Ikom), Ubhara (IPK 3.25, Lulus Baik) |
| 18 | `certifications` | Sertifikasi resmi (LSP Ubhara Public Relations Officer, TOEFL 533 CEFR B2, BNSP, Microsoft) |
| 19 | `achievements` | Rekor pencapaian (Program Vaksinasi 1.100 dosis Kapolri & BEM, Juara 1 Basket Porseni) |
| 20 | `tools_software` | Perangkat lunak pendukung (Microsoft Office, Google Workspace, Adobe Suite, CapCut) |
| 21 | `languages` | Kemahiran bahasa resmi (Bahasa Indonesia Native & English Upper Intermediate TOEFL 533) |
| 22 | `gallery_albums` | Album dokumentasi aktivitas lapangan, infrastruktur, dan kepemimpinan |
| 23 | `gallery_items` | Foto-foto kegiatan dengan koordinat focal point dan keterangan naratif |
| 24 | `journal_articles` | Artikel opini strategis, wawasan rantai pasok, dan pemikiran operasional |
| 25 | `downloadable_documents` | Berkas CV PDF resmi (ID, EN, ZH), ringkasan proyek, dan penghitung unduhan |
| 26 | `testimonials` | Rekomendasi profesional rekan kerja dan atasan (tersimpan sebagai draf terverifikasi) |
| 27 | `page_sections` | Konfigurasi tata letak beranda, urutan seksi dinamis, dan sakelar visibilitas |
| 28 | `contact_inquiries` | Formulir pesan masuk, inisiasi kemitraan, status penanganan, dan riwayat balasan |
| 29 | `theme_design_settings` | Token warna Ultra Luxury (#0B0B0C, #18181B, #C5A477, #F4F0E8, #A5A5A5), tipografi, dan mode grafis |
| 30 | `activity_logs` | Jejak audit sistem, stempel waktu, dan pencatatan aksi administratif |

---

## 2. ROW LEVEL SECURITY (RLS) POLICIES

Setiap tabel dilengkapi kebijakan keamanan tingkat baris (RLS):
- **Public Read Access**: Tabel publik (`profiles`, `hero_settings`, `experiences`, `projects`, `competencies`, `education`, `certifications`, `achievements`, `gallery_albums`, `journal_articles`, `downloadable_documents`) dapat dibaca secara publik oleh pengunjung tanpa autentikasi.
- **Admin Write Access**: Mutasi data (INSERT, UPDATE, DELETE) dibatasi ketat hanya untuk sesi admin terotentikasi melalui JWT token atau Service Role Key.
- **Contact Inquiries**: Pengunjung publik hanya memiliki hak INSERT pada tabel `contact_inquiries`. Hak baca dan pembaruan status hanya dimiliki oleh sesi admin.
- **Activity Logs**: Hanya dapat ditulis oleh sistem dan dibaca oleh akun administrator.

---

## 3. VERIFIKASI SEED CONTENT OTENTIK

Seluruh data awal disuntikkan secara otomatis dari CV resmi Zefanya Zulian:
- **Nama**: Zefanya Zulian, S.Ikom
- **Posisi Manajerial**: General Manager di PT Aba Mandiri Sejahtera (2026–Sekarang), Site Operations Manager di PT Mahaputra Baruna Logistik (2025), Head of Logistics di PT Asri - Praya KSO (2024–2025).
- **Kepemimpinan**: Presiden Mahasiswa BEM Ubhara (2021–2022), Branch Leader GEMA-RI Bekasi (2022–2024).
- **Pendidikan**: Sarjana Ilmu Komunikasi (S.Ikom), Universitas Bhayangkara Jakarta Raya, IPK 3.25.
- **Sertifikasi**: Public Relations Officer LSP Ubhara, TOEFL 533 CEFR B2, Microsoft Office Training STMIK Bani Saleh, BNSP Certified Computer Programmer.
- **Pencapaian**: 1.100 Dosis Vaksinasi COVID-19 Kolaborasi Kapolri & BEM Ubhara, Juara 1 Basket Porseni Ubhara.
