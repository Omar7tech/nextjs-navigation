"use client"

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextType from "@/components/TextType";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // 1. Hero Reveal (Text sliding up)
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    gsap.set(".hero-line span", { y: "115%" });
    
    tl.to(".hero-line span", {
      y: 0,
      duration: 1.5,
      stagger: 0.1,
    });

    // 2. Grid Fade Out
    gsap.to(".bg-grid", {
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom center",
        scrub: true,
      }
    });

    // 3. Desktop Parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const xPos = (e.clientX / window.innerWidth - 0.5) * 15;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 15;
      gsap.to(titleRef.current, { x: xPos, y: yPos, duration: 1.5 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[70vh] md:h-screen w-full flex flex-col p-6 md:p-10 justify-between"
    >
      {/* Isolated Grid Boxes */}
      <div className="bg-grid absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="relative z-10 flex-1 flex flex-col pt-[12vh] md:pt-[10vh]">
        <h1 ref={titleRef} className="text-[clamp(42px,12vw,190px)] leading-[0.9] md:leading-[0.8] font-bold uppercase -tracking-[0.03em] md:-tracking-[0.06em] select-none">
          <div className="hero-line overflow-hidden w-full">
            <TextType
              text={["Engineering"]}
              typingSpeed={75}
              cursorCharacter={''}
              className="block"
              loop={false}
            />
          </div>
          <div className="hero-line overflow-hidden w-full">
            <span className="block text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}>Digital</span>
          </div>
          <div className="hero-line overflow-hidden flex items-baseline gap-2 md:gap-6 w-full">
            <span className="block text-[#c5fb45]">Impact</span>
            <sup className="text-[0.25em] font-light tracking-tighter opacity-20 lowercase translate-y-[-0.3em]">(01)</sup>
          </div>
        </h1>
      </div>

      {/* Hero Footer Info */}
      <div className="relative z-10 flex justify-between items-end pb-8 md:pb-10">
        <p className="text-[9px] md:text-xs leading-relaxed opacity-40 max-w-[160px] md:max-w-[300px] uppercase tracking-[0.2em] font-bold">
          Boutique Studio <br/> High-Performance Code
        </p>
        <div className="hidden md:block animate-bounce opacity-20 text-[10px] tracking-[0.2em] uppercase">Scroll</div>
      </div>
    </section>
  );
}
