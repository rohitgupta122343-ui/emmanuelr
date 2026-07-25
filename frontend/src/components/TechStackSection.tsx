import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Embedded Bulletproof SVGs for Core Adobe Tools
const PHOTOSHOP_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23001E36" d="M0 0h512v512H0z"/><path fill="%2331A8FF" d="M120 120h120c40 0 70 20 70 60s-30 60-70 60h-60v152h-60V120zm60 48v72h50c20 0 30-10 30-36s-10-36-30-36h-50zm160 144c0 40 30 60 70 60 25 0 45-5 55-15v-45c-10 10-25 15-40 15-20 0-25-10-25-25v-75h65v-45h-65v-40h-60v40h-30v45h30v85z"/></svg>';
const LIGHTROOM_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23001E36" d="M0 0h512v512H0z"/><path fill="%2331A8FF" d="M120 120h60v220h120v48H120V120zm140 120h50c25 0 40 10 40 30 0 15-10 25-25 28l35 62h-60l-30-55h-10v55h-50V240zm50 40c5 0 10-3 10-8s-5-8-10-8h-10v16h10z"/></svg>';
const INDESIGN_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%232B001B" d="M0 0h512v512H0z"/><path fill="%23FF3366" d="M120 120h60v272h-60V120zm120 80h60v32c20-25 45-37 75-37 50 0 85 35 85 95v102h-60V295c0-35-20-50-45-50-30 0-55 25-55 60v87h-60V200z"/></svg>';

// Carefully Selected Professional Design Suite
const techStack = [
  { name: 'Photoshop', category: 'Raster & Editing', icon: PHOTOSHOP_SVG },
  { name: 'Illustrator', category: 'Vector & Branding', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-line.svg' },
  { name: 'Figma', category: 'UI/UX & Systems', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  { name: 'InDesign', category: 'Editorial & Print', icon: INDESIGN_SVG },
  { name: 'After Effects', category: 'Motion Graphics', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg' },
  { name: 'Premiere Pro', category: 'Video Production', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg' },
  { name: 'Blender', category: '3D Art & Lighting', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg' },
  { name: 'Cinema 4D', category: '3D & Motion Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cinema4d/cinema4d-original.svg' },
  { name: 'Lightroom', category: 'Color Grading', icon: LIGHTROOM_SVG },
  { name: 'Procreate', category: 'Digital Illustration', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/procreate/procreate-original.svg' },
  { name: 'XD', category: 'Experience Prototyping', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-plain.svg' },
  { name: 'Canva', category: 'Quick Layouts', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg' },
];

const TechStackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const orbitTweenRef = useRef<gsap.core.Tween | null>(null);
  const counterTweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    if (circleRef.current && sectionRef.current) {
      const items = circleRef.current.querySelectorAll('.tech-item');
      const iconBadges = circleRef.current.querySelectorAll('.icon-badge');

      // 1. Entrance Pop-in Animation
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 2. Orbital Clockwise Rotation
      orbitTweenRef.current = gsap.to(circleRef.current, {
        rotation: 360,
        duration: 100,
        repeat: -1,
        ease: 'none',
      });

      // 3. Counter-Rotate Badges so Logos Stay Upright During Orbital Rotation
      iconBadges.forEach((badge) => {
        const tween = gsap.to(badge, {
          rotation: -360,
          duration: 100,
          repeat: -1,
          ease: 'none',
        });
        counterTweensRef.current.push(tween);
      });
    }

    return () => {
      if (orbitTweenRef.current) orbitTweenRef.current.kill();
      counterTweensRef.current.forEach((t) => t.kill());
    };
  }, []);

  const handleMouseEnter = () => {
    if (orbitTweenRef.current) orbitTweenRef.current.pause();
    counterTweensRef.current.forEach((t) => t.pause());
  };

  const handleMouseLeave = () => {
    if (orbitTweenRef.current) orbitTweenRef.current.play();
    counterTweensRef.current.forEach((t) => t.play());
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-20 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-28"
    >
      <div className="relative mx-auto w-full max-w-5xl">
        {/* Top Minimal Label */}
        <div className="mb-6 text-center md:text-left">
          <span className="font-body text-xs tracking-[0.5em] text-muted-foreground/60 uppercase">
            02 — TOOLKIT & EXPERTISE
          </span>
        </div>

        {/* Section Heading */}
        <div className="relative z-10 text-center">
          <h2 className="font-display text-4xl font-medium tracking-wide text-foreground md:text-5xl lg:text-6xl">
            Design <span className="text-[#002E97]">Ecosystem</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-sm text-muted-foreground md:text-base">
            Essential creative suite and digital tools leveraged by Emmanuel Rebario to craft high-impact brand identities and visual experiences.
          </p>
        </div>

        {/* Interactive Orbital Canvas */}
        <div
          ref={circleRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative mx-auto mt-14 h-[380px] w-[380px] sm:h-[460px] sm:w-[460px] md:h-[520px] md:w-[520px] lg:h-[580px] lg:w-[580px]"
        >
          {/* Orbital Concentric Geometry Rings */}
          <div className="absolute inset-0 rounded-full border border-white/10 shadow-[inset_0_0_30px_rgba(255,255,255,0.02)]" />
          <div className="absolute inset-[18%] rounded-full border border-white/5" />
          <div className="absolute inset-[36%] rounded-full border border-[#002E97]/25" />

          {/* Software Icons Positioned in Radial Grid */}
          {techStack.map((tech, i) => {
            const isOuter = i % 2 === 0;
            const radius = isOuter ? 46 : 28;
            const angleOffset = isOuter ? 0 : Math.PI / techStack.length;
            const angle = (i / techStack.length) * Math.PI * 2 - Math.PI / 2 + angleOffset;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;

            return (
              <div
                key={`${tech.name}-${i}`}
                className="tech-item group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {/* Icon Container with Glassmorphism */}
                <div className="icon-badge relative flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black/60 backdrop-blur-md transition-all duration-300 group-hover:scale-125 group-hover:border-[#002E97] group-hover:bg-black/95 group-hover:shadow-[0_0_30px_rgba(0,46,151,0.75)] md:h-16 md:w-16">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110 md:h-8 md:w-8"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PHOTOSHOP_SVG;
                    }}
                  />
                </div>

                {/* Professional Tooltip */}
                <div className="pointer-events-none absolute left-1/2 top-full z-40 mt-3 -translate-x-1/2 translate-y-2 whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex flex-col items-center rounded-lg border border-[#002E97]/50 bg-black/95 px-3.5 py-1.5 shadow-2xl backdrop-blur-xl">
                    <span className="font-body text-xs font-semibold text-white tracking-wide">{tech.name}</span>
                    <span className="font-body text-[10px] text-muted-foreground/70">{tech.category}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Central Blue Ambient Radial Glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(0, 46, 151, 0.35) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;