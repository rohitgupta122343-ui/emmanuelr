import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // gsap.context se cleanup handling hoti hai (React Strict Mode friendly)
    const ctx = gsap.context(() => {
      if (contentRef.current && sectionRef.current) {
        const elements = contentRef.current.querySelectorAll(".about-text");

        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom center",
              toggleActions: "play none none reverse", // Smooth reverse when scrolling up
            },
          }
        );
      }
    }, sectionRef);

    // Unmount par triggers ko destroy karna taaki Three.js Canvas na ruke
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 min-h-screen px-6 py-32 md:px-12 lg:px-24"
    >
      <div ref={contentRef} className="mx-auto max-w-5xl">
        {/* Section Label */}
        <div className="about-text mb-16 will-change-transform">
          <span className="font-body text-xs tracking-[0.5em] text-muted-foreground/50">
            01 — ABOUT ME
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-12">
          <h2 className="about-text font-display text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl will-change-transform">
            <span className="char-blue">Crafting</span> compelling visual 
            identities where design strategy meets storytelling.
          </h2>

          {/* Paragraph 1 */}
          <p className="about-text font-body text-lg leading-relaxed text-foreground/70 md:text-xl will-change-transform">
            Hi, I'm <span className="text-foreground font-medium">Emmanuel Rebario</span>, 
            a passionate Graphic Designer dedicated to transforming complex ideas into 
            striking, memorable visual narratives. I specialize in crafting distinctive brand 
            identities, digital assets, and print media that elevate brand presence.
          </p>

          {/* Paragraph 2 */}
          <p className="about-text font-body text-lg leading-relaxed text-foreground/70 md:text-xl will-change-transform">
            My core expertise lies in{" "}
            <span className="text-foreground">Brand Identity & Typography</span>, 
            blending creative intuition with structured design principles. I work seamlessly across{" "}
            <span className="text-foreground">
              Adobe Creative Suite, Figma, and Motion Design
            </span>{" "}
            to build cohesive aesthetic ecosystems tailored to every client's unique vision.
          </p>

          {/* Paragraph 3 */}
          <p className="about-text font-body text-lg leading-relaxed text-foreground/70 md:text-xl will-change-transform">
            Every project is a balance of art and purpose. Whether designing editorial layouts, 
            packaging, digital campaigns, or comprehensive brand guidelines, I focus on precision, 
            visual clarity, and creating designs that truly resonate with target audiences.
          </p>

          {/* Stats */}
          <div className="about-text grid grid-cols-2 gap-8 pt-12 md:grid-cols-4 will-change-transform">
            {[
              {
                value: "30+",
                label: "Brands Transformed",
              },
              {
                value: "UI/UX",
                label: "Visual Focus",
              },
              {
                value: "Adobe",
                label: "Primary Tooling",
              },
              {
                value: "∞",
                label: "Creativity",
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