import { useEffect, useMemo, useState } from 'react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

type WeightedSkill = {
  name: string;
  weight: number; // 1-5 scale
};

type PositionedSkill = {
  name: string;
  weight: number;
  x: number;
  y: number;
  animationDuration: number;
  delay: number;
};

const SKILLS: WeightedSkill[] = [
  // Backend / Core
  { name: 'Java', weight: 5 },
  { name: 'Spring Boot', weight: 5 },
  { name: 'Microservices', weight: 5 },
  { name: 'RESTful APIs', weight: 5 },
  { name: 'Hibernate', weight: 4 },
  { name: 'J2EE', weight: 3 },
  { name: 'Node.js', weight: 3 },
  { name: 'Express.js', weight: 3 },
  { name: 'FastAPI', weight: 2 },
  { name: 'Python (scripting)', weight: 2 },

  // Frontend
  { name: 'React.js', weight: 4 },
  { name: 'Angular', weight: 3 },
  { name: 'Next.js', weight: 3 },
  { name: 'TypeScript', weight: 4 },
  { name: 'JavaScript (ES6+)', weight: 4 },
  { name: 'Material UI', weight: 3 },
  { name: 'Bootstrap', weight: 2 },
  { name: 'Responsive Web Design', weight: 3 },
  { name: 'WCAG Accessibility', weight: 2 },
  { name: 'HTML5', weight: 3 },
  { name: 'CSS3', weight: 3 },

  // APIs & Security
  { name: 'GraphQL', weight: 3 },
  { name: 'OAuth2', weight: 4 },
  { name: 'JWT', weight: 4 },
  { name: 'RBAC', weight: 3 },
  { name: 'Swagger', weight: 3 },
  { name: 'Postman', weight: 3 },
  { name: 'API Gateway Security', weight: 3 },

  // Cloud & DevOps
  { name: 'AWS', weight: 5 },
  { name: 'EC2', weight: 4 },
  { name: 'Lambda', weight: 4 },
  { name: 'ECS', weight: 3 },
  { name: 'RDS', weight: 4 },
  { name: 'S3', weight: 4 },
  { name: 'CloudFormation', weight: 3 },
  { name: 'API Gateway', weight: 3 },
  { name: 'Azure', weight: 3 },
  { name: 'Docker', weight: 4 },
  { name: 'Kubernetes', weight: 4 },
  { name: 'Terraform', weight: 3 },
  { name: 'GitHub Actions', weight: 3 },
  { name: 'Jenkins', weight: 3 },
  { name: 'GitLab CI/CD', weight: 2 },

  // Databases & Data
  { name: 'PostgreSQL', weight: 4 },
  { name: 'MySQL', weight: 3 },
  { name: 'Oracle', weight: 3 },
  { name: 'MongoDB', weight: 3 },
  { name: 'Redis', weight: 3 },
  { name: 'SQL Server', weight: 2 },
  { name: 'Data Modeling', weight: 3 },
  { name: 'Query Optimization', weight: 4 },
  { name: 'Caching Strategies', weight: 3 },

  // Testing & QA
  { name: 'JUnit', weight: 4 },
  { name: 'Mockito', weight: 3 },
  { name: 'Selenium', weight: 2 },
  { name: 'Cypress', weight: 2 },
  { name: 'Load Testing', weight: 2 },
  { name: 'Code Coverage', weight: 2 },
  { name: 'TDD/BDD', weight: 3 },

  // Observability
  { name: 'Prometheus', weight: 3 },
  { name: 'Grafana', weight: 3 },
  { name: 'ELK Stack', weight: 3 },
  { name: 'Splunk', weight: 2 },
  { name: 'APM', weight: 3 },
  { name: 'Log Management', weight: 3 },

  // Collaboration
  { name: 'Agile (Scrum/Kanban)', weight: 3 },
  { name: 'JIRA', weight: 3 },
  { name: 'Confluence', weight: 2 },
  { name: 'Sprint Planning', weight: 2 },
  { name: 'Code Reviews', weight: 3 },
];

const createRng = (seed = 1337) => {
  let value = seed % 2147483647;
  return () => {
    value = (value * 48271) % 2147483647;
    return value / 2147483647;
  };
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

type Zone = { left: number; width: number; padding: number; safeTop: number; heightLimit: number };

const generatePositions = (count: number, isMobile: boolean, zone: Zone): PositionedSkill[] => {
  const rng = createRng(42);
  const placed: PositionedSkill[] = [];

  const safeTopPercent = zone.safeTop;
  const canvasPadding = zone.padding;
  const xMin = zone.left + canvasPadding;
  const xMax = zone.left + zone.width - canvasPadding;
  const yMax = zone.heightLimit;
  const faceCenterX = zone.left + zone.width * (isMobile ? 0.42 : 0.45);
  const faceCenterY = isMobile ? 58 : 60;
  const faceRadiusX = isMobile ? 12 : 14;
  const faceRadiusY = isMobile ? 16 : 18;

  const biasCenterX = zone.left + zone.width * (isMobile ? 0.42 : 0.44);
  const biasCenterY = isMobile ? 58 : 60;
  const biasRadiusX = zone.width * (isMobile ? 0.6 : 0.55);
  const biasRadiusY = zone.width * (isMobile ? 0.56 : 0.5);

  const sortedSkills = [...SKILLS].sort((a, b) => b.weight - a.weight);

  const maxAttempts = 420;

  for (let i = 0; i < count; i += 1) {
    const skill = sortedSkills[i % sortedSkills.length];
    const minDistanceBase = skill.weight >= 4 ? 10 : skill.weight >= 3 ? 9 : 8;

    let attempts = 0;
    let finalX = biasCenterX;
    let finalY = biasCenterY;
    let placedOk = false;

    while (attempts < maxAttempts && !placedOk) {
      const angle = rng() * Math.PI * 2;
      const radius = Math.sqrt(rng());
      const biasX = biasCenterX + Math.cos(angle) * biasRadiusX * radius;
      const biasY = biasCenterY + Math.sin(angle) * biasRadiusY * radius;

      const useUniform = rng() > 0.8;
      const candidateX = useUniform ? xMin + rng() * (xMax - xMin) : biasX;
      const candidateY = useUniform
        ? safeTopPercent + rng() * (yMax - safeTopPercent)
        : biasY;

      finalX = clamp(candidateX, xMin, xMax);
      finalY = clamp(candidateY, safeTopPercent, yMax);

      const normX = (finalX - faceCenterX) / faceRadiusX;
      const normY = (finalY - faceCenterY) / faceRadiusY;
      const inFace = normX * normX + normY * normY <= 1.05;
      if (inFace) {
        attempts += 1;
        continue;
      }

      const tooClose = placed.some((other) => {
        const dx = finalX - other.x;
        const dy = finalY - other.y;
        const distance = Math.hypot(dx, dy);
        const nameSizeFactor = Math.min(skill.name.length * 0.14, 4); // rough width factor to reduce collisions
        const threshold = Math.min(minDistanceBase + nameSizeFactor, 13);
        return distance < threshold;
      });

      if (!tooClose) {
        placedOk = true;
      }

      attempts += 1;
    }

    const duration = 5 + rng() * 2.2;
    const delay = rng() * 1.4;

    placed.push({
      name: skill.name,
      weight: skill.weight,
      x: finalX,
      y: finalY,
      animationDuration: duration,
      delay,
    });
  }

  return placed;
};

const useViewportConfig = () => {
  const [count, setCount] = useState(60);
  const [zone, setZone] = useState<Zone>({ left: 0, width: 100, padding: 3, safeTop: 14, heightLimit: 94 });

  useEffect(() => {
    const update = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 1280;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      if (isMobile) {
        setCount(20);
        setZone({ left: 0, width: 100, padding: 4, safeTop: 18, heightLimit: 92 });
      } else if (isTablet) {
        setCount(30);
        setZone({ left: 0, width: 100, padding: 3.5, safeTop: 16, heightLimit: 93 });
      } else {
        setCount(42);
        setZone({ left: 0, width: 100, padding: 3, safeTop: 14, heightLimit: 94 });
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return { count, zone };
};

const weightToStyle = (weight: number) => {
  const minSize = 13;
  const maxSize = 24;
  const minOpacity = 0.45;
  const maxOpacity = 0.9;
  const minWeight = 400;
  const maxWeight = 600;

  const t = (weight - 1) / 4; // normalize 1-5 to 0-1
  const fontSize = minSize + (maxSize - minSize) * t;
  const opacity = minOpacity + (maxOpacity - minOpacity) * t;
  const fontWeight = Math.round(minWeight + (maxWeight - minWeight) * t);

  return { fontSize, opacity, fontWeight };
};

const FloatingSkills = ({ isVisible }: { isVisible: boolean }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { count, zone } = useViewportConfig();
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  const skills = useMemo(() => generatePositions(count, isMobile, zone), [count, isMobile, zone]);

  if (!isVisible) return null;

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="grid grid-cols-2 gap-2 bg-background/90 border border-border rounded-2xl p-4 shadow-sm">
          {skills.slice(0, 10).map((skill) => {
            const style = weightToStyle(skill.weight);
            return (
              <span
                key={skill.name}
                className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-xl bg-secondary text-foreground/90"
                style={{ fontSize: `${style.fontSize}px`, fontWeight: style.fontWeight }}
              >
                {skill.name}
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {skills.map((skill) => {
        const style = weightToStyle(skill.weight);
        return (
          <div
            key={`${skill.name}-${skill.x}-${skill.y}`}
            className="absolute select-none animate-float"
            style={{
              left: `${skill.x}%`,
              top: `${skill.y}%`,
              animationDuration: `${skill.animationDuration}s`,
              animationDelay: `${skill.delay}s`,
              opacity: style.opacity,
              maxWidth: '38%',
            }}
          >
            <span
              className="cursor-default transition-all duration-200 hover:scale-105 hover:opacity-100"
              style={{ fontSize: `${style.fontSize}px`, fontWeight: style.fontWeight }}
            >
              {skill.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default FloatingSkills;
