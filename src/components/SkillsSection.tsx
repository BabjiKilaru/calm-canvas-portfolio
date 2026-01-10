import { KeyboardEvent, useEffect, useMemo, useState } from 'react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import html5Logo from '@/assets/html5.svg';

type SkillItem = { name: string; placeholder?: false };
type PlaceholderSkill = { name: string; placeholder: true };
type DisplaySkill = SkillItem | PlaceholderSkill;
type Category = { key: string; label: string; skills: SkillItem[] };

const categories: Category[] = [
  {
    key: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React.js' },
      { name: 'Next.js' },
      { name: 'Angular' },
      { name: 'Material UI' },
      { name: 'Bootstrap' },
      { name: 'Tailwind CSS' },
      { name: 'Responsive Web Design' },
      { name: 'WCAG Accessibility' },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Java' },
      { name: 'Spring Boot' },
      { name: 'J2EE' },
      { name: 'Hibernate' },
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'Python' },
      { name: 'FastAPI' },
      { name: 'Microservices' },
    ],
  },
  {
    key: 'apis',
    label: 'APIs & Security',
    skills: [
      { name: 'RESTful APIs' },
      { name: 'GraphQL' },
      { name: 'OAuth2' },
      { name: 'JWT' },
      { name: 'RBAC' },
      { name: 'Swagger' },
      { name: 'Postman' },
      { name: 'API Gateway Security' },
    ],
  },
  {
    key: 'cloud',
    label: 'Cloud & DevOps',
    skills: [
      { name: 'AWS' },
      { name: 'Azure' },
      { name: 'Docker' },
      { name: 'Kubernetes' },
      { name: 'Terraform' },
      { name: 'GitHub Actions' },
      { name: 'Jenkins' },
      { name: 'GitLab CI/CD' },
    ],
  },
  {
    key: 'databases',
    label: 'Databases',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'Oracle' },
      { name: 'MongoDB' },
      { name: 'Redis' },
      { name: 'SQL Server' },
      { name: 'Data Modeling' },
      { name: 'Query Optimization' },
      { name: 'Caching Strategies' },
    ],
  },
  {
    key: 'testing',
    label: 'Testing & Quality',
    skills: [
      { name: 'JUnit' },
      { name: 'Mockito' },
      { name: 'Selenium' },
      { name: 'Cypress' },
      { name: 'Load Testing' },
      { name: 'Code Coverage' },
      { name: 'TDD/BDD' },
    ],
  },
];

type IconMeta = {
  abbr?: string;
  bg?: string;
  color?: string;
  image?: string;
};

const iconMeta: Record<string, IconMeta> = {
  React: { abbr: 'R', bg: '#0b1c26', color: '#61dafb' },
  'React.js': { abbr: 'R', bg: '#0b1c26', color: '#61dafb' },
  'Next.js': { abbr: 'N', bg: '#0e0e10', color: '#ffffff' },
  JavaScript: { abbr: 'JS', bg: '#fff5cc', color: '#e9b904' },
  TypeScript: { abbr: 'TS', bg: '#e8f1ff', color: '#2f74c0' },
  'Tailwind CSS': { abbr: 'Tw', bg: '#e5f7fb', color: '#39b2d7' },
  HTML5: { image: html5Logo, bg: '#ffffff', color: '#0f172a' },
  CSS3: { abbr: 'CSS', bg: '#e8f3ff', color: '#1f71c0' },
  Angular: { abbr: 'Ng', bg: '#ffe9ed', color: '#c3002f' },
  'Material UI': { abbr: 'MUI', bg: '#eaf2ff', color: '#007fff' },
  Bootstrap: { abbr: 'Bs', bg: '#f1ebff', color: '#7c3aed' },
  Java: { abbr: 'Jv', bg: '#fff1eb', color: '#e67d24' },
  'Spring Boot': { abbr: 'SB', bg: '#ebfff3', color: '#2f9e44' },
  J2EE: { abbr: 'J2', bg: '#f7f4ff', color: '#7a5af8' },
  Hibernate: { abbr: 'Hb', bg: '#fff5e8', color: '#b77d31' },
  'Node.js': { abbr: 'Nd', bg: '#edfff0', color: '#3c873a' },
  'Express.js': { abbr: 'Ex', bg: '#f5f5f5', color: '#111827' },
  Python: { abbr: 'Py', bg: '#f5f8ff', color: '#3472a6' },
  FastAPI: { abbr: 'FA', bg: '#e9fbf5', color: '#059669' },
  Microservices: { abbr: 'MS', bg: '#f1f5f9', color: '#0f172a' },
  'RESTful APIs': { abbr: 'API', bg: '#eaf4ff', color: '#0ea5e9' },
  GraphQL: { abbr: 'GQL', bg: '#ffe9f4', color: '#e535ab' },
  OAuth2: { abbr: 'OA2', bg: '#f4f6ff', color: '#6366f1' },
  JWT: { abbr: 'JWT', bg: '#eefcf5', color: '#16a34a' },
  RBAC: { abbr: 'RB', bg: '#f4f5ff', color: '#7c3aed' },
  Swagger: { abbr: 'Sw', bg: '#f3ffe6', color: '#89bf04' },
  Postman: { abbr: 'PM', bg: '#fff0e8', color: '#ef5b25' },
  'API Gateway Security': { abbr: 'GW', bg: '#f0f6ff', color: '#0ea5e9' },
  AWS: { abbr: 'AWS', bg: '#fff6eb', color: '#f59e0b' },
  Azure: { abbr: 'Az', bg: '#eaf4ff', color: '#0078d4' },
  Docker: { abbr: 'Dc', bg: '#eaf6ff', color: '#0db7ed' },
  Kubernetes: { abbr: 'K8s', bg: '#ecf2ff', color: '#326ce5' },
  Terraform: { abbr: 'Tf', bg: '#f1e9ff', color: '#7b42bc' },
  'GitHub Actions': { abbr: 'GHA', bg: '#f5f7fb', color: '#0f172a' },
  Jenkins: { abbr: 'Jk', bg: '#fff2ef', color: '#d33833' },
  'GitLab CI/CD': { abbr: 'GL', bg: '#fff4ed', color: '#e24329' },
  PostgreSQL: { abbr: 'PG', bg: '#eaf1ff', color: '#336791' },
  MySQL: { abbr: 'My', bg: '#eef7ff', color: '#00618a' },
  Oracle: { abbr: 'Or', bg: '#fff0ec', color: '#c0392b' },
  MongoDB: { abbr: 'Mg', bg: '#eaf7f0', color: '#4faa41' },
  Redis: { abbr: 'Rd', bg: '#fff0f0', color: '#d82c20' },
  'SQL Server': { abbr: 'SQL', bg: '#f4f4f4', color: '#b02020' },
  'Data Modeling': { abbr: 'DM', bg: '#f7f6ff', color: '#4f46e5' },
  'Query Optimization': { abbr: 'QO', bg: '#e9f3ff', color: '#2563eb' },
  'Caching Strategies': { abbr: 'Ca', bg: '#f5fff1', color: '#2f9e44' },
  JUnit: { abbr: 'JU', bg: '#f2ffe9', color: '#3a7f0d' },
  Mockito: { abbr: 'Mo', bg: '#e8fff3', color: '#00b775' },
  Selenium: { abbr: 'Se', bg: '#eef7ff', color: '#43b02a' },
  Cypress: { abbr: 'Cy', bg: '#f4f4f4', color: '#0f172a' },
  'Load Testing': { abbr: 'LT', bg: '#fff5e6', color: '#c2410c' },
  'Code Coverage': { abbr: 'CC', bg: '#f6f4ff', color: '#6d28d9' },
  'TDD/BDD': { abbr: 'TDD', bg: '#eaf6ff', color: '#0284c7' },
  'Responsive Web Design': { abbr: 'RWD', bg: '#f1f5f9', color: '#0f172a' },
  'WCAG Accessibility': { abbr: 'A11y', bg: '#edf7ff', color: '#2563eb' },
};

const deriveIconKey = (name: string) => {
  if (name.startsWith('AWS')) return 'AWS';
  if (name.startsWith('Azure')) return 'Azure';
  if (name.startsWith('API Gateway')) return 'API Gateway Security';
  return name;
};

const SkillLogo = ({ name }: { name: string }) => {
  const key = deriveIconKey(name);
  const meta = iconMeta[key] ?? {
    abbr: name.slice(0, 3).toUpperCase(),
    bg: '#f4f4f5',
    color: '#0f172a',
  };

  return (
    <div
      className="flex h-14 w-14 items-center justify-center rounded-2xl font-semibold"
      style={{
        background: meta.image ? 'transparent' : meta.bg,
        color: meta.color,
        boxShadow: meta.image ? 'none' : 'inset 0 1px 0 rgba(255,255,255,0.4)',
      }}
      aria-hidden
    >
      {meta.image ? (
        <img src={meta.image} alt={`${name} logo`} className="h-10 w-10 object-contain" loading="lazy" />
      ) : (
        <span className="text-sm">{meta.abbr}</span>
      )}
    </div>
  );
};

const SkillsSection = () => {
  const [activeKey, setActiveKey] = useState<string>('frontend');
  const [visibleSlots, setVisibleSlots] = useState<number>(() => {
    if (typeof window === 'undefined') return 12;
    if (window.matchMedia('(min-width: 1024px)').matches) return 12;
    if (window.matchMedia('(min-width: 768px)').matches) return 8;
    if (window.matchMedia('(min-width: 640px)').matches) return 6;
    return 4;
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  const activeCategory = useMemo(
    () => categories.find((category) => category.key === activeKey) ?? categories[0],
    [activeKey],
  );

  const visibleSkills: DisplaySkill[] = useMemo(() => {
    const trimmed = activeCategory.skills.slice(0, visibleSlots);
    const placeholdersNeeded = Math.max(visibleSlots - trimmed.length, 0);
    const placeholders: PlaceholderSkill[] = Array.from({ length: placeholdersNeeded }).map((_, idx) => ({
      name: `placeholder-${idx}`,
      placeholder: true,
    }));
    return [...trimmed, ...placeholders];
  }, [activeCategory, visibleSlots]);

  useEffect(() => {
    const computeVisibleSlots = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) return 12;
      if (window.matchMedia('(min-width: 768px)').matches) return 8;
      if (window.matchMedia('(min-width: 640px)').matches) return 6;
      return 4;
    };

    const handleResize = () => setVisibleSlots(computeVisibleSlots());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();

    const nextIndex =
      event.key === 'ArrowRight'
        ? (index + 1) % categories.length
        : (index - 1 + categories.length) % categories.length;

    setActiveKey(categories[nextIndex].key);
  };

  return (
    <section id="skills" className="section-anchor py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center gap-5">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Technical Skills</h2>
            <div className="mx-auto h-1.5 w-24 sm:w-28 rounded-full bg-neutral-700" aria-hidden />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-base md:text-lg font-medium text-neutral-500">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="relative w-full max-w-6xl">
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-foreground/5 via-transparent to-foreground/10 blur-3xl" aria-hidden />
            <div className="relative rounded-[24px] border border-white/10 bg-[#0b0c10]/90 text-foreground shadow-[0_25px_80px_-45px_rgba(0,0,0,0.9)] overflow-hidden">
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                <div
                  role="tablist"
                  aria-label="Skill categories"
                  className="flex flex-wrap justify-center gap-2 sm:gap-3"
                >
                  {categories.map((category, index) => {
                    const isActive = category.key === activeKey;
                    return (
                      <button
                        key={category.key}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`skills-panel-${category.key}`}
                        className={`rounded-full px-4 sm:px-5 py-2 text-sm md:text-[15px] font-semibold leading-tight whitespace-normal text-center transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 ${
                          isActive
                            ? 'bg-white text-foreground shadow-[0_14px_30px_-18px_rgba(0,0,0,0.75)]'
                            : 'bg-white/10 text-slate-200 hover:text-white hover:bg-white/15'
                        }`}
                        onClick={() => setActiveKey(category.key)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                      >
                        {category.label}
                      </button>
                    );
                  })}
                </div>

                <div
                  id={`skills-panel-${activeCategory.key}`}
                  role="tabpanel"
                  className={`${prefersReducedMotion ? '' : 'animate-skill-grid'} grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 sm:gap-6 justify-items-center`}
                  style={{ gridAutoRows: 'minmax(120px, auto)' }}
                >
                  {visibleSkills.map((skill) =>
                    skill.placeholder ? (
                      <div
                        key={skill.name}
                        className="text-center flex flex-col items-center gap-3 opacity-0 pointer-events-none select-none"
                        aria-hidden
                      >
                        <div className="h-14 w-14 rounded-2xl" />
                        <p className="text-sm font-semibold">placeholder</p>
                      </div>
                    ) : (
                      <div
                        key={skill.name}
                        className="text-center flex flex-col items-center gap-3 text-white transition-transform duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white/70"
                        tabIndex={0}
                      >
                        <SkillLogo name={skill.name} />
                        <p className="text-sm font-semibold text-slate-50 leading-tight">{skill.name}</p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
