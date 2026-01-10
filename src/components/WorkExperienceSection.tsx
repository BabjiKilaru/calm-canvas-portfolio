import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  isCurrent?: boolean;
};

const experienceData: ExperienceItem[] = [
  {
    role: 'Software Engineer',
    company: 'Assurant',
    location: 'USA',
    start: 'Aug 2024',
    end: 'Present',
    isCurrent: true,
    bullets: [
      'Design and ship Java/Spring Boot microservices powering customer-facing APIs with strong SLAs.',
      'Build and secure REST/GraphQL APIs with proper versioning, validation, and observability.',
      'Deploy workloads to AWS using Docker, ECS/EKS, and IaC patterns for repeatable releases.',
      'Automate CI/CD with quality gates, contract tests, and blue/green deployments to cut risk.',
      'Partner with frontend teams to align API contracts, performance budgets, and error handling.',
      'Tune services with caching, profiling, and async patterns to reduce latency under load.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'UMKC',
    location: 'MO, USA',
    start: 'Jan 2024',
    end: 'Jul 2024',
    bullets: [
      'Delivered React/Node.js applications that automated student request workflows and approvals.',
      'Built reusable UI components and REST endpoints backed by SQL to improve data accuracy.',
      'Implemented CI/CD automation and containerized deployments to shrink release cycles.',
      'Developed analytics dashboards with role-based access, surfacing real-time operational insights.',
      'Improved uptime and error tracking with logging, health checks, and alerting hooks.',
    ],
  },
];

const WorkExperienceSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [showBackToTop, setShowBackToTop] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleItems(new Set(experienceData.map((_, index) => index)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems((prev) => {
              const next = new Set(prev);
              next.add(index);
              return next;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 380);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="experience"
      className="section-anchor relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >

      <div className="container relative mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/90 px-4 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-neutral-600" aria-hidden />
            Professional Journey
          </div>
            <div className="space-y-3 text-center">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">Work Experience</h2>
              <div className="mx-auto h-1.5 w-24 sm:w-28 rounded-full bg-neutral-700" aria-hidden />
              <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
                A chronicle of my professional journey, showcasing the roles and projects that have shaped my career.
              </p>
            </div>
          </div>

        <div className="relative mt-16">
          <div
            className="absolute left-6 top-0 h-full w-[3px] rounded-full bg-neutral-300 md:left-1/2 md:w-[4px] md:-translate-x-1/2"
            aria-hidden
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03),transparent_32%)] mix-blend-overlay" aria-hidden />

          <div className="flex flex-col gap-12 sm:gap-16">
            {experienceData.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isVisible = visibleItems.has(index);
              const cardRefCallback = (node: HTMLDivElement | null) => {
                cardRefs.current[index] = node;
              };

              const motionClass = prefersReducedMotion
                ? ''
                : isVisible
                ? 'opacity-100 translate-x-0'
                : isLeft
                ? 'opacity-0 -translate-x-8'
                : 'opacity-0 translate-x-8';

              const nodeMotionClass = prefersReducedMotion
                ? ''
                : isVisible
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-75';

              return (
                <div
                  key={`${item.company}-${item.role}-${index}`}
                  className="grid grid-cols-[auto_1fr] items-start gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-10"
                >
                  <div className="col-start-1 row-span-2 flex flex-col items-center md:col-start-2">
                    <div
                      className={`z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-white transition-all duration-500 ${nodeMotionClass}`}
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 shadow-sm">
                        <Briefcase className="h-5 w-5" aria-hidden />
                      </div>
                    </div>
                  </div>

                  <div
                    ref={cardRefCallback}
                    data-index={index}
                    className={`col-start-2 w-full rounded-3xl border border-neutral-200 bg-neutral-100 p-6 shadow-inner shadow-[0_12px_32px_-24px_rgba(0,0,0,0.45)] backdrop-blur md:max-w-2xl ${
                      isLeft ? 'md:col-start-1 md:justify-self-end md:pr-8' : 'md:col-start-3 md:pl-8'
                    } transition-all duration-700 ease-out ${motionClass} ${
                      prefersReducedMotion ? '' : 'hover:-translate-y-2 hover:shadow-inner hover:shadow-[0_18px_44px_-30px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground"> {item.company} </p>
                        <h3 className="text-2xl font-semibold text-foreground leading-tight">{item.role}</h3>
                      </div>
                      {item.isCurrent && (
                        <span className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-sm font-semibold text-foreground shadow-sm">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 font-medium text-foreground">
                        <Calendar className="h-4 w-4 text-neutral-600" aria-hidden />
                        {item.start} - {item.end}
                      </div>
                      <div className="inline-flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-neutral-600" aria-hidden />
                        {item.location}
                      </div>
                    </div>

                    <ul className="mt-5 space-y-3 text-base text-muted-foreground">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 leading-relaxed">
                          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-neutral-500 flex-none" aria-hidden />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          })
        }
        className={`fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-all duration-300 ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'
        } ${prefersReducedMotion ? '' : 'hover:-translate-y-1 hover:shadow-xl'}`}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" aria-hidden />
      </button>
    </section>
  );
};

export default WorkExperienceSection;
