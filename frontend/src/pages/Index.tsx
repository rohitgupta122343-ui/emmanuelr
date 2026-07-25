import { useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '@/components/Preloader';
import Scene3D from '@/components/Scene3D';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TechStackSection from '@/components/TechStackSection';
import ProjectsSection from '@/components/ProjectsSection';
import FreelanceSection from '@/components/FreelanceSection';
import ResumeSection from '@/components/ResumeSection';
import ContactSection from '@/components/ContactSection';
import { useScrollProgress } from '@/hooks/useScrollProgress';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const scrollProgress = useScrollProgress();

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
    // Smooth scroll to top after loader
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger after content loads
    if (!isLoading) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isLoading]);

  // Prevent scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
      }, 2000); // Wait for classy hero characters to assemble
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handleLoaderComplete} />}

      {/* 3D Background Scene */}
      {!isLoading && <Scene3D scrollProgress={scrollProgress} />}

      {/* Content Layer */}
      {!isLoading && (
        <div className="relative">
          {/* Hero - Fixed position, fades on scroll */}
          <HeroSection scrollProgress={scrollProgress} />

          {/* Scrollable content */}
          <main>
            <AboutSection />
            <TechStackSection />
            <ProjectsSection />
            <FreelanceSection />
            <ResumeSection />
            <ContactSection />
          </main>
        </div>
      )}

      {/* Minimal navigation - appears after scroll */}
      {!isLoading && scrollProgress > 0.05 && (
        <nav
          className="fixed left-6 top-6 z-40 transition-opacity duration-500"
          style={{ opacity: Math.min((scrollProgress - 0.05) * 10, 1) }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-sm tracking-[0.3em] text-foreground/60 transition-colors duration-300 hover:text-foreground"
          >
            <span className="char-emerald">R</span>G
          </a>
        </nav>
      )}

      {/* Progress indicator */}
      {!isLoading && (
        <div className="fixed right-6 top-1/2 z-40 -translate-y-1/2">
          <div className="h-24 w-[1px] bg-muted/20">
            <div
              className="w-full bg-primary/50 transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
