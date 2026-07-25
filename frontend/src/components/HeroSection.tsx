import { useEffect, useRef, useState } from "react";
import Lightfall from "./Lightfall";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPaused(!entry.isIntersecting);
      },
      {
        threshold: 0.3,
      }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Lightfall
          paused={paused}
          colors={["#A6C8FF", "#5227FF", "#FF9FFC"]}
          backgroundColor="#0A29FF"
          speed={0.25}
          streakCount={2}
          streakWidth={0.7}
          streakLength={0.9}
          glow={0.8}
          density={0.3}
          twinkle={0.3}
          zoom={1.8}
          backgroundGlow={0.25}
          opacity={1}
          mouseInteraction={false}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/70 sm:text-sm md:text-base">
          Graphic Designer
        </p>

        <h1 className="leading-none font-black uppercase text-white">
          <span className="block text-[3rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[9rem]">
            Emmanuel
          </span>

          <span className="block text-[3rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[9rem]">
            Rebario
          </span>
        </h1>

        <p className="mt-5 max-w-xs text-sm leading-6 text-white/70 sm:max-w-md sm:text-base md:max-w-2xl md:text-lg">
          Creating visually striking digital experiences with modern web
          technologies, motion design and immersive interactions.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row">
          <button className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition duration-300 hover:scale-105">
            View Work
          </button>

          <button className="rounded-full border border-white px-8 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-white hover:text-black">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;