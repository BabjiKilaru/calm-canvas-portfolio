import { useState } from 'react';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Sparkles,
  Download,
  ExternalLink,
  Github,
  Link as LinkIcon,
  Mail,
  Send,
  Phone,
  Server,
  Layout,
  LayoutGrid,
  Share2,
  Database,
  CheckCircle2,
  Cloud,
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

type ProjectCategory = 'All' | 'Frontend' | 'Backend' | 'Cloud';

const SectionHeader = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col gap-2 mb-10">
    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
    <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
    <p className="text-base md:text-lg text-muted-foreground max-w-4xl leading-relaxed">{description}</p>
  </div>
);

export const AboutSection = () => {
  const services = [
    { title: 'Backend & Microservices', Icon: Server },
    { title: 'Frontend Development', Icon: LayoutGrid },
    { title: 'Cloud & DevOps', Icon: Cloud },
    { title: 'API Design & Integration', Icon: Share2 },
    { title: 'Databases & Caching', Icon: Database },
    { title: 'Testing & Quality Engineering', Icon: CheckCircle2 },
  ];
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="about" className="section-anchor py-16 lg:py-24 bg-white text-foreground">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          {/* Left timeline */}
          <div className="relative pl-10">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-primary/70" aria-hidden />
            <div className="space-y-8">
              {services.map((item, idx) => {
                const Icon = item.Icon;
                return (
                  <div
                    key={item.title}
                    className={`group flex items-center gap-4 ${prefersReducedMotion ? '' : 'animate-fade-in'}`}
                    style={!prefersReducedMotion ? { animationDelay: `${idx * 90}ms` } : undefined}
                    tabIndex={0}
                  >
                    <div className="relative">
                      <div className="absolute -left-[38px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary" aria-hidden />
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted border border-border transition-transform transition-colors duration-200 group-hover:bg-secondary group-hover:border-foreground/20 group-focus-visible:bg-secondary group-focus-visible:border-foreground/20 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold transition-colors duration-200 group-hover:text-foreground group-focus-visible:text-foreground">
                      {item.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold uppercase">ABOUT ME</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                I&apos;m Babji Kilaru, focused on building scalable Java/Spring Boot microservices, secure REST/GraphQL APIs, and cloud-native deployments on AWS with Docker and Kubernetes. I partner with teams to ship reliable backends, CI/CD pipelines, and frontends in React or Angular that stay accessible and performant.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I enjoy translating requirements into resilient architectures, instrumenting services for observability, and iterating quickly with automated tests and delivery workflows.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-2">
              {[
                { label: 'Years experience', value: '4+' },
                { label: 'Projects delivered', value: '15+' },
                { label: 'APIs/Microservices built', value: '20+' },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 flex flex-col items-start md:items-center gap-3 text-muted-foreground">
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
        </div>
      </div>
    </section>
  );
};

export const SkillsSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const skillGroups = [
    {
      title: 'Languages',
      items: ['Java', 'TypeScript', 'JavaScript', 'Python', 'SQL'],
    },
    {
      title: 'Frameworks',
      items: ['Spring Boot', 'React', 'Node.js', 'FastAPI', 'Express'],
    },
    {
      title: 'Cloud & DevOps',
      items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Jenkins'],
    },
    {
      title: 'Databases',
      items: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis'],
    },
  ];

  return (
    <section id="skills" className="section-anchor py-16 lg:py-24 border-b border-border/60">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Skills"
          title="A toolkit for shipping production software."
          description="The stacks I reach for when building resilient services, data flows, and clean user experiences."
        />
        <div className="-mt-1 mb-6 flex flex-col items-center gap-2 text-center">
          <p className="text-base md:text-lg font-medium text-neutral-600">
            Technologies and tools I use to bring ideas to life
          </p>
          <div className="h-0.5 w-20 rounded-full bg-neutral-500" aria-hidden />
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className={`bg-card border border-border rounded-2xl p-6 shadow-sm ${
                prefersReducedMotion ? '' : 'animate-skill-fade'
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-2 rounded-xl bg-secondary text-sm text-foreground/90 border border-border/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ExperienceSection = () => {
  const experiences = [
    {
      role: 'Senior Software Engineer',
      company: 'Nimbus Systems',
      dates: '2022 — Present',
      location: 'Sunnyvale, CA',
      summary: 'Led backend modernization and observability for cloud-native services.',
      highlights: [
        'Rebuilt a Java monolith into Spring Boot microservices, cutting deployment lead time by 60%.',
        'Designed event-driven pipelines with Kafka that reduced data latency from minutes to seconds.',
        'Introduced SLO dashboards and alerting, improving incident MTTR by 35%.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'FinEdge',
      dates: '2020 — 2022',
      location: 'San Francisco, CA',
      summary: 'Owned API surface area and developer experience for customer-facing apps.',
      highlights: [
        'Shipped GraphQL/REST gateways consumed by 6+ teams with versioned contracts and linting.',
        'Implemented CI/CD with blue-green deployments, cutting release rollback risk to near-zero.',
        'Collaborated with design to build React interfaces with a11y-first components.',
      ],
    },
    {
      role: 'Full-Stack Developer',
      company: 'Product Studio',
      dates: '2018 — 2020',
      location: 'Remote',
      summary: 'Delivered client projects across web, data, and integrations.',
      highlights: [
        'Built FastAPI services that handled 50k+ daily requests with zero-downtime releases.',
        'Optimized SQL queries and caching, reducing page load times by up to 45%.',
        'Mentored junior developers on testing strategies and code reviews.',
      ],
    },
  ];

  return (
    <section id="experience" className="section-anchor py-16 lg:py-24 border-b border-border/60 bg-muted/20">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Experience"
          title="Recent roles and measurable impact."
          description="I focus on outcomes: reliability, developer velocity, and user value. Here are a few snapshots."
        />

        <div className="space-y-6">
          {experiences.map((exp) => (
            <article key={`${exp.company}-${exp.role}`} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.12em] text-muted-foreground">{exp.dates}</p>
                  <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                  <p className="text-muted-foreground font-medium">{exp.company} — {exp.location}</p>
                  <p className="text-sm text-muted-foreground mt-2">{exp.summary}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarClock className="w-4 h-4" aria-hidden />
                  <span>Shipped with metrics-first mindset</span>
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                {exp.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const EducationSection = () => {
  const education = [
    {
      degree: 'Master of Science, Computer Science',
      school: 'San Jose State University',
      dates: '2016 — 2018',
      focus: 'Distributed systems, data engineering, and product delivery.',
    },
    {
      degree: 'Bachelor of Technology, Computer Science',
      school: 'JNTU Hyderabad',
      dates: '2012 — 2016',
      focus: 'Algorithms, operating systems, and software engineering.',
    },
  ];

  const certifications = [
    'AWS Certified Developer — Associate',
    'Oracle Certified Professional, Java',
  ];

  return (
    <section id="education" className="section-anchor py-16 lg:py-24 border-b border-border/60">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Education"
          title="Learning that shaped my engineering practice."
          description="A formal foundation in computer science, reinforced by ongoing certifications and hands-on build cycles."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {education.map((item) => (
              <div key={item.degree} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.12em] text-muted-foreground">{item.dates}</p>
                    <h3 className="text-lg font-semibold text-foreground">{item.degree}</h3>
                    <p className="text-muted-foreground font-medium">{item.school}</p>
                    <p className="text-sm text-muted-foreground mt-2">{item.focus}</p>
                  </div>
                  <BookOpen className="w-5 h-5 text-muted-foreground" aria-hidden />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-secondary/60 border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
              Certifications Preview
              <Award className="w-5 h-5 text-muted-foreground" />
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-primary block" aria-hidden />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CertificationsSection = () => {
  const certifications = [
    {
      name: 'AWS Certified Developer — Associate',
      issuer: 'Amazon Web Services',
      year: '2023',
      credentialUrl: 'https://aws.amazon.com/certification/',
    },
    {
      name: 'Oracle Certified Professional, Java SE',
      issuer: 'Oracle',
      year: '2022',
      credentialUrl: 'https://education.oracle.com/java',
    },
    {
      name: 'CKA: Certified Kubernetes Administrator',
      issuer: 'CNCF',
      year: '2021',
      credentialUrl: 'https://www.cncf.io/certification/cka/',
    },
  ];

  return (
    <section id="certifications" className="section-anchor py-16 lg:py-24 border-b border-border/60 bg-muted/20">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Certifications"
          title="Credentials that back the work."
          description="Formal proof points across cloud, backend, and orchestration."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <article key={cert.name} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <p className="text-sm uppercase tracking-[0.12em] text-muted-foreground">{cert.year}</p>
              <h3 className="text-lg font-semibold text-foreground">{cert.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{cert.issuer}</p>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary font-medium"
              >
                View credential
                <ExternalLink className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProjectsSection = () => {
  const [filter, setFilter] = useState<ProjectCategory>('All');
  const prefersReducedMotion = usePrefersReducedMotion();
  const projects = [
    {
      title: 'Calm Canvas Portfolio',
      description: 'A performant, accessible portfolio with motion controls, interactive navigation, and content-driven sections.',
      stack: ['React', 'TypeScript', 'Tailwind', 'Vite'],
      githubUrl: 'https://github.com/babjikilaru',
      liveUrl: 'https://github.com/babjikilaru',
      category: 'Frontend' as const,
    },
    {
      title: 'Streaming Analytics Pipeline',
      description: 'Real-time ingestion with Kafka and Spark streaming, surfacing insights through REST and dashboards.',
      stack: ['Java', 'Kafka', 'Spark', 'AWS'],
      githubUrl: 'https://github.com/babjikilaru',
      liveUrl: 'https://github.com/babjikilaru',
      category: 'Backend' as const,
    },
    {
      title: 'Deployment Control Plane',
      description: 'Infrastructure-as-code and GitOps workflows for multi-service deployments with automated checks.',
      stack: ['Terraform', 'Kubernetes', 'GitHub Actions', 'Helm'],
      githubUrl: 'https://github.com/babjikilaru',
      liveUrl: 'https://github.com/babjikilaru',
      category: 'Cloud' as const,
    },
    {
      title: 'Customer Insights Dashboard',
      description: 'Full-stack analytics dashboard with role-based access and exportable reports.',
      stack: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
      githubUrl: 'https://github.com/babjikilaru',
      liveUrl: 'https://github.com/babjikilaru',
      category: 'Frontend' as const,
    },
  ];

  const filteredProjects = projects.filter((project) => filter === 'All' || project.category === filter);

  return (
    <section id="projects" className="section-anchor py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Projects"
          title="Selected projects and experiments."
          description="Hands-on builds across frontend, backend, and cloud. Filters help you jump to what matters."
        />

        <div className="flex flex-wrap gap-3 mb-6">
          {(['All', 'Frontend', 'Backend', 'Cloud'] as ProjectCategory[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-full border ${
                filter === option ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border'
              } ${prefersReducedMotion ? '' : 'transition-colors duration-200'}`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <article key={project.title} className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{project.category}</p>
                <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-secondary text-xs text-foreground/90 border border-border/60">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ResumeSection = () => {
  const resumeUrl = `${import.meta.env.BASE_URL || '/'}resume.pdf`;
  const handleResumeDownload = () => {
    toast({
      title: 'Resume download started',
      description: 'Opening resume.pdf with recent experience and certifications.',
    });
  };

  return (
    <section id="resume" className="section-anchor py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div className="flex flex-col items-center text-center gap-2 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-neutral-600" aria-hidden />
            Resume
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Download my resume.</h2>
          <div className="mx-auto h-1.5 w-24 sm:w-28 rounded-full bg-neutral-700" aria-hidden />
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            A concise, metrics-driven PDF with projects, experience, and certifications.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xl bg-card border border-border rounded-2xl p-6 shadow-sm text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">One-click download</h3>
            <p className="text-sm text-muted-foreground">
              Save the PDF or keep browsing—you’ll get the latest experience and project details.
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={resumeUrl}
                  download
                  onClick={handleResumeDownload}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background font-medium hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </TooltipTrigger>
              <TooltipContent>Downloads a fresh copy of my resume.</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ContactSection = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');
  const contactEmail = 'hello@babjikilaru.com';
  const contactPhone = '+1 (555) 123-4567';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const mailto = `mailto:${contactEmail}?subject=Portfolio%20Contact%20from%20${encodeURIComponent(
      formState.name || 'Visitor',
    )}&body=${encodeURIComponent(formState.message)}%0D%0A%0D%0AReply%20to:%20${encodeURIComponent(formState.email)}`;
    window.location.href = mailto;
    setStatus('sent');
    toast({
      title: 'Draft ready',
      description: 'Opening your email client with your details pre-filled.',
    });
  };

  return (
    <section id="contact" className="section-anchor py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center gap-2 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-neutral-600" aria-hidden />
            Contact Me
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Let’s build something together.</h2>
          <div className="mx-auto h-1.5 w-24 sm:w-28 rounded-full bg-neutral-700" aria-hidden />
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4 bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                Name
                <input
                  required
                  type="text"
                  value={formState.name}
                  onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                  className="input"
                  placeholder="Your name"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                Email
                <input
                  required
                  type="email"
                  value={formState.email}
                  onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                  className="input"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm text-muted-foreground">
              Message
              <textarea
                required
                value={formState.message}
                onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
                className="input min-h-[140px] resize-vertical"
                placeholder="What can we collaborate on?"
              />
            </label>

            <div className="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:-translate-y-0.5 transition-transform duration-200"
                  >
                    <Send className="w-4 h-4" />
                    Send message
                  </button>
                </TooltipTrigger>
                <TooltipContent>Opens your default email client with this message.</TooltipContent>
              </Tooltip>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary"
              >
                <Mail className="w-4 h-4" />
                Prefer email? {contactEmail}
              </a>
            </div>
            {status === 'sent' && <p className="text-sm text-green-600">Opening your email client...</p>}
          </form>

          <div className="bg-neutral-100 border border-neutral-200 rounded-2xl p-6 shadow-inner shadow-[0_12px_32px_-24px_rgba(0,0,0,0.45)] space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Get In Touch</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I&apos;m open to new opportunities and always happy to connect. Have a question or just want to chat? Drop me a message and I&apos;ll get back to you promptly!
            </p>

            <div className="space-y-2">
              <a
                href={`mailto:${contactEmail}`}
                className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-white/70"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-600 shadow-sm">
                  <Mail className="h-5 w-5" aria-hidden />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">Email</span>
                  <span className="text-sm text-muted-foreground group-hover:underline underline-offset-2">{contactEmail}</span>
                </div>
              </a>

              <a
                href={`tel:${contactPhone.replace(/[^\d+]/g, '')}`}
                className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-white/70"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-600 shadow-sm">
                  <Phone className="h-5 w-5" aria-hidden />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">Phone</span>
                  <span className="text-sm text-muted-foreground group-hover:underline underline-offset-2">{contactPhone}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
