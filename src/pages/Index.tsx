import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import WorkExperienceSection from '@/components/WorkExperienceSection';
import EducationSection from '@/components/EducationSection';
import {
  AboutSection,
  ContactSection,
  ProjectsSection,
  ResumeSection,
} from '@/components/Sections';
import HangingLamp from '@/components/HangingLamp';
import SocialLinks from '@/components/SocialLinks';
import SectionDivider from '@/components/SectionDivider';

const Index = () => {
  const [socialRect, setSocialRect] = useState<DOMRect | null>(null);

  return (
    <div className="min-h-screen bg-background md:pl-20 lg:pl-24">
      <HangingLamp anchorRect={socialRect} />
      <Header />
      <main id="main-content" role="main" tabIndex={-1}>
        <SocialLinks onContainerMeasured={setSocialRect} />
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <WorkExperienceSection />
        <SectionDivider />
        <EducationSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <ResumeSection />
        <SectionDivider />
        <ContactSection />
      </main>
      <footer role="contentinfo" className="sr-only">
        © Babji Kilaru
      </footer>
    </div>
  );
};

export default Index;
