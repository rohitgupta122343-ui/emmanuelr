import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

export interface LightfallProps {
  className?: string;
  paused?: boolean;
  colors?: string[];
  backgroundColor?: string;
  speed?: number;
  streakCount?: number;
  streakWidth?: number;
  streakLength?: number;
  glow?: number;
  density?: number;
  twinkle?: number;
  zoom?: number;
  backgroundGlow?: number;
  opacity?: number;
}

type RGB = [number, number, number];

const hexToRGB = (hex: string): RGB => {
  const c = hex.replace('#', '').padEnd(6, '0');
  return [
    parseInt(c.slice(0, 2), 16) / 255,
    parseInt(c.slice(2, 4), 16) / 255,
    parseInt(c.slice(4, 6), 16) / 255
  ];
};

// --- 1. LIGHTWEIGHT 2D CANVAS FALLBACK (For Mobile) ---
const Lightfall2D: React.FC<LightfallProps> = ({
  colors = ['#A6C8FF', '#5227FF', '#FF9FFC'],
  backgroundColor = '#0A29FF',
  speed = 0.25,
  streakCount = 2,
  streakWidth = 0.7,
  streakLength = 0.9,
  glow = 0.8,
  density = 0.3,
  paused = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      h = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const streakTotal = Math.floor(30 * density * streakCount);
    const streaks = Array.from({ length: streakTotal }, () => ({
      x: (Math.random() - 0.5) * w * 1.5,
      y: Math.random() * h,
      speed: (1.5 + Math.random() * 2) * speed * 2,
      len: (40 + Math.random() * 60) * streakLength,
      width: (1 + Math.random() * 1.5) * streakWidth,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const render = () => {
      if (!paused) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;

        streaks.forEach((s) => {
          s.y += s.speed;
          if (s.y > h + 100) {
            s.y = -50;
            s.x = (Math.random() - 0.5) * w * 1.5;
          }

          const dx = s.x - cx;
          const curveX = s.x + (dx * (s.y / h)) * 0.4;

          const grad = ctx.createLinearGradient(curveX, s.y - s.len, curveX, s.y);
          grad.addColorStop(0, 'rgba(0,0,0,0)');
          grad.addColorStop(0.7, s.color);
          grad.addColorStop(1, '#ffffff');

          ctx.strokeStyle = grad;
          ctx.lineWidth = s.width;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 8 * glow;

          ctx.beginPath();
          ctx.moveTo(curveX, s.y - s.len);
          ctx.lineTo(curveX + (dx / w) * 15, s.y);
          ctx.stroke();
        });
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [colors, backgroundColor, speed, streakCount, streakWidth, streakLength, glow, density, paused]);

  return <canvas ref={canvasRef} className="w-full h-full block absolute inset-0" />;
};

// --- 2. MAIN COMPONENT WITH AUTO-FALLBACK ---
export const Lightfall: React.FC<LightfallProps> = (props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile or low performance device
    const checkMobile = () => {
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isSmallScreen = window.innerWidth <= 768;
      
      if (mobileRegex.test(userAgent) || isSmallScreen) {
        setIsMobile(true);
      }
    };

    checkMobile();
  }, []);

  if (isMobile) {
    return (
      <div className={`w-full h-full overflow-hidden relative ${props.className ?? ''}`}>
        <Lightfall2D {...props} />
      </div>
    );
  }

  return (
    <div className={`w-full h-full overflow-hidden relative ${props.className ?? ''}`}>
      <Lightfall2D {...props} />
    </div>
  );
};

export default Lightfall;