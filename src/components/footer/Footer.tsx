"use client"
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // 1. MAGNETIC TEXT DISTORTION (The Core Interaction)
    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = footerRef.current.getBoundingClientRect();
      
      const x = ((clientX - left) / width - 0.5) * 2;
      const y = ((clientY - top) / height - 0.5) * 2;

      // Deep 3D tilt and movement
      gsap.to(".magnetic-text", {
        x: x * 70,
        y: y * 30,
        rotateX: -y * 20,
        rotateY: x * 20,
        duration: 0.9,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    footerRef.current?.addEventListener("mousemove", handleMouseMove);

    // 2. REVEAL ANIMATION
    ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.from(".reveal-item", {
          y: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out"
        });
      }
    });

    return () => footerRef.current?.removeEventListener("mousemove", handleMouseMove);
  }, { scope: footerRef });

  return (
    <footer 
      ref={footerRef} 
      className="relative min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden perspective-1000"
    >
      {/* Spacer - Top is now completely empty */}
      <div className="h-10" />

      {/* --- CENTER: THE GRAVITY TEXT --- */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pointer-events-none">
        <h2 ref={textRef} className="magnetic-text text-[clamp(80px,26vw,600px)] font-black uppercase leading-[0.7] tracking-tighter select-none will-change-transform">
          <span className="block">VOID</span>
          <span className="block text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>STUDIO</span>
        </h2>
      </div>

      {/* --- BOTTOM: ACTION BAR --- */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-10 items-end pt-12 reveal-item">
        
        {/* Contact CTA */}
        <div className="md:col-span-8 flex flex-col gap-6">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c5fb45]">Initiate_Contact</span>
          <a 
            href="mailto:hello@voidstudio.dev" 
            className="group relative text-[clamp(45px,9vw,140px)] font-black uppercase tracking-tighter w-fit overflow-hidden leading-none"
          >
            <div className="overflow-hidden h-[1.1em] relative">
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full ">Let&apos;s_Talk</span>
                <span className="absolute left-0 top-full inline-block transition-transform duration-500 group-hover:-translate-y-full text-[#c5fb45]">Let&apos;s_Talk</span>
            </div>
          </a>
        </div>

        {/* Links & Signature */}
        <div className="md:col-span-4 flex flex-col md:items-end gap-8 mb-4">
            <div className="flex flex-col md:items-end gap-2 font-bold uppercase text-[11px] tracking-widest">
                <a href="#" className="hover:text-[#c5fb45] transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-[#c5fb45] transition-colors">GitHub</a>
                <a href="#" className="hover:text-[#c5fb45] transition-colors">Instagram</a>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20 italic">©2026_VOID_STUDIO</p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;