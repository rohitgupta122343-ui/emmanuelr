import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Embedded Bulletproof SVGs
const PHOTOSHOP_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23001E36" d="M0 0h512v512H0z"/><path fill="%2331A8FF" d="M120 120h120c40 0 70 20 70 60s-30 60-70 60h-60v152h-60V120zm60 48v72h50c20 0 30-10 30-36s-10-36-30-36h-50zm160 144c0 40 30 60 70 60 25 0 45-5 55-15v-45c-10 10-25 15-40 15-20 0-25-10-25-25v-75h65v-45h-65v-40h-60v40h-30v45h30v85z"/></svg>';
const LIGHTROOM_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23001E36" d="M0 0h512v512H0z"/><path fill="%2331A8FF" d="M120 120h60v220h120v48H120V120zm140 120h50c25 0 40 10 40 30 0 15-10 25-25 28l35 62h-60l-30-55h-10v55h-50V240zm50 40c5 0 10-3 10-8s-5-8-10-8h-10v16h10z"/></svg>';
const INDESIGN_SVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%232B001B" d="M0 0h512v512H0z"/><path fill="%23FF3366" d="M120 120h60v272h-60V120zm120 80h60v32c20-25 45-37 75-37 50 0 85 35 85 95v102h-60V295c0-35-20-50-45-50-30 0-55 25-55 60v87h-60V200z"/></svg>';

interface TechItem {
  name: string;
  category: string;
  icon: string;
}

const techStack: TechItem[] = [
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
  const [activeTech, setActiveTech] = useState<TechItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (circleRef.current && sectionRef.current) {
        const items = circleRef.current.querySelectorAll('.tech-item');

        // GSAP ka kaam bas Entrance Animation tak rakha hai
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-24 md:py-28"
    >
      {/* Dynamic CSS Keyframes inject kiye hain (Zero JS Overhead) */}
      <style>{`
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .orbit-spin {
          animation: spin-clockwise 90s linear infinite;
        }
        .counter-spin {
          animation: spin-counter 90s linear infinite;
        }
        .orbit-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="relative mx-auto w-full max-w-5xl">
        {/* Top Minimal Label */}
        <div className="mb-4 text-center md:mb-6 md:text-left">
          <span className="font-body text-[10px] tracking-[0.4em] text-muted-foreground/60 uppercase sm:text-xs sm:tracking-[0.5em]">
            02 — TOOLKIT & EXPERTISE
          </span>
        </div>

        {/* Section Heading */}
        <div className="relative z-10 text-center">
          <h2 className="font-display text-3xl font-medium tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            Design <span className="text-[#002E97]">Ecosystem</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-xs text-muted-foreground sm:text-sm md:mt-4 md:text-base">
            Essential creative suite and digital tools leveraged by Emmanuel Rebario to craft high-impact brand identities and visual experiences.
          </p>
        </div>

        {/* Interactive Orbital Canvas Container */}
        <div className="relative mx-auto mt-10 flex aspect-square w-[85vw] max-w-[340px] items-center justify-center sm:mt-14 sm:w-full sm:max-w-[460px] md:max-w-[520px] lg:max-w-[580px]">
          <div
            ref={circleRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false);
              setActiveTech(null);
            }}
            className={`relative h-full w-full orbit-spin ${isPaused ? 'orbit-paused' : ''}`}
          >
            {/* Orbital Rings */}
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-[18%] rounded-full border border-white/5" />
            <div className="absolute inset-[36%] rounded-full border border-[#002E97]/25" />

            {/* Central Display */}
            <div className={`pointer-events-none absolute inset-[36%] z-30 flex flex-col items-center justify-center rounded-full border border-[#002E97]/30 bg-black/70 text-center counter-spin ${isPaused ? 'orbit-paused' : ''}`}>
              {activeTech ? (
                <div className="flex flex-col items-center px-2">
                  <span className="font-body text-xs font-semibold text-white tracking-wide sm:text-sm md:text-base">
                    {activeTech.name}
                  </span>
                  <span className="mt-0.5 font-body text-[9px] text-[#31A8FF] sm:text-[11px]">
                    {activeTech.category}
                  </span>
                </div>
              ) : (
                <span className="font-body text-[9px] tracking-wider text-muted-foreground/60 uppercase sm:text-[10px]">
                  Tool Expertise
                </span>
              )}
            </div>

            {/* Software Icons */}
            {techStack.map((tech, i) => {
              const isOuter = i % 2 === 0;
              const radius = isOuter ? 44 : 27;
              const angleOffset = isOuter ? 0 : Math.PI / techStack.length;
              const angle = (i / techStack.length) * Math.PI * 2 - Math.PI / 2 + angleOffset;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;

              return (
                <div
                  key={`${tech.name}-${i}`}
                  className="tech-item group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onMouseEnter={() => setActiveTech(tech)}
                  onTouchStart={() => setActiveTech(tech)}
                >
                  <div className={`icon-badge counter-spin ${isPaused ? 'orbit-paused' : ''} relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/80 transition-all duration-300 group-hover:scale-125 group-hover:border-[#002E97] group-hover:bg-black sm:h-12 sm:w-12 md:h-16 md:w-16`}>
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="h-5 w-5 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6 md:h-8 md:w-8"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PHOTOSHOP_SVG;
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Central Blue Ambient Radial Glow (Optimized opacity, no heavy blur) */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '45%',
              height: '45%',
              background: 'radial-gradient(circle, rgba(0, 46, 151, 0.35) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;