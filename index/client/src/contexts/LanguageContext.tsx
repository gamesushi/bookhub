import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, detectLanguage, getSavedLanguage, saveLanguage } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh-CN");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 优先级：1. localStorage 2. 浏览器语言 3. 默认简体中文
    const savedLang = getSavedLanguage();
    const detectedLang = detectLanguage();
    const initialLang = savedLang || detectedLang;

    setLanguageState(initialLang);
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveLanguage(lang);
  };

  // 提供默认值以防止 hydration mismatch
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
