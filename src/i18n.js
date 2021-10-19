import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ru: {
    translation: {
      Search: "Искать темы…",
      "Добро пожаловать назад": "Добро пожаловать назад",
      "Мы скучали по тебе": "Мы скучали по тебе",
      searchList: "Список поиска",
    },
  },
  en: {
    translation: {
      Search: "Search topics…",
      "Welcome back": "Welcome back",
      "We've missed you": "We've missed you",
      searchList: "Search List",
    },
  },
  fr: {
    translation: {
      Search: "Rechercher…",
      "Welcome back": "Bon retour",
      "We've missed you": "Tu nous as manqué",
    },
  },
  de: {
    translation: {
      Search: "Suchen…",
      "Welcome back": "Willkommen zurück",
      "We've missed you": "Wir haben dich vermisst",
    },
  },
  nl: {
    translation: {
      Search: "Zoeken…",
      "Welcome back": "Welkom terug",
      "We've missed you": "We hebben je gemist",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
