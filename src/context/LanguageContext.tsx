"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, dictionary } from '@/lib/dictionary';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof dictionary.en;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLang = localStorage.getItem('language') as Language;
    
    if (storedLang && (storedLang === 'en' || storedLang === 'es')) {
      setLanguage(storedLang);
    } else if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.split('-')[0];
      const initialLang = browserLang === 'es' ? 'es' : 'en';
      setLanguage(initialLang);
      localStorage.setItem('language', initialLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: dictionary[language] }}>
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}