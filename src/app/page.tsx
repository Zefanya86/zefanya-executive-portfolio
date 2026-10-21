import Navigation from '@/components/ui/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import ExecutiveIntro from '@/components/sections/ExecutiveIntro';
import OperationsNetworkSection from '@/components/sections/OperationsNetworkSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import CompetenciesSection from '@/components/sections/CompetenciesSection';
import LeadershipSection from '@/components/sections/LeadershipSection';
import EducationSection from '@/components/sections/EducationSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ToolsSection from '@/components/sections/ToolsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export const revalidate = 60;

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-obsidian text-warmWhite overflow-x-hidden">
      {/* Top Fixed Executive Header */}
      <Navigation />

      {/* Main Content Flow */}
      <main id="main-content" className="relative z-10">
        {/* Section 01: Hero with Jakarta Traffic Cinematic Cover */}
        <HeroSection />

        {/* Section 02: Executive Introduction & Verified Portrait */}
        <ExecutiveIntro />

        {/* Section 03: 3D Tactical Operations & Logistics Grid (Google Earth Satellite 3D) */}
        <OperationsNetworkSection />

        {/* Section 04: Professional Experience */}
        <ExperienceSection />

        {/* Section 05: Areas of Expertise */}
        <CompetenciesSection />

        {/* Section 06: Leadership & Organization */}
        <LeadershipSection />

        {/* Section 07: Education & Credentials */}
        <EducationSection />

        {/* Section 08: Selected Achievements */}
        <AchievementsSection />

        {/* Section 09: Tools & Capabilities */}
        <ToolsSection />

        {/* Section 10: Contact & Direct Channels */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
