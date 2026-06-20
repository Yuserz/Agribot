import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "@lang_english";

type LanguageContextType = {
  isEnglish: boolean;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  isEnglish: false,
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [isEnglish, setIsEnglish] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((val) => {
      if (val === "true") setIsEnglish(true);
    });
  }, []);

  const toggleLanguage = () => {
    setIsEnglish((prev) => {
      const next = !prev;
      AsyncStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ isEnglish, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
