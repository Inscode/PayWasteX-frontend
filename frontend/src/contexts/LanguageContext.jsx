import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  // helper to switch language in a cycle
  const switchLanguage = () => {
    const order = ["en", "si", "ta"];
    const nextLang = order[(order.indexOf(lang) + 1) % order.length];
    setLang(nextLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
