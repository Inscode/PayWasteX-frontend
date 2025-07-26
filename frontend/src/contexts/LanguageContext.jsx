// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("preferred_lang");
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  const switchLanguage = (languageCode) => {
    setLang(languageCode);
    localStorage.setItem("preferred_lang", languageCode);
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
