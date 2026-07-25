import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// DUMMY PROJECTS - Replace with your actual projects
const projects = [
    {
      id: 1,
      title: 'perplexity-project',
      description: 'Perplexity AI Clone is a modern AI-powered search and chat application built with the MERN stack. It features real-time AI conversations, secure authentication, chat history, and a responsive UI, delivering a fast and seamless user experience.',
      image: 'https://ik.imagekit.io/0wmauyftj/perplexity/Screenshot%20(314).png?updatedAt=1784714817896',
      tags: ['React', 'Node', 'Langchain','Express','Langgraph'],
      year: '2026',
      liveDemo: 'https://perplexity-project-navy.vercel.app/',
      githubLink: 'https://github.com/rohitgupta122343-ui/perplexity-project'
    },
    {
      id: 2,
      title: 'Instagram',
      description: 'EvGenee is an intelligent EV slot booking platform featuring an integrated AI voice agent. It allows users to book high-speed charging slots hands-free while speaking with the AI, save their fleet details, check station availability on their own, and dispatch emergency roadside SOS when stranded.',
      image: 'https://api.microlink.io/?url=https://evgenee-hackathon.onrender.com/&screenshot=true&meta=false&embed=screenshot.url',
      tags: ['React', 'Node', 'AI Voice', 'Express', 'MongoDB'],
      year: '2026',
      liveDemo: 'https://evgenee-hackathon.onrender.com/',
      githubLink: 'https://github.com/RitulJain12/EvGenee_Hackathon'
    },
    {
      id: 3,
      title: 'Figma',
      description: 'A modern Figma-inspired design tool for creating, editing, and collaborating on UI/UX designs in real time.',
      image: 'https://ik.imagekit.io/rituls12/Screenshot%202026-01-24%20190655.png',
      tags: ['React'],
      liveDemo: "https://figma-nine-tan.vercel.app/",
      year: '2025'
    },
    {
      id: 4,
      title: 'Portfolio',
      description: 'A modern developer portfolio showcasing projects, skills, and creative web experiences.',
      image: 'https://ik.imagekit.io/rituls12/Screenshot%202026-01-24%20191000.png',
      tags: ['React', 'TypeScript', 'Css', ,'Tailwindcss', 'Node','Mongodb',],
      liveDemo: "#microservice",
      year: '2026'
    },

   
  ];







const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const projectCards = sectionRef.current.querySelectorAll('.project-card');

      projectCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            rotateY: i % 2 === 0 ? -15 : 15,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }
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
        <div className="space-y-32" style={{ perspective: '1500px' }}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="project-card group relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className={`flex flex-col gap-8 ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image */}
                <div className="relative flex-1 overflow-hidden rounded-sm group">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-center lg:px-12">
                  <span className="font-body text-xs tracking-[0.3em] text-muted-foreground/50">
                    {project.year}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-light text-foreground transition-colors duration-300 group-hover:text-foreground md:text-3xl lg:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 font-body text-muted-foreground">{project.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-muted/30 px-3 py-1 font-body text-xs text-muted-foreground"
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
                        className="btn-minimal"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubLink ? (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-minimal"
                      >
                        View Project
                      </a>
                    ) : (
                      <button className="btn-minimal">View Project</button>
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
