export type Locale = 'id' | 'en' | 'zh';

export interface LocalizedString {
  id: string;
  en: string;
  zh: string;
}

export interface LocalizedStringList {
  id: string[];
  en: string[];
  zh: string[];
}

export type TranslationStatus = 'not_translated' | 'draft' | 'in_review' | 'approved' | 'published';

export interface MediaItem {
  id: string;
  url: string;
  type?: 'image' | 'video';
  videoUrl?: string;
  posterUrl?: string;
  duration?: string;
  resolution?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '9/16' | '21/9';
  title?: LocalizedString;
  caption?: LocalizedString;
  alt: LocalizedString;
  source?: string;
  license?: string;
  isIllustration?: boolean;
  focalPoint?: string; // e.g. "50% 30%"
  category?: string;
  date?: string;
  isPrivate?: boolean;
}

export interface HeroData {
  eyebrow: LocalizedString;
  headlineLine1: LocalizedString;
  headlineLine2: LocalizedString;
  subheadline: LocalizedString;
  primaryCtaText: LocalizedString;
  secondaryCtaText: LocalizedString;
  contactCtaText: LocalizedString;
  videoUrl: string;
  fallbackPosterUrl: string;
  overlayOpacity: number; // 0 to 1
  portraitUrl: string;
  portraitAlt: string;
  portraitPosition: 'right' | 'center' | 'left';
  tagline: LocalizedString;
}

export interface ProfileData {
  fullName: string;
  monogram: string;
  professionalTitle: LocalizedString;
  positioning: LocalizedString;
  location: LocalizedString;
  email: string;
  phone: string;
  whatsappNumber: string;
  linkedinUrl: string;
  shortBio: LocalizedString;
  fullBio: LocalizedString;
  careerPhilosophy: LocalizedString;
  leadershipPhilosophy: LocalizedString;
  yearsOfExperience: string;
  keyHighlights: LocalizedStringList;
  publicContactVisibility: {
    email: boolean;
    phone: boolean;
    whatsapp: boolean;
    location: boolean;
  };
}

export type ExperienceLayoutStyle =
  | 'editorial-split'
  | 'cinematic-full'
  | 'asymmetric-gallery'
  | 'vertical-timeline'
  | 'featured-story';

export interface ExperienceItem {
  id: string;
  slug: string;
  company: string;
  role: LocalizedString;
  period: string;
  location: string;
  projectContext?: LocalizedString;
  responsibilities: LocalizedStringList;
  keyCompetencies?: string[];
  coverImage?: string;
  coverImageAlt?: LocalizedString;
  coverImageCaption?: LocalizedString;
  mediaGallery?: MediaItem[];
  videoUrl?: string;
  layoutStyle?: ExperienceLayoutStyle;
  featured: boolean;
  isPublished?: boolean;
  order: number;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: LocalizedString;
  company: string;
  location: string;
  role: LocalizedString;
  period: string;
  scopeOfResponsibility: LocalizedStringList;
  operationalChallenges: LocalizedStringList;
  managementApproach: LocalizedStringList;
  projectExecution: LocalizedStringList;
  documentedOutcomes: LocalizedStringList;
  coverImage: string;
  gallery: MediaItem[];
  category: 'mineral' | 'infrastructure' | 'real_estate' | 'procurement';
  featured: boolean;
  isPublished: boolean;
  order: number;
}

export interface LeadershipItem {
  id: string;
  slug: string;
  organization: string;
  role: LocalizedString;
  period: string;
  location: string;
  responsibilities?: LocalizedStringList;
  highlights: LocalizedStringList;
  coverImage?: string;
  coverImageAlt?: LocalizedString;
  coverImageCaption?: LocalizedString;
  mediaGallery?: MediaItem[];
  featured: boolean;
  isPublished?: boolean;
  order: number;
}

export interface CompetencyItem {
  id: string;
  title: LocalizedString;
  category: 'operations' | 'procurement' | 'logistics' | 'leadership' | 'strategy';
  description?: LocalizedString;
  iconName?: string;
  order: number;
}

export interface EducationItem {
  id: string;
  degree: LocalizedString;
  institution: string;
  location?: string;
  graduationYear: string;
  gpa: string;
  distinction: LocalizedString;
  order: number;
}

export interface CertificationItem {
  id: string;
  name: LocalizedString;
  issuer: string;
  year: string;
  credentialUrl?: string;
  documentUrl?: string;
  order: number;
}

export interface AchievementItem {
  id: string;
  title: LocalizedString;
  year: string;
  description: LocalizedString;
  metric?: string;
  metricLabel?: LocalizedString;
  order: number;
}

export interface ToolItem {
  id: string;
  name: string;
  category: 'office' | 'reporting' | 'creative' | 'mobile';
  icon?: string;
  order: number;
}

export interface LanguageItem {
  id: string;
  name: LocalizedString;
  level: LocalizedString;
  badge?: string;
  order: number;
}

export type GalleryCategory =
  | 'corporate'
  | 'operations'
  | 'procurement'
  | 'infrastructure'
  | 'leadership'
  | 'government'
  | 'events'
  | 'achievements'
  | 'networking';

export type PrivacyStatus = 'public' | 'private' | 'unlisted' | 'archived' | 'featured';

export interface GalleryAlbum {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  coverImage: string;
  date: string;
  location: string;
  category: GalleryCategory;
  companyOrProject?: string;
  privacyStatus: PrivacyStatus;
  items: MediaItem[];
  order: number;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  category: 'business' | 'operations' | 'leadership' | 'procurement' | 'logistics' | 'development' | 'insights';
  author: string;
  coverImage: string;
  readTime: string;
  publishedAt: string;
  isPublished: boolean;
  order: number;
}

export interface DownloadableDocument {
  id: string;
  title: LocalizedString;
  description?: LocalizedString;
  category: 'cv' | 'certificate' | 'portfolio' | 'case_study';
  language: 'id' | 'en' | 'zh' | 'multi';
  fileUrl: string;
  fileName: string;
  fileSize: string;
  format: 'PDF' | 'DOCX';
  isPublic: boolean;
  downloadsCount: number;
  order: number;
}

export interface TestimonialItem {
  id: string;
  authorName: string;
  authorRole: LocalizedString;
  organization: string;
  avatarUrl?: string;
  content: LocalizedString;
  relationship: string;
  isApproved: boolean;
  order: number;
}

export interface PageSectionConfig {
  id: string;
  sectionKey: string;
  title: LocalizedString;
  isEnabled: boolean;
  order: number;
  backgroundPreset?: 'obsidian' | 'charcoal' | 'ivory' | 'gradient';
}

export interface ContactData {
  headline: LocalizedString;
  subheadline: LocalizedString;
  email: string;
  phone: string;
  whatsapp: string;
  linkedinUrl: string;
  availabilityStatus: LocalizedString;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  organization?: string;
  category: 'career' | 'partnership' | 'collaboration' | 'project' | 'general';
  message: string;
  receivedAt: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  notes?: string;
}

export interface ThemeSettings {
  primaryBg: string; // Obsidian Black #0B0B0C
  surfaceBg: string; // Charcoal #18181B
  accentGold: string; // Champagne Gold #C5A477
  warmIvory: string; // Warm Ivory #F4F0E8
  softGray: string; // Soft Gray #A5A5A5
  mode: 'dark' | 'light' | 'auto';
  typographyPreset: 'editorial_serif' | 'modern_sans';
  buttonStyle: 'sharp_gold' | 'minimal_bordered';
  enable3D: boolean;
  performanceMode: 'full' | 'balanced' | 'reduced';
  showParticles: boolean;
  enableTilt: boolean;
}

export interface SeoSettings {
  metaTitle: LocalizedString;
  metaDescription: LocalizedString;
  keywords: string[];
  ogImageUrl: string;
  canonicalUrl: string;
}

export interface CvSettings {
  cvPdfUrl: string;
  cvPdfUrlEnglish?: string;
  cvPdfUrlChinese?: string;
  cvFileName: string;
  downloadEnabled: boolean;
  lastUpdated: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  entityId?: string;
  details: string;
}

export interface PortfolioData {
  hero: HeroData;
  profile: ProfileData;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  leadership: LeadershipItem[];
  competencies: CompetencyItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  tools: ToolItem[];
  languages: LanguageItem[];
  gallery: GalleryAlbum[];
  journal: JournalArticle[];
  documents: DownloadableDocument[];
  testimonials: TestimonialItem[];
  sections: PageSectionConfig[];
  inquiries: ContactSubmission[];
  activityLogs: ActivityLog[];
  contact: ContactData;
  theme: ThemeSettings;
  seo: SeoSettings;
  cv: CvSettings;
  isPublished: boolean;
  publishedAt: string;
  updatedAt: string;
}
