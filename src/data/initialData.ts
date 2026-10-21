import { PortfolioData } from '@/types/portfolio';

export const initialPortfolioData: PortfolioData = {
  hero: {
    eyebrow: {
      id: "OPERATIONS · PROCUREMENT · BUSINESS MANAGEMENT",
      en: "OPERATIONS · PROCUREMENT · BUSINESS MANAGEMENT"
    },
    headlineLine1: {
      id: "Building Better Operations.",
      en: "Building Better Operations."
    },
    headlineLine2: {
      id: "Creating Business Impact.",
      en: "Creating Business Impact."
    },
    subheadline: {
      id: "Profesional operations, procurement, dan business management dengan pengalaman dalam pengelolaan proyek infrastruktur, transportasi mineral, pengadaan, serta pengembangan bisnis.",
      en: "Operations, procurement, and business management professional with proven track record in infrastructure projects, mineral transport logistics, procurement execution, and business development."
    },
    primaryCtaText: {
      id: "Jelajahi Portfolio",
      en: "Explore Portfolio"
    },
    secondaryCtaText: {
      id: "Unduh CV Resmi",
      en: "Download Official CV"
    },
    contactCtaText: {
      id: "Hubungi Sekarang",
      en: "Let's Connect"
    },
    videoUrl: "/videos/hero-cinematic.mp4",
    fallbackPosterUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2000&auto=format&fit=crop",
    overlayOpacity: 0.70,
    portraitUrl: "/zefanya-portrait.jpg",
    portraitAlt: "Zefanya Zulian - Operations, Procurement & Business Management Professional",
    portraitPosition: "right"
  },
  profile: {
    fullName: "Zefanya Zulian",
    professionalTitle: {
      id: "General Manager | Operations, Procurement & Business Management",
      en: "General Manager | Operations, Procurement & Business Management"
    },
    location: {
      id: "Bekasi, Jawa Barat, Indonesia",
      en: "Bekasi, West Java, Indonesia"
    },
    email: "Zefanya.zuliann@gmail.com",
    phone: "+62 896 8185 2453",
    whatsappNumber: "6289681852453",
    shortBio: {
      id: "Profesional operations, procurement, dan business management yang berfokus pada efisiensi operasional, strategi pengadaan terintegrasi, dan kepemimpinan lintas fungsi yang terukur.",
      en: "Operations, procurement, and business management leader focused on operational efficiency, integrated supply strategies, and cross-functional leadership with tangible impact."
    },
    fullBio: {
      id: "Profesional Operations, Procurement, dan Business Management dengan pengalaman dalam pengelolaan operasional proyek infrastruktur, transportasi mineral, pengadaan barang, serta pengembangan bisnis di sektor real estate. Memiliki kompetensi dalam operational management, procurement strategy, vendor management, logistics coordination, KPI monitoring, serta pengawasan operasional perusahaan secara menyeluruh.\n\nTerbiasa bekerja secara lintas divisi dengan tim operasional, procurement, finance, engineering, dan stakeholder eksternal dalam lingkungan kerja yang dinamis dan berorientasi target. Memiliki kemampuan leadership, komunikasi strategis, serta pengambilan keputusan melalui pengalaman memimpin organisasi tingkat universitas dan manajemen perusahaan.\n\nMampu mengelola aktivitas operasional, pengendalian performa bisnis, koordinasi proyek, serta memastikan pencapaian target perusahaan secara efektif, efisien, dan sesuai standar profesional.",
      en: "Operations, Procurement, and Business Management professional with extensive experience directing infrastructure project operations, mineral transport logistics, goods procurement, and real estate business expansion. Proficient in operational management, procurement strategy, vendor relationships, supply chain coordination, KPI tracking, and enterprise governance.\n\nProven track record collaborating across operational, procurement, financial, engineering, and external stakeholder teams within high-velocity, target-driven environments. Brings high-impact leadership, strategic communication, and executive decision-making honed through university-wide organizational presidency and corporate leadership.\n\nDedicated to scaling operational workflows, optimizing business performance metrics, and ensuring punctual corporate project delivery upholding the highest professional integrity."
    },
    yearsOfExperience: "5+ Years",
    keyHighlights: {
      id: [
        "Pengalaman memimpin operasional perusahaan pengadaan dan real estate skala komersial.",
        "Pengelolaan operasional transportasi mineral dan kontinuitas armada di Banten.",
        "Manajemen procurement material end-to-end pada Proyek Jembatan Pulau Kalimantan - Pulau Laut.",
        "Mantan Presiden Mahasiswa Universitas Bhayangkara Jakarta Raya & Branch Leader GEMA-RI."
      ],
      en: [
        "Executive oversight of corporate operations spanning procurement and commercial real estate.",
        "On-site operations management for mineral flow transport and heavy fleet readiness in Banten.",
        "End-to-end procurement and inventory control for the major Kalimantan to Laut Island Bridge Project.",
        "Former University Student Body President (BEM UBJ) & GEMA-RI City Branch Leader."
      ]
    }
  },
  experiences: [
    {
      id: "exp-1",
      company: "PT. Aba Mandiri Sejahtera",
      role: {
        id: "General Manager",
        en: "General Manager"
      },
      period: "2026 — Present",
      location: "Bekasi, Indonesia",
      projectContext: {
        id: "Pengadaan Barang & Sektor Real Estate",
        en: "Material Procurement & Real Estate Division"
      },
      responsibilities: {
        id: [
          "Memimpin operasional perusahaan secara menyeluruh pada bidang pengadaan barang dan real estate untuk memastikan efektivitas bisnis dan pencapaian target perusahaan.",
          "Mengawasi aktivitas procurement, vendor management, project coordination, dan operasional bisnis agar berjalan sesuai timeline dan standar perusahaan.",
          "Mengembangkan strategi operasional dan pengendalian performa perusahaan berbasis efisiensi, kualitas layanan, dan pertumbuhan bisnis.",
          "Berkoordinasi dengan stakeholder internal maupun eksternal dalam pengelolaan proyek, kerja sama bisnis, dan pengembangan perusahaan.",
          "Mengelola monitoring KPI, reporting manajemen, serta evaluasi operasional untuk meningkatkan produktivitas dan efektivitas kerja tim.",
          "Memastikan implementasi SOP, administrasi operasional, dan compliance perusahaan berjalan dengan baik."
        ],
        en: [
          "Direct enterprise-wide operations across procurement and real estate divisions to guarantee business effectiveness and revenue target achievement.",
          "Supervise procurement pipelines, strategic vendor relations, project milestones, and corporate business operations aligned with quality benchmarks.",
          "Architect operational strategies and performance control systems rooted in cost efficiency, service excellence, and sustainable business growth.",
          "Liaise with executive internal and external stakeholders in joint venture execution, commercial partnerships, and business development.",
          "Govern KPI tracking frameworks, executive reporting, and cross-functional performance appraisals to optimize operational throughput.",
          "Enforce institutional SOP compliance, operational governance, and regulatory adherence across all company divisions."
        ]
      },
      featured: true,
      order: 1
    },
    {
      id: "exp-2",
      company: "PT. Mahaputra Baruna Logistik",
      role: {
        id: "Site Operations Manager",
        en: "Site Operations Manager"
      },
      period: "2025",
      location: "Banten, Indonesia",
      projectContext: {
        id: "Bayah Mineral Flow Transport Project",
        en: "Bayah Mineral Flow Transport Project"
      },
      responsibilities: {
        id: [
          "Mengelola operasional harian transportasi mineral mulai dari proses loading, hauling, hingga delivery untuk memastikan kelancaran distribusi dan ketepatan waktu operasional.",
          "Mengawasi workforce planning, scheduling operasional, serta monitoring performa lapangan guna menjaga produktivitas dan efisiensi proyek.",
          "Berkoordinasi dengan tim logistics, procurement, dan safety untuk memastikan kesiapan armada, alat operasional, dan kontinuitas aktivitas proyek.",
          "Mengimplementasikan SOP operasional dan quality control untuk meningkatkan akurasi workflow serta meminimalkan downtime operasional.",
          "Menjalin komunikasi efektif dengan stakeholder internal maupun eksternal guna mendukung kelancaran pelaksanaan proyek."
        ],
        en: [
          "Command daily operations of bulk mineral haulage from loading, hauling, to terminal discharge, securing timely delivery schedules.",
          "Orchestrate workforce allocation, route scheduling, and on-ground field telemetry to safeguard labor productivity and fuel efficiency.",
          "Coordinate directly with logistics, procurement, and HSE/safety teams to guarantee 100% heavy fleet readiness and zero operational downtime.",
          "Institute operational standard operating procedures (SOP) and rigorous quality assurance to minimize downtime bottlenecks.",
          "Maintain active, proactive channels with regulatory officials, mining concessionaires, and port dispatchers."
        ]
      },
      featured: true,
      order: 2
    },
    {
      id: "exp-3",
      company: "PT. Asri — Praya, KSO",
      role: {
        id: "Head of Logistics (Material Procurement)",
        en: "Head of Logistics (Material Procurement)"
      },
      period: "2024 — 2025",
      location: "Kalimantan, Indonesia",
      projectContext: {
        id: "Bridge Construction Project — Kalimantan Island to Laut Island",
        en: "Bridge Construction Project: Kalimantan Island to Laut Island"
      },
      responsibilities: {
        id: [
          "Mengelola proses procurement material konstruksi secara end-to-end untuk memastikan ketersediaan material sesuai timeline proyek.",
          "Berkoordinasi dengan vendor dan supplier dalam pengadaan material berkualitas untuk mendukung kelancaran proyek infrastruktur skala besar.",
          "Mengembangkan sistem inventory management dan stock control guna meningkatkan akurasi distribusi material serta efisiensi logistik proyek.",
          "Berkolaborasi dengan tim engineering, finance, dan operations untuk menyelaraskan kebutuhan material dengan target proyek dan anggaran perusahaan.",
          "Menyusun reporting dan dokumentasi logistik secara sistematis untuk mendukung monitoring operasional dan compliance proyek."
        ],
        en: [
          "Spearhead end-to-end heavy civil construction material procurement guaranteeing uninterrupted availability aligned with civil milestones.",
          "Negotiate and partner with major industrial suppliers for high-spec materials tailored for maritime bridge foundations.",
          "Devise dynamic inventory warehousing and automated stock control systems, curtailing material wastage and supply latency.",
          "Partner with chief structural engineers, project finance, and construction managers to synchronize purchase orders with cash flow constraints.",
          "Standardize logistics documentation, bill of materials (BOM) traceability, and statutory compliance audits."
        ]
      },
      featured: true,
      order: 3
    }
  ],
  leadership: [
    {
      id: "lead-1",
      organization: "Generasi Muda Republik Indonesia (GEMA-RI)",
      role: {
        id: "Branch Leader",
        en: "Branch Leader"
      },
      period: "2022 — 2024",
      location: "Bekasi, Indonesia",
      highlights: {
        id: [
          "Memimpin organisasi kepemudaan tingkat kota dalam pelaksanaan program sosial, edukasi, dan pemberdayaan masyarakat.",
          "Mengelola perencanaan program, koordinasi tim, budgeting, dan pelaksanaan kegiatan organisasi secara strategis.",
          "Membangun hubungan kerja sama dengan pemerintah daerah, institusi pendidikan, dan komunitas lokal.",
          "Mengembangkan kemampuan leadership, stakeholder engagement, dan community management melalui berbagai program organisasi."
        ],
        en: [
          "Led municipal youth civic organization presiding over multi-sector social welfare, educational outreach, and public advocacy.",
          "Structured organizational blueprints, personnel recruitment, project budgeting, and strategic grassroots execution.",
          "Formed strategic alliances with municipal government bodies, academic councils, and regional youth forums.",
          "Cultivated community leadership, multi-tier stakeholder diplomacy, and crisis management under public scrutiny."
        ]
      },
      featured: true,
      order: 1
    },
    {
      id: "lead-2",
      organization: "Universitas Bhayangkara Jakarta Raya",
      role: {
        id: "Presiden Mahasiswa, Badan Eksekutif Mahasiswa Universitas (BEM UBJ)",
        en: "Student Body President (BEM University)"
      },
      period: "2021 — 2022",
      location: "Bekasi, Indonesia",
      highlights: {
        id: [
          "Memimpin organisasi mahasiswa tingkat universitas dan mengoordinasikan berbagai divisi dalam pelaksanaan program kerja strategis.",
          "Mewakili mahasiswa dalam forum akademik dan komunikasi institusional dengan pihak universitas.",
          "Mengelola koordinasi lintas organisasi serta pelaksanaan program sosial, pendidikan, dan pengembangan mahasiswa.",
          "Mengembangkan kemampuan strategic leadership, public communication, dan team management dalam lingkungan bertekanan tinggi."
        ],
        en: [
          "Elected Student Body President directing the executive student government across all university faculties and academic branches.",
          "Served as primary diplomatic representative to the university senate, rectorate, and national higher education councils.",
          "Orchestrated university-wide social, academic, and student advancement initiatives involving thousands of participants.",
          "Refined high-stakes strategic negotiations, media relations, and conflict resolution within demanding administrative settings."
        ]
      },
      featured: true,
      order: 2
    }
  ],
  competencies: [
    {
      id: "comp-1",
      title: {
        id: "Operations Management",
        en: "Operations Management"
      },
      category: "operations",
      description: {
        id: "Tata kelola operasional perusahaan menyeluruh, perancangan SOP, dan optimalisasi workflow.",
        en: "Comprehensive operational oversight, standard operating procedure design, and workflow efficiency."
      },
      order: 1
    },
    {
      id: "comp-2",
      title: {
        id: "Procurement & Vendor Management",
        en: "Procurement & Vendor Management"
      },
      category: "procurement",
      description: {
        id: "Sourcing strategis, evaluasi rekanan, negosiasi kontrak, dan pengadaan material skala besar.",
        en: "Strategic sourcing, vendor evaluation, contract negotiation, and industrial procurement."
      },
      order: 2
    },
    {
      id: "comp-3",
      title: {
        id: "Logistics & Supply Chain Coordination",
        en: "Logistics & Supply Chain Coordination"
      },
      category: "logistics",
      description: {
        id: "Manajemen armada mineral, loading-hauling-delivery, dan distribusi material tepat waktu.",
        en: "Fleet orchestration, bulk mineral transport, hauling logistics, and scheduled delivery networks."
      },
      order: 3
    },
    {
      id: "comp-4",
      title: {
        id: "Business Operations",
        en: "Business Operations"
      },
      category: "operations",
      description: {
        id: "Pengembangan bisnis dan operasional komersial di bidang pengadaan dan real estate.",
        en: "Commercial business development and enterprise operations in procurement and real estate."
      },
      order: 4
    },
    {
      id: "comp-5",
      title: {
        id: "Real Estate Operations",
        en: "Real Estate Operations"
      },
      category: "operations",
      description: {
        id: "Pengawasan operasional aset properti, perizinan, dan koordinasi pengembangan lahan.",
        en: "Property asset operations, regulatory compliance, and land development coordination."
      },
      order: 5
    },
    {
      id: "comp-6",
      title: {
        id: "KPI Monitoring & Reporting",
        en: "KPI Monitoring & Reporting"
      },
      category: "strategy",
      description: {
        id: "Penyusunan dashboard metrik kinerja, pelaporan manajemen, dan evaluasi berkala.",
        en: "Executive dashboard analytics, KPI performance frameworks, and operational audits."
      },
      order: 6
    },
    {
      id: "comp-7",
      title: {
        id: "SOP Implementation & Compliance",
        en: "SOP Implementation & Compliance"
      },
      category: "operations",
      description: {
        id: "Standarisasi proses kerja operasional dan penegakan kepatuhan standar industri.",
        en: "Operational process standardization and strict adherence to statutory and HSE protocols."
      },
      order: 7
    },
    {
      id: "comp-8",
      title: {
        id: "Inventory & Material Control",
        en: "Inventory & Material Control"
      },
      category: "procurement",
      description: {
        id: "Pengendalian stok material konstruksi, inventarisasi gudang, dan mitigasi loss.",
        en: "Construction material stock control, warehouse telemetry, and inventory loss mitigation."
      },
      order: 8
    },
    {
      id: "comp-9",
      title: {
        id: "Project Coordination",
        en: "Project Coordination"
      },
      category: "operations",
      description: {
        id: "Sinkronisasi target proyek antar divisi teknis, keuangan, dan vendor lapangan.",
        en: "Inter-disciplinary project milestone synchronization across engineering, finance, and contractors."
      },
      order: 9
    },
    {
      id: "comp-10",
      title: {
        id: "Cross-Functional Collaboration",
        en: "Cross-Functional Collaboration"
      },
      category: "leadership",
      description: {
        id: "Menjembatani tim finance, legal, engineering, dan operasional menuju satu target terpadu.",
        en: "Bridging engineering, finance, legal, and site personnel toward unified corporate objectives."
      },
      order: 10
    },
    {
      id: "comp-11",
      title: {
        id: "Operational Scheduling",
        en: "Operational Scheduling"
      },
      category: "logistics",
      description: {
        id: "Perencanaan shift kerja, utilisasi alat berat, dan rotasi armada pengangkutan.",
        en: "Heavy equipment utilization scheduling, workforce shift rosters, and fleet dispatching."
      },
      order: 11
    },
    {
      id: "comp-12",
      title: {
        id: "Stakeholder Management",
        en: "Stakeholder Management"
      },
      category: "leadership",
      description: {
        id: "Komunikasi persuasif dengan otoritas daerah, aparat, mitra KSO, dan manajemen puncak.",
        en: "High-level diplomacy with local authorities, consortium partners, and executive boards."
      },
      order: 12
    },
    {
      id: "comp-13",
      title: {
        id: "Leadership & Team Coordination",
        en: "Leadership & Team Coordination"
      },
      category: "leadership",
      description: {
        id: "Membangun budaya tim yang disiplin, tangguh, dan fokus pada akurasi eksekusi.",
        en: "Fostering disciplined team culture, high accountability, and operational excellence."
      },
      order: 13
    },
    {
      id: "comp-14",
      title: {
        id: "Strategic Communication",
        en: "Strategic Communication"
      },
      category: "strategy",
      description: {
        id: "Penyampaian arahan strategis, mitigasi krisis lapangan, dan negosiasi bisnis.",
        en: "Clear operational directives, field crisis communications, and commercial negotiations."
      },
      order: 14
    },
    {
      id: "comp-15",
      title: {
        id: "Problem Solving & Decision Making",
        en: "Problem Solving & Decision Making"
      },
      category: "strategy",
      description: {
        id: "Analisis cepat berbasis data lapangan untuk mengatasi kendala taktis dan logistik.",
        en: "Data-backed root-cause analysis to rapidly dismantle logistics and tactical bottlenecks."
      },
      order: 15
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: {
        id: "Sarjana Ilmu Komunikasi (S.Ikom)",
        en: "Bachelor of Communication Science (S.Ikom)"
      },
      institution: "Universitas Bhayangkara Jakarta Raya — Bekasi",
      graduationYear: "2024",
      gpa: "3.25 / 4.00",
      distinction: {
        id: "Predikat Lulus Baik",
        en: "Graduated with Commendation (Predikat Lulus Baik)"
      },
      order: 1
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: {
        id: "Certified Public Relations Officer",
        en: "Certified Public Relations Officer"
      },
      issuer: "LSP Universitas Bhayangkara Jakarta Raya",
      year: "2024",
      order: 1
    },
    {
      id: "cert-2",
      name: {
        id: "TOEFL Score 533 | CEFR B2 Upper Intermediate",
        en: "TOEFL Score 533 | CEFR B2 Upper Intermediate"
      },
      issuer: "Infinity English Learning",
      year: "2023",
      order: 2
    },
    {
      id: "cert-3",
      name: {
        id: "Microsoft Office Training",
        en: "Microsoft Office Training"
      },
      issuer: "STMIK Bani Saleh",
      year: "2018",
      order: 3
    },
    {
      id: "cert-4",
      name: {
        id: "Certified Computer Programmer – Multimedia Object Processing",
        en: "Certified Computer Programmer – Multimedia Object Processing"
      },
      issuer: "BNSP (Badan Nasional Sertifikasi Profesi)",
      year: "2018",
      order: 4
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: {
        id: "Program Vaksinasi Massal COVID-19",
        en: "COVID-19 Mass Vaccination Program"
      },
      year: "2021",
      description: {
        id: "Berpartisipasi dalam pelaksanaan program vaksinasi kolaborasi Kapolri dan BEM Universitas Bhayangkara Jakarta Raya dengan total 1.100 dosis vaksin tersalurkan untuk masyarakat.",
        en: "Participated in the strategic execution of the mass vaccination initiative in collaboration with the Chief of National Police (Kapolri) and BEM UBJ, successfully administering 1,100 vaccine doses."
      },
      metric: "1,100+",
      metricLabel: {
        id: "Dosis Vaksin Tersalurkan",
        en: "Vaccine Doses Administered"
      },
      order: 1
    },
    {
      id: "ach-2",
      title: {
        id: "Porseni Basketball Event — Juara 1",
        en: "Porseni Basketball Championship — 1st Place"
      },
      year: "2019",
      description: {
        id: "Meraih Juara 1 Kompetisi Bola Basket Tingkat Fakultas pada ajang Porseni Universitas Bhayangkara Jakarta Raya, merefleksikan kerja sama tim, ketahanan fisik, dan fokus kompetitif.",
        en: "Achieved 1st Place in the Faculty-level Basketball Championship at Universitas Bhayangkara Jakarta Raya, showcasing intense teamwork, physical resilience, and competitive drive."
      },
      metric: "1st Place",
      metricLabel: {
        id: "Kejuaraan Tingkat Fakultas",
        en: "Faculty Championship Trophy"
      },
      order: 2
    }
  ],
  tools: [
    { id: "tool-1", name: "Microsoft Excel (Advanced Modeling)", category: "office", order: 1 },
    { id: "tool-2", name: "Microsoft Word (Executive Reporting)", category: "office", order: 2 },
    { id: "tool-3", name: "Microsoft PowerPoint", category: "office", order: 3 },
    { id: "tool-4", name: "Google Workspace Enterprise", category: "office", order: 4 },
    { id: "tool-5", name: "Reporting & Documentation Tools", category: "reporting", order: 5 },
    { id: "tool-6", name: "Adobe Photoshop", category: "creative", order: 6 },
    { id: "tool-7", name: "Adobe Illustrator", category: "creative", order: 7 },
    { id: "tool-8", name: "CapCut Mobile Apps", category: "mobile", order: 8 }
  ],
  languages: [
    {
      id: "lang-1",
      name: { id: "Bahasa Indonesia", en: "Indonesian" },
      level: { id: "Penutur Asli (Native)", en: "Native Speaker" },
      badge: "Native",
      order: 1
    },
    {
      id: "lang-2",
      name: { id: "Bahasa Inggris", en: "English" },
      level: { id: "Tingkat Menengah Atas (TOEFL 533 | CEFR B2)", en: "Upper Intermediate (TOEFL 533 | CEFR B2)" },
      badge: "CEFR B2",
      order: 2
    }
  ],
  contact: {
    headline: {
      id: "Mari Membangun Nilai Bisnis Nyata.",
      en: "Let's Build Something That Matters."
    },
    subheadline: {
      id: "Terbuka untuk koneksi profesional, inisiatif strategis, dan peluang kolaborasi operasional, procurement, serta pengembangan bisnis.",
      en: "Open to meaningful professional connections, strategic collaborations, and leadership opportunities in operations, procurement, and enterprise management."
    },
    email: "Zefanya.zuliann@gmail.com",
    phone: "+62 896 8185 2453",
    whatsapp: "+6289681852453",
    linkedinUrl: "https://www.linkedin.com/in/zefanya-zulian",
    availabilityStatus: {
      id: "Tersedia untuk Peluang & Diskusi Eksekutif",
      en: "Available for Executive Leadership & Advisory"
    }
  },
  theme: {
    primaryAccent: "#D72E43",
    obsidianBg: "#090A0D",
    graphiteBg: "#11141A",
    enable3D: true,
    performanceMode: "full",
    showParticles: true,
    enableTilt: true
  },
  seo: {
    metaTitle: {
      id: "Zefanya Zulian | Operations, Procurement & Business Management",
      en: "Zefanya Zulian | Operations, Procurement & Business Management"
    },
    metaDescription: {
      id: "Official executive portfolio of Zefanya Zulian, General Manager with comprehensive experience in operations management, procurement, logistics, infrastructure projects, and business operations.",
      en: "Official executive portfolio of Zefanya Zulian, General Manager with comprehensive experience in operations management, procurement, logistics, infrastructure projects, and business operations."
    },
    keywords: [
      "Zefanya Zulian",
      "General Manager",
      "Operations Management",
      "Procurement",
      "Logistics",
      "Business Management",
      "Executive Portfolio",
      "Bekasi",
      "Indonesia"
    ],
    ogImageUrl: "/zefanya-portrait.jpg",
    canonicalUrl: "https://zefanyazulian.com"
  },
  cv: {
    cvPdfUrl: "/CV_Zefanya_Zulian.pdf",
    cvFileName: "CV_Zefanya_Zulian_Operations_Executive.pdf",
    downloadEnabled: true,
    lastUpdated: "2026-10-21"
  },
  isPublished: true,
  publishedAt: "2026-10-21T00:00:00Z",
  updatedAt: "2026-10-21T04:26:00Z"
};
