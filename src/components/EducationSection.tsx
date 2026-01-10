import { GraduationCap, MapPin, Calendar, Sparkles } from 'lucide-react';

type EducationItem = {
  degree: string;
  university: string;
  location: string;
  dates: string;
  bullets: string[];
};

const educationData: EducationItem[] = [
  {
    degree: 'Master of Science in Computer Science',
    university: 'University of Missouri–Kansas City',
    location: 'USA',
    dates: 'Aug 2022 – May 2024',
    bullets: [
      'Advanced coursework in distributed systems, cloud computing, and data engineering.',
      'Built full-stack and backend projects using Java/Spring Boot and modern web tooling.',
      'Focus on scalable APIs, databases, and system design foundations.',
      'Capstone/projects emphasizing reliability, performance, and clean architecture.',
    ],
  },
  {
    degree: 'B.Tech in Computer Science and Engineering',
    university: 'SRM University, AP',
    location: 'India',
    dates: 'Jul 2018 – May 2022',
    bullets: [
      'Strong CS fundamentals: data structures, algorithms, OOP, and DBMS.',
      'Built web applications and backend services; practiced REST API development.',
      'Team projects with Agile collaboration and code reviews.',
      'Coursework/projects in operating systems, networking, and software engineering.',
    ],
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="section-anchor relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div className="container relative mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/90 px-4 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-neutral-600" aria-hidden />
            Academic Background
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">Education</h2>
            <div className="mx-auto h-1.5 w-24 rounded-full bg-neutral-700" aria-hidden />
            <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
              My academic journey that built the foundation for technical expertise and problem-solving skills.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {educationData.map((item) => (
            <article
              key={item.degree}
              className="h-full rounded-3xl border border-neutral-200 bg-neutral-100 p-6 shadow-inner shadow-[0_12px_32px_-24px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-foreground leading-tight">{item.degree}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-foreground">
                    <span className="font-semibold text-foreground">{item.university}</span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700">
                      <MapPin className="h-3.5 w-3.5 text-neutral-600" aria-hidden />
                      {item.location}
                    </span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-foreground">
                    <Calendar className="h-4 w-4 text-neutral-600" aria-hidden />
                    {item.dates}
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm">
                  <GraduationCap className="h-5 w-5" aria-hidden />
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
