import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Fade out animation
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });
    }
  }, [progress, onComplete]);

  // Generate smoke particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 200 + 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 4 + 4,
  }));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* Smoke particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="smoke-particle"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo / Name */}
        <div className="font-display text-3xl tracking-[0.3em] text-foreground/80">
          <span className="char-emerald">E</span>
          <span>MMANUEL</span>
          <span className="mx-4 text-muted-foreground/30">•</span>
          <span className="char-emerald">R</span>
          <span>EBAIRO</span>
        </div>

        {/* Progress bar */}
        <div className="relative h-[1px] w-48 bg-muted/20">
          <div
            className="absolute left-0 top-0 h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Progress text */}
        <div className="font-body text-xs tracking-[0.5em] text-muted-foreground">
          LOADING
        </div>
      </div>

      {/* Ambient glow */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, hsl(160 84% 39% / 0.08) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
};

export default Preloader;
