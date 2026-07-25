import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
  { name: 'Illustrator', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'InDesign', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/indesign/indesign-plain.svg' },
  { name: 'After Effects', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-plain.svg' },
  { name: 'Premiere Pro', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg' },
  { name: 'Blender', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
  { name: 'XD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg' },
  { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
  { name: 'Framer', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
];

const TechStackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (circleRef.current && sectionRef.current) {
      const items = circleRef.current.querySelectorAll('.tech-item');

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
            02 — TECH STACK
          </span>
        </div>

        {/* Center text */}
        <div className="relative z-10 text-center">
          <h2 className="font-display text-4xl font-medium text-foreground md:text-5xl lg:text-6xl">
            Tech Stack
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-muted-foreground">
            Tools, software, and tech Emmanuel Rebario uses to bring visual concepts to life
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

          {/* Icons positioned in circle */}
          {techStack.map((tech, i) => {
            const isOuter = i % 2 === 0;
            const radius = isOuter ? 48 : 28;
            const angleOffset = isOuter ? 0 : Math.PI / techStack.length;
            const angle = (i / techStack.length) * Math.PI * 2 - Math.PI / 2 + angleOffset;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;

            return (
              <div
                key={`${tech.name}-${i}`}
                className="tech-item group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {/* Icon container */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-muted/30 bg-background/80 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] md:h-20 md:w-20">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110 md:h-10 md:w-10"
                  />
                </div>

                {/* Tooltip */}
                <div className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 translate-y-2 whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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