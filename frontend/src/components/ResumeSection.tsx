import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ResumeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // React Strict Mode & WebGL safe GSAP Context
    const ctx = gsap.context(() => {
      if (documentRef.current && sectionRef.current) {
        gsap.fromTo(
          documentRef.current,
          { 
            opacity: 0, 
            y: 50, 
            scale: 0.95 
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDownload = () => {
    const resumeUrl = 'https://ik.imagekit.io/0wmauyftj/resume/resume1.pdf%20(1).pdf';
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-20 flex min-h-screen items-center justify-center px-6 py-32"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* Section label */}
        <span className="font-body text-xs tracking-[0.5em] text-muted-foreground/50">
          05 — RESUME
        </span>

        {/* Document visualization */}
        <div
          ref={documentRef}
          className="group mx-auto mt-16 cursor-pointer will-change-transform"
          onClick={handleDownload}
        >
          {/* Paper effect - Flat 2D modern glassmorphism design */}
          <div className="relative mx-auto h-[400px] w-[280px] overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-500 group-hover:border-[#10b981]/50 group-hover:bg-white/10 group-hover:shadow-[0_0_50px_rgba(16,185,129,0.15)] md:h-[500px] md:w-[350px]">
            {/* Content lines */}
            <div className="space-y-6 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
              {/* Header */}
              <div className="space-y-2">
                <div className="h-6 w-32 rounded bg-white/30" />
                <div className="h-2 w-24 rounded bg-white/20" />
              </div>

              {/* Sections */}
              {[1, 2, 3].map((section) => (
                <div key={section} className="space-y-2.5">
                  <div className="h-3 w-20 rounded bg-[#10b981]/40" />
                  <div className="h-2 w-full rounded bg-white/15" />
                  <div className="h-2 w-4/5 rounded bg-white/15" />
                  <div className="h-2 w-3/5 rounded bg-white/15" />
                </div>
              ))}
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="rounded-full border border-[#10b981]/40 bg-[#10b981]/20 p-4 text-[#10b981] mb-3">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <span className="font-display text-base tracking-wider text-white">
                View & Download PDF
              </span>
            </div>
          </div>

          {/* Glow Shadow */}
          <div className="mx-auto mt-6 h-4 w-[200px] rounded-full bg-[#10b981]/10 blur-xl transition-all duration-500 group-hover:bg-[#10b981]/25 md:w-[250px]" />
        </div>

        {/* Download button */}
        <button
          onClick={handleDownload}
          className="mt-10 inline-flex items-center gap-3 rounded-md border border-white/20 bg-white/5 px-8 py-3.5 font-body text-sm text-white transition-all duration-300 hover:border-[#10b981] hover:bg-[#10b981]/10 hover:text-[#10b981]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Resume
        </button>

        <p className="mt-6 font-body text-xs text-muted-foreground/50">
          Last updated: January 2026 • PDF Format
        </p>
      </div>
    </section>
  );
};

export default ResumeSection;