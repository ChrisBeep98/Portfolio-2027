"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Process() {
  const { t } = useLanguage();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Initial state
      gsap.set(".process-reveal-title", { y: 100, opacity: 0 });
      gsap.set(".process-reveal-sub", { y: 30, opacity: 0 });
      gsap.set(".process-reveal-item", { y: 50, opacity: 0 });

      tl.to(".process-reveal-title", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out"
      })
      .to(".process-reveal-sub", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .to(".process-reveal-item", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      }, "-=0.6");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-24 md:py-32 px-frame bg-[#E5E5E3] dark:bg-[#0D0D0D] text-black dark:text-white border-t border-black/10 dark:border-white/10 relative overflow-hidden"
      style={{ boxShadow: "inset 0 60px 80px -40px rgba(0,0,0,0.08)" }}
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32 relative z-10">
        
        {/* Left Side: Title & Subtitle */}
        <div className="lg:w-1/3">
          <h2 className="process-reveal-title text-[12vw] lg:text-[5vw] font-bold uppercase leading-[0.85] tracking-tighter mb-8">
            {t.process.title}
          </h2>
          <p className="process-reveal-sub text-lg lg:text-xl font-light opacity-60 leading-relaxed max-w-md">
            {t.process.subtitle}
          </p>
        </div>

        {/* Right Side: Accordion Blocks */}
        <div className="lg:w-2/3 flex flex-col border-t border-black/10 dark:border-white/10">
          {t.process.items.map((item: any) => (
            <div 
              key={item.id} 
              className="process-reveal-item border-b border-black/10 dark:border-white/10 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full py-8 lg:py-12 flex items-center justify-between group transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02] text-left"
              >
                <div className="flex items-baseline gap-6 lg:gap-12">
                  <span className="hidden md:inline font-mono text-[0.9em] font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                    {item.id}
                  </span>
                  <h3 className="text-2xl lg:text-5xl font-bold uppercase tracking-tighter transition-transform duration-500 group-hover:translate-x-2">
                    {item.title}
                  </h3>
                </div>
                
                <div className={`p-3 rounded-full border-none md:border md:border-black/10 md:dark:border-white/10 transition-transform duration-500 ${openItem === item.id ? 'rotate-45' : ''}`}>
                  <Plus size={24} strokeWidth={1.5} />
                </div>
              </button>

              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <div className="pb-12 lg:pb-16 pl-[calc(0.6em+1.5rem)] lg:pl-[calc(0.6em+3rem)] pr-12">
                      <p className="text-base lg:text-lg font-light leading-relaxed opacity-70 max-w-2xl">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
