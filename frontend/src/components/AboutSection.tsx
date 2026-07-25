import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && sectionRef.current) {
      const elements = contentRef.current.querySelectorAll(".about-text");

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            toggleActions: "play none none none",
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
        {/* Section Label */}
        <div className="about-text mb-16">
          <span className="font-body text-xs tracking-[0.5em] text-muted-foreground/50">
            01 — ABOUT ME
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-12">
          <h2 className="about-text font-display text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="char-emerald">Designing</span> immersive digital
            experiences where creativity meets code.
          </h2>

          {/* Paragraph 1 */}
          <p className="about-text font-body text-lg leading-relaxed text-foreground/70 md:text-xl">
            Hi, I'm <span className="text-foreground font-medium">Rohit Gupta</span>,
            a passionate Full-Stack Developer based in{" "}
            <span className="text-foreground font-medium">Mumbai, India</span>.
            I enjoy creating modern, interactive websites that combine beautiful
            design with smooth user experiences. My goal is to build products
            that people love using while continuously learning new technologies.
          </p>

          {/* Paragraph 2 */}
          <p className="about-text font-body text-lg leading-relaxed text-foreground/70 md:text-xl">
            I specialize in the{" "}
            <span className="text-foreground">MERN Stack</span> and have a
            strong interest in creative web development. I love experimenting
            with{" "}
            <span className="text-foreground">
              GSAP, Three.js, Framer Motion
            </span>{" "}
            and AI-powered tools to craft engaging digital experiences with
            stunning animations, 3D interactions, and modern UI design.
          </p>

          {/* Paragraph 3 */}
          <p className="about-text font-body text-lg leading-relaxed text-foreground/70 md:text-xl">
            Every project is an opportunity to improve my skills, solve
            real-world problems, and push the boundaries of what's possible on
            the web. Whether I'm building a portfolio, dashboard, SaaS product,
            or AI application, I focus on writing clean, scalable code while
            creating memorable user experiences.
          </p>

          {/* Stats */}
          <div className="about-text grid grid-cols-2 gap-8 pt-12 md:grid-cols-4">
            {[
              {
                value: "20+",
                label: "Projects Built",
              },
              {
                value: "MERN",
                label: "Primary Stack",
              },
              {
                value: "3D",
                label: "Creative Web",
              },
              {
                value: "∞",
                label: "Learning",
              },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="font-display text-3xl font-medium text-foreground md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 font-body text-xs tracking-[0.2em] uppercase text-foreground/40">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;