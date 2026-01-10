import { ArrowRight, MapPin, Briefcase } from 'lucide-react';
import TypewriterText from './TypewriterText';
import FloatingSkills from './FloatingSkills';
import SocialLinks from './SocialLinks';
import PortraitAccent from './PortraitAccent';
import portrait from '@/assets/portrait.png';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const HeroSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const showContent = !prefersReducedMotion;

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden section-anchor">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-[1.8fr_1fr] gap-12 lg:gap-10 items-center min-h-screen py-24 lg:py-0">
          <div className="order-2 lg:order-1 relative lg:pr-8 flex flex-col h-full justify-end">
            <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 mt-2 sm:mt-4 lg:mt-6">
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4">
                <span className="text-muted-foreground">Hi, I'm</span>
                <br />
                <span className="text-foreground">Babji Kilaru</span>
              </h1>

              {/* Role with typewriter */}
              <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-2">
                <TypewriterText />
              </div>

              {/* Description */}
              <p className="text-base lg:text-lg text-muted-foreground max-w-lg leading-relaxed">
                Software engineer & problem solver.{' '}
                <span className="font-medium text-foreground">Engineer</span> by skill,{' '}
                <span className="font-medium text-foreground">problem-solver</span> by mindset. I build scalable backend and cloud-native systems that make a real impact.
              </p>

              {/* Location & Availability */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
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
              <div className="flex flex-wrap gap-3">
                <a href="#about" className="hero-button group">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              {/* Social Links */}
              <SocialLinks />
            </div>

            {/* Scroll indicator */}
            <div className="mt-6 pb-4 flex flex-col items-center gap-3 text-muted-foreground">
              <div
                className={`h-12 w-8 rounded-full border border-muted-foreground/70 flex items-start justify-center ${
                  prefersReducedMotion ? '' : 'mouse-scroll'
                }`}
                aria-hidden
              >
                <div className="w-2 h-2.5 rounded-full bg-muted-foreground/80 mt-2.5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Scroll to continue</p>
            </div>
          </div>

          {/* Right Side - Portrait with Skills */}
          <div className="order-1 lg:order-2 relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2">
            <div className="relative h-[50vh] lg:h-full w-full overflow-hidden">
              <FloatingSkills isVisible={showContent} />
              <PortraitAccent />
              <div className="absolute inset-0 flex items-center justify-center lg:items-end lg:justify-end z-20">
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
