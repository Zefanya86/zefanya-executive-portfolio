export type Locale = 'id' | 'en';

export interface LocalizedString {
  id: string;
  en: string;
}

export interface LocalizedStringList {
  id: string[];
  en: string[];
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
}

export interface ProfileData {
  fullName: string;
  professionalTitle: LocalizedString;
  location: LocalizedString;
  email: string;
  phone: string;
  whatsappNumber: string;
  shortBio: LocalizedString;
  fullBio: LocalizedString;
  yearsOfExperience: string;
  keyHighlights: LocalizedStringList;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: LocalizedString;
  period: string;
  location: string;
  projectContext?: LocalizedString;
  responsibilities: LocalizedStringList;
  featured: boolean;
  order: number;
}

export interface LeadershipItem {
  id: string;
  organization: string;
  role: LocalizedString;
  period: string;
  location: string;
  highlights: LocalizedStringList;
  featured: boolean;
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

export interface ContactData {
  headline: LocalizedString;
  subheadline: LocalizedString;
  email: string;
  phone: string;
  whatsapp: string;
  linkedinUrl: string;
  availabilityStatus: LocalizedString;
}

export interface ThemeSettings {
  primaryAccent: string; // e.g. #D72E43
  obsidianBg: string; // e.g. #090A0D
  graphiteBg: string; // e.g. #11141A
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
  cvFileName: string;
  downloadEnabled: boolean;
  lastUpdated: string;
}

export interface PortfolioData {
  hero: HeroData;
  profile: ProfileData;
  experiences: ExperienceItem[];
  leadership: LeadershipItem[];
  competencies: CompetencyItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  tools: ToolItem[];
  languages: LanguageItem[];
  contact: ContactData;
  theme: ThemeSettings;
  seo: SeoSettings;
  cv: CvSettings;
  isPublished: boolean;
  publishedAt: string;
  updatedAt: string;
}
