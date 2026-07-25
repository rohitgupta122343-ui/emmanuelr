import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from './NavLink';

gsap.registerPlugin(ScrollTrigger);

const ResumeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (documentRef.current && sectionRef.current) {
      gsap.fromTo(
        documentRef.current,
        { opacity: 0, y: 100, rotateX: -30 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
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

  const handleDownload = () => {
    // DUMMY: Replace with actual resume file URL
    // For now, this creates a placeholder download
    const link = document.createElement('a');
    link.href = 'https://ik.imagekit.io/0wmauyftj/resume/resume1.pdf%20(1).pdf'; // Replace with: '/resume.pdf' or your actual resume URL
    link.download = 'Rohit Resume (1).pdf';
     link.click();
   
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
          className="group mx-auto mt-16 cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={handleDownload}
        >
          {/* Paper effect */}
          <div className="relative mx-auto h-[400px] w-[280px] overflow-hidden rounded-sm border border-muted/20 bg-muted/5 p-8 transition-all duration-500 group-hover:border-muted/40 group-hover:shadow-[0_0_60px_rgba(255,255,255,0.05)] md:h-[500px] md:w-[350px]">
            {/* Content lines */}
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="h-6 w-32 rounded bg-foreground/20" />
                <div className="h-2 w-24 rounded bg-muted-foreground/20" />
              </div>

              {/* Sections */}
              {[1, 2, 3].map((section) => (
                <div key={section} className="space-y-2">
                  <div className="h-3 w-20 rounded bg-muted-foreground/15" />
                  <div className="h-2 w-full rounded bg-muted/30" />
                  <div className="h-2 w-4/5 rounded bg-muted/30" />
                  <div className="h-2 w-3/5 rounded bg-muted/30" />
                </div>
              ))}
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="font-display text-lg tracking-wider text-foreground">
                Download
              </span>
            </div>
          </div>

          {/* Shadow */}
          <div className="mx-auto mt-4 h-4 w-[200px] rounded-full bg-primary/10 blur-xl transition-all duration-500 group-hover:bg-primary/20 md:w-[250px]" />
        </div>

        {/* Download button */}
        <button
          onClick={handleDownload}
          className="btn-minimal mt-12 inline-flex items-center gap-3 px-8"
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
          {/* DUMMY: Update with your actual info */}
          Last updated: January 2026 • PDF Format
        </p>
      </div>
    </section>
  );
};

export default ResumeSection;
