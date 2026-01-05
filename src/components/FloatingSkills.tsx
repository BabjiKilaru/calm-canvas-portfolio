interface Skill {
  name: string;
  tier: 'primary' | 'secondary' | 'tertiary';
  x: number;
  y: number;
  animationDuration: number;
}

const skills: Skill[] = [
  // Primary skills - large and bold
  { name: 'Java', tier: 'primary', x: 12, y: 12, animationDuration: 6 },
  { name: 'Spring Boot', tier: 'primary', x: 20, y: 26, animationDuration: 7 },
  { name: 'Microservices', tier: 'primary', x: 8, y: 42, animationDuration: 5 },
  { name: 'React', tier: 'primary', x: 15, y: 56, animationDuration: 6.5 },
  { name: 'AWS', tier: 'primary', x: 70, y: 10, animationDuration: 5.5 },
  
  // Secondary skills - medium
  { name: 'Node.js', tier: 'secondary', x: 72, y: 35, animationDuration: 6 },
  { name: 'REST APIs', tier: 'secondary', x: 68, y: 48, animationDuration: 7 },
  { name: 'SQL', tier: 'secondary', x: 14, y: 70, animationDuration: 5.5 },
  { name: 'Docker', tier: 'secondary', x: 75, y: 58, animationDuration: 6.5 },
  { name: 'Kubernetes', tier: 'secondary', x: 10, y: 80, animationDuration: 5 },
  
  // Tertiary skills - small and light
  { name: 'Git', tier: 'tertiary', x: 22, y: 85, animationDuration: 6 },
  { name: 'Jenkins', tier: 'tertiary', x: 16, y: 92, animationDuration: 7 },
  { name: 'Terraform', tier: 'tertiary', x: 72, y: 72, animationDuration: 5.5 },
  { name: 'Grafana', tier: 'tertiary', x: 78, y: 82, animationDuration: 6 },
  { name: 'Postman', tier: 'tertiary', x: 65, y: 88, animationDuration: 5 },
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
