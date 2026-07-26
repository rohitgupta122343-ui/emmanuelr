import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  liveDemo?: string;
  githubLink?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'REVERIE — Between Dreams and Reality',
    description: 'Reverie captures the fragile space between illusion and consciousness—a moment where reality softens and the mind drifts freely into the unknown. This piece is centered around the idea of escapism, where the boundaries of the physical world dissolve into something more surreal and emotionally driven.',
    image: 'https://ik.imagekit.io/0wmauyftj/emmanuel/Screenshot%20(348).png',
    tags: ['Photoshop', 'Illustrator'],
    year: '2026',
    liveDemo: 'https://www.behance.net/gallery/248050709/REVERIE-%28Music-cover-poster%29'
  },
  {
    id: 2,
    title: 'EvGenee',
    description: 'EvGenee is an intelligent EV slot booking platform featuring an integrated AI voice agent. It allows users to book high-speed charging slots hands-free while speaking with the AI, save their fleet details, check station availability on their own, and dispatch emergency roadside SOS when stranded.',
    image: 'https://api.microlink.io/?url=https://evgenee-hackathon.onrender.com/&screenshot=true&meta=false&embed=screenshot.url',
    tags: ['React', 'Node', 'AI Voice', 'Express', 'MongoDB'],
    year: '2026',
    liveDemo: 'https://evgenee-hackathon.onrender.com/',
    githubLink: 'https://github.com/RitulJain12/EvGenee_Hackathon'
  },
  {
    id: 3,
    title: 'Figma Tool',
    description: 'A modern Figma-inspired design tool for creating, editing, and collaborating on UI/UX designs in real time.',
    image: 'https://ik.imagekit.io/rituls12/Screenshot%202026-01-24%20190655.png',
    tags: ['React', 'TypeScript', 'TailwindCSS'],
    liveDemo: "https://figma-nine-tan.vercel.app/",
    year: '2025'
  },
  {
    id: 4,
    title: 'Portfolio',
    description: 'A modern developer portfolio showcasing projects, skills, and creative web experiences.',
    image: 'https://ik.imagekit.io/rituls12/Screenshot%202026-01-24%20191000.png',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Node', 'MongoDB'],
    liveDemo: "#microservice",
    year: '2026'
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // React Strict-mode safe GSAP context
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        const projectCards = sectionRef.current.querySelectorAll('.project-card');

        projectCards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 60,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 30%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 min-h-screen px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-24">
          <span className="font-body text-xs tracking-[0.5em] text-muted-foreground/50">
            03 — WORK
          </span>
          <h2 className="mt-4 font-display text-4xl font-light text-foreground md:text-5xl lg:text-6xl">
            Selected Projects
          </h2>
        </div>

        {/* Projects grid */}
        <div className="space-y-32">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="project-card group relative will-change-transform"
            >
              <div
                className={`flex flex-col gap-8 ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Card Container */}
                <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm transition-colors duration-300 group-hover:border-[#002E97]/50">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:opacity-10" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-center lg:px-12">
                  <span className="font-body text-xs tracking-[0.3em] text-muted-foreground/50">
                    {project.year}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-light text-foreground transition-colors duration-300 group-hover:text-[#31A8FF] md:text-3xl lg:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground/80 md:text-base">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={`${tag}-${tagIdx}`}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-body text-xs text-muted-foreground/90 backdrop-blur-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-4">
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-white/20 bg-white/5 px-5 py-2 font-body text-xs text-white transition-all hover:border-white hover:bg-white hover:text-black"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-white/10 px-5 py-2 font-body text-xs text-muted-foreground transition-all hover:border-white/40 hover:text-white"
                      >
                        View Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;