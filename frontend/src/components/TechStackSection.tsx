import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'LangChain', icon: 'https://avatars.githubusercontent.com/u/126733545?v=4' },
  { name: 'LangGraph', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  
];

const TechStackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (circleRef.current && sectionRef.current) {
      const items = circleRef.current.querySelectorAll('.tech-item');

      // Animate items on scroll
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 flex min-h-screen items-center justify-center px-6 py-32"
    >
      <div className="relative mx-auto w-full max-w-5xl">
        {/* Section label */}
        <div className="absolute left-0 top-0">
          <span className="font-body text-xs tracking-[0.5em] text-muted-foreground/50">
            02 — TECHNOLOGY
          </span>
        </div>

        {/* Center text */}
        <div className="relative z-10 text-center">
          <h2 className="font-display text-4xl font-medium text-foreground md:text-5xl lg:text-6xl">
            Tech Stack
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-muted-foreground">
            Tools and technologies I use to bring ideas to life
          </p>
        </div>

        {/* Circular tech icons */}
        <div
          ref={circleRef}
          className="relative mx-auto mt-16 h-[400px] w-[400px] md:h-[500px] md:w-[500px] lg:h-[550px] lg:w-[550px]"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-muted/20" />
          
          {/* Inner rings for visual effect */}
          <div className="absolute inset-[20%] rounded-full border border-muted/10" />
          <div className="absolute inset-[40%] rounded-full border border-muted/5" />

          {/* Tech icons positioned in circle */}
          {technologies.map((tech, i) => {
            const isOuter = i % 2 === 0;
            const radius = isOuter ? 48 : 28; // Outer and inner rings
            // Offset the inner ring slightly to interleave
            const angleOffset = isOuter ? 0 : Math.PI / technologies.length;
            const angle = (i / technologies.length) * Math.PI * 2 - Math.PI / 2 + angleOffset;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;

            return (
              <div
                key={tech.name}
                className="tech-item group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {/* Icon container */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-muted/30 bg-background/80 backdrop-blur-sm transition-all duration-500 group-hover:border-primary/50 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] md:h-20 md:w-20">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110 md:h-10 md:w-10"
                    style={{ filter: tech.invert ? 'invert(1) brightness(2)' : 'none' }}
                  />
                </div>

                {/* Tooltip */}
                <div className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                  <div className="rounded-md border border-muted/30 bg-background/90 px-3 py-1.5 backdrop-blur-sm">
                    <span className="font-body text-xs text-foreground">{tech.name}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Center glow */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, hsl(160 84% 39% / 0.1) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
