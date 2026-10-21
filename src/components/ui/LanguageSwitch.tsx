"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  if (!mounted) return <div className="w-10 h-10" />;

  const isEnglish = language === 'en';

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-10 h-10 border border-white/20 rounded-full bg-transparent transition-all duration-300 ease-out text-white cursor-pointer hover:scale-110 hover:border-primary/50 active:scale-95 group"
      aria-label="Switch Language"
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* EN State (Visible when English) */}
        <div 
          className={`absolute transition-all duration-500 transform flex items-center justify-center ${
            isEnglish ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
        >
          <span className="font-mono text-[12px] font-bold tracking-wider group-hover:text-primary group-active:text-primary transition-colors">
            En
          </span>
        </div>

        {/* ES State (Visible when Spanish) */}
        <div 
          className={`absolute transition-all duration-500 transform flex items-center justify-center ${
            isEnglish ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <span className="font-mono text-[12px] font-bold tracking-wider group-hover:text-primary group-active:text-primary transition-colors">
            Es
          </span>
        </div>
      </div>
    </button>
  );
}
