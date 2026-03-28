"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const menuLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Work", href: "/work" },
  { name: "Lab", href: "/lab" },
]

function Menu() {
  const container = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useGSAP(() => {
    gsap.set(".menu-link-item-holder", { y: "115%" });

    tl.current = gsap.timeline({ paused: true })
      .to(".menu-overlay", {
        duration: 0.7,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "expo.inOut"
      })
      .to(".menu-link-item-holder", {
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out"
      }, "-=0.35");
  }, { scope: container });

  useEffect(() => {
    if (isMenuOpen) tl.current?.play();
    else tl.current?.reverse();
  }, [isMenuOpen]);

  return (
    <div className="menu-container" ref={container}>
      <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-500">
        <Link href="/" className="text-white uppercase font-bold tracking-tighter text-lg select-none">Void Studio.</Link>
        <button 
          className="appearance-none bg-transparent border-none p-0 m-0 outline-none cursor-pointer text-white uppercase text-xs font-bold tracking-[0.2em] select-none touch-manipulation" 
          onClick={toggleMenu}
        >
          Menu
        </button>
      </nav>

      <div
        className="menu-overlay fixed inset-0 w-screen h-screen bg-[#c5fb45] flex flex-col z-1000 overflow-y-auto overflow-x-hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      >
        <div className="w-full p-6 md:p-10 flex justify-between items-center shrink-0">
          <Link href="/" className="text-black uppercase font-bold tracking-tighter text-lg select-none" onClick={toggleMenu}>Void Studio.</Link>
          <button 
            className="appearance-none bg-transparent border-none p-0 m-0 outline-none cursor-pointer text-black uppercase text-xs font-bold tracking-widest select-none touch-manipulation" 
            onClick={toggleMenu}
          >
            Close
          </button>
        </div>

        <div className="flex-1 px-6 md:px-12 pb-10 grid grid-cols-1 md:grid-cols-12 gap-y-5 md:gap-y-12 items-center">
          
          {/* 1. Main Links */}
          <div className="col-span-1 md:col-span-6 order-1 md:order-2">
            <div className="menu-links flex flex-col">
              {menuLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <div className="menu-link-item overflow-hidden" key={link.href}>
                    <div className="menu-link-item-holder flex items-start">
                      <Link
                        href={link.href}
                        className={`inline-block w-fit text-[clamp(60px,16vw,100px)] md:text-[clamp(80px,8vw,100px)] font-medium leading-[0.85] -tracking-[0.03em] text-black uppercase transition-all duration-300 ease-out hover:-tracking-[0.06em] relative select-none ${isActive ? 'opacity-100 pr-12 md:pr-16' : 'opacity-75 hover:opacity-100'}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                        <span className="text-[0.25em] align-top ml-3 font-extralight opacity-40">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                        
                        {isActive && (
                          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-[0.5em] h-[0.5em]">
                            <img 
                              src="/flower.svg" 
                              alt="" 
                              className="w-full h-full object-contain animate-[spin_15s_linear_infinite]" 
                            />
                          </div>
                        )}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 flex flex-col gap-6 md:gap-8 text-black order-2 md:order-1 md:self-end font-bold uppercase tracking-widest text-[16px]">
            <div className="flex flex-col gap-1">
              {["X", "Instagram", "LinkedIn", "YouTube"].map((social) => (
                <a key={social} href="#" className="hover:opacity-40 w-fit transition-opacity select-none">{social} &#8599;</a>
              ))}
            </div>
            <div className="opacity-60">
              <p className="select-none">info@omar7tech.com</p>
              <p className="select-none">+961 71 386 946</p>
            </div> 
          </div>

          <div className="hidden md:flex col-span-1 md:col-span-3 md:justify-end order-3 md:self-end">
            <button className="appearance-none bg-transparent border-none p-0 m-0 outline-none text-black uppercase text-[10px] font-black tracking-[0.2em] cursor-pointer border-b border-black/20 pb-1 hover:border-black transition-all select-none touch-manipulation">
              View Showreel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu