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
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Logo / Name - Reduced from text-3xl to text-sm / text-base */}
        <div className="font-display text-sm tracking-[0.4em] text-foreground/80 md:text-base">
          <span className="text-[#002E97]">E</span>
          <span>MMANUEL</span>
          <span className="mx-3 text-muted-foreground/30">•</span>
          <span className="text-[#002E97]">R</span>
          <span>EBAIRO</span>
        </div>

        {/* Progress bar - Slimmer width & height */}
        <div className="relative h-[1px] w-36 bg-muted/20">
          <div
            className="absolute left-0 top-0 h-full bg-[#002E97] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,46,151,0.8)]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Progress text & percentage - Extra small (text-[10px]) */}
        <div className="font-body text-[10px] tracking-[0.5em] text-muted-foreground/60 uppercase">
          LOADING <span className="ml-1 text-foreground/80">{Math.min(Math.round(progress), 100)}%</span>
        </div>
      </div>

      {/* Ambient glow */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 46, 151, 0.15) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
};

export default Preloader;