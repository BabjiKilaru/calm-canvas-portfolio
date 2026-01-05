import { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';
import TypewriterText from './TypewriterText';
import FloatingSkills from './FloatingSkills';
import SocialLinks from './SocialLinks';
import portrait from '@/assets/portrait.png';

const HeroSection = () => {
  const [showContent, setShowContent] = useState(true);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Left Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-screen py-24 lg:py-0">
          <div className="order-2 lg:order-1">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              <span className="text-muted-foreground">Hi, I'm</span>
              <br />
              <span className="text-foreground">Babji Kilaru</span>
            </h1>

            {/* Role with typewriter */}
            <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-4">
              <TypewriterText />
            </div>

            {/* Description */}
            <p className="text-base lg:text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Software engineer & problem solver.{' '}
              <span className="font-medium text-foreground">Engineer</span> by skill,{' '}
              <span className="font-medium text-foreground">problem-solver</span> by mindset. I build scalable backend and cloud-native systems that make a real impact.
            </p>

            {/* Location & Availability */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Sunnyvale, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Available for opportunities</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-8">
              <a href="#about" className="hero-button group">
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Social Links */}
            <SocialLinks />
          </div>

          {/* Right Side - Portrait with Skills */}
          <div className="order-1 lg:order-2 relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2">
            <div className="relative h-[50vh] lg:h-full w-full">
              {/* Floating Skills Background */}
              <FloatingSkills isVisible={showContent} />

              {/* Portrait Image */}
              <div className="absolute inset-0 flex items-center justify-center lg:items-end lg:justify-end z-10">
                <img
                  src={portrait}
                  alt="Babji Kilaru"
                  className="h-full w-auto max-w-full object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
