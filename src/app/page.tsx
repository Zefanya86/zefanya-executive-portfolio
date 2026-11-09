import Navigation from '@/components/ui/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import MarqueeTicker from '@/components/ui/MarqueeTicker';
import ExecutiveIntro from '@/components/sections/ExecutiveIntro';
import ExperienceSection from '@/components/sections/ExperienceSection';
import CompetenciesSection from '@/components/sections/CompetenciesSection';
import LeadershipSection from '@/components/sections/LeadershipSection';
import EducationSection from '@/components/sections/EducationSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import CivicMentorshipSection from '@/components/sections/CivicMentorshipSection';
import ExecutiveBookshelf from '@/components/sections/ExecutiveBookshelf';
import ToolsSection from '@/components/sections/ToolsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import MediaLightbox from '@/components/ui/MediaLightbox';
import CommandPalette from '@/components/ui/CommandPalette';
import CursorGlow from '@/components/ui/CursorGlow';

export const revalidate = 60;

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-obsidian text-ivory overflow-x-hidden selection:bg-gold selection:text-obsidian transition-colors duration-300">
      {/* Subtle cursor ambient glow */}
      <CursorGlow />

      {/* Floating Ultra Luxury Dock Navigation */}
      <Navigation />

      {/* Main Luxury Content Flow */}
      <main id="main-content" className="relative z-10">
        {/* 01. Hero with Cinematic Backdrop & Zefanya Zulian Portrait */}
        <HeroSection />

        {/* 02. Running Champagne Gold Ticker */}
        <MarqueeTicker />

        {/* 03. Executive Credo, Summary & Core Pillars */}
        <ExecutiveIntro />

        {/* 04. Professional Experience */}
        <ExperienceSection />

        {/* 05. Core Functional Expertise */}
        <CompetenciesSection />

        {/* 06. Strategic Leadership & Organizations */}
        <LeadershipSection />

        {/* 07. Education & Official Certifications */}
        <EducationSection />

        {/* 08. Selected Achievements & Social Impact */}
        <AchievementsSection />

        {/* 09. Civic Legacy & Youth Mentorship (Locked Point 5) */}
        <CivicMentorshipSection />

        {/* 10. The Executive Bookshelf & Intellectual Sources (Locked Point 2) */}
        <ExecutiveBookshelf />

        {/* 11. Productivity Suite & Language Fluency */}
        <ToolsSection />

        {/* 10. Direct Strategic Intake & Contact */}
        <ContactSection />
      </main>

      {/* Ultra Luxury Footer with Monogram & Links */}
      <Footer />

      {/* Interactive Fullscreen Media Lightbox */}
      <MediaLightbox />

      {/* Global Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette />
    </div>
  );
}
