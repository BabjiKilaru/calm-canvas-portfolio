interface Skill {
  name: string;
  tier: 'primary' | 'secondary' | 'tertiary';
  x: number;
  y: number;
  animationDuration: number;
}

const skills: Skill[] = [
  // Primary skills - large and bold, closest to portrait
  { name: 'Java', tier: 'primary', x: 10, y: 10, animationDuration: 6 },
  { name: 'Spring Boot', tier: 'primary', x: 18, y: 28, animationDuration: 7 },
  { name: 'Microservices', tier: 'primary', x: 6, y: 45, animationDuration: 5 },
  { name: 'React.js', tier: 'primary', x: 14, y: 62, animationDuration: 6.5 },
  { name: 'AWS', tier: 'primary', x: 72, y: 12, animationDuration: 5.5 },
  { name: 'Kubernetes', tier: 'primary', x: 68, y: 30, animationDuration: 6 },
  
  // Secondary skills - medium, slightly farther
  { name: 'Node.js', tier: 'secondary', x: 75, y: 48, animationDuration: 6 },
  { name: 'FastAPI', tier: 'secondary', x: 8, y: 78, animationDuration: 7 },
  { name: 'REST APIs', tier: 'secondary', x: 70, y: 62, animationDuration: 5.5 },
  { name: 'Docker', tier: 'secondary', x: 78, y: 75, animationDuration: 6.5 },
  { name: 'PostgreSQL', tier: 'secondary', x: 20, y: 82, animationDuration: 5 },
  { name: 'MongoDB', tier: 'secondary', x: 65, y: 85, animationDuration: 6 },
  { name: 'Angular', tier: 'secondary', x: 5, y: 92, animationDuration: 7 },
  
  // Tertiary skills - small and light, drift in background
  { name: 'Git', tier: 'tertiary', x: 25, y: 5, animationDuration: 6 },
  { name: 'Jenkins', tier: 'tertiary', x: 85, y: 8, animationDuration: 7 },
  { name: 'Terraform', tier: 'tertiary', x: 88, y: 38, animationDuration: 5.5 },
  { name: 'Prometheus', tier: 'tertiary', x: 2, y: 22, animationDuration: 6 },
  { name: 'Grafana', tier: 'tertiary', x: 90, y: 58, animationDuration: 5 },
  { name: 'Postman', tier: 'tertiary', x: 35, y: 92, animationDuration: 6.5 },
  { name: 'Swagger', tier: 'tertiary', x: 85, y: 88, animationDuration: 5.5 },
  { name: 'GitHub Actions', tier: 'tertiary', x: 50, y: 95, animationDuration: 6 },
];

const FloatingSkills = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className={`absolute select-none animate-float ${
            skill.tier === 'primary' ? 'skill-primary' : 
            skill.tier === 'secondary' ? 'skill-secondary' : 'skill-tertiary'
          }`}
          style={{
            left: `${skill.x}%`,
            top: `${skill.y}%`,
            animationDuration: `${skill.animationDuration}s`,
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <span className="hover:pointer-events-auto cursor-default transition-all duration-200 hover:scale-110 hover:opacity-100">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FloatingSkills;
