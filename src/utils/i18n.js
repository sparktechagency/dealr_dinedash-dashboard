// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "../locales/en.json";
import dutch from "../locales/gr.json";

const savedLang = localStorage.getItem("dealr-lang") || "de";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: english,
    },
    de: {
      translation: dutch,
    },
  },
  lng: savedLang, // default language
  fallbackLng: "de",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
