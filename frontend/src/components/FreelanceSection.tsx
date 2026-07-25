import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Web Development',
    description: 'Building responsive, fast, and scalable web applications using modern technologies.',
  },
  {
    title: 'Frontend Development',
    description: 'Creating beautiful, interactive, and user-friendly interfaces with React and Tailwind CSS.',
  },
  {
    title: 'Backend Development',
    description: 'Developing secure REST APIs and scalable backend services with Node.js and Express.',
  },
  {
    title: 'Learning & Innovation',
    description: 'Continuously exploring AI, 3D web experiences, and modern development tools.',
  },
];

const OpportunitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && sectionRef.current) {
      const elements = contentRef.current.querySelectorAll('.opportunity-item');

      gsap.fromTo(
        elements,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
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
      className="relative z-20 min-h-screen px-6 py-32 md:px-12 lg:px-24"
    >
      <div ref={contentRef} className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-body text-xs tracking-[0.5em] text-muted-foreground/50">
            04 — OPEN TO OPPORTUNITIES
          </span>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Side */}
          <div className="opportunity-item">
            <h2 className="font-display text-3xl font-light leading-relaxed text-foreground md:text-4xl lg:text-5xl">
              Let's build something{' '}
              <span className="hover-emerald">amazing</span> together.
            </h2>

            <p className="mt-8 font-body text-lg text-muted-foreground">
              I'm a passionate Full Stack Developer focused on building
              modern, responsive, and high-performance web applications.
              I'm always excited to work on meaningful projects and
              continuously improve my skills.
            </p>

            <p className="mt-4 font-body text-muted-foreground">
              Currently, I'm open to internships, full-time opportunities,
              collaborations, and exciting projects where I can contribute,
              learn, and create impactful digital experiences.
            </p>
          </div>

          {/* Right Side */}
          <div className="space-y-8">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="opportunity-item group border-b border-muted/10 pb-8 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl text-foreground transition-colors duration-300 group-hover:text-foreground/80">
                      {service.title}
                    </h3>

                    <p className="mt-2 font-body text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  <span className="font-body text-xs text-muted-foreground/40">
                    0{i + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="opportunity-item mt-24 text-center">
          <p className="font-body text-sm tracking-[0.3em] text-muted-foreground/60">
            LET'S CONNECT
          </p>

          <a
            href="#contact"
            className="btn-minimal mt-6 inline-block px-10 py-4 text-base"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;