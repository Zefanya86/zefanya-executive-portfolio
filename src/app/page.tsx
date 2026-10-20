import Navigation from '@/components/ui/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import ExecutiveIntro from '@/components/sections/ExecutiveIntro';
import ExperienceSection from '@/components/sections/ExperienceSection';
import CompetenciesSection from '@/components/sections/CompetenciesSection';
import LeadershipSection from '@/components/sections/LeadershipSection';
import EducationSection from '@/components/sections/EducationSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ToolsSection from '@/components/sections/ToolsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-obsidian text-warmWhite overflow-x-hidden">
      {/* Top Fixed Executive Header */}
      <Navigation />

      {/* Main Content Flow */}
      <main id="main-content" className="relative z-10">
        {/* Section 01: Hero */}
        <HeroSection />

        {/* Section 02: Executive Introduction */}
        <ExecutiveIntro />

        {/* Section 03: Professional Experience */}
        <ExperienceSection />

        {/* Section 04: Areas of Expertise */}
        <CompetenciesSection />

        {/* Section 05: Leadership & Organization */}
        <LeadershipSection />

        {/* Section 06: Education & Credentials */}
        <EducationSection />

        {/* Section 07: Selected Achievements */}
        <AchievementsSection />

        {/* Section 08: Tools & Capabilities */}
        <ToolsSection />

        {/* Section 09: Contact & Direct Channels */}
        <ContactSection />
      </main>

      {/* Section 10: Minimalist Footer */}
      <Footer />
    </div>
  );
}
