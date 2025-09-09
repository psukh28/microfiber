import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from './locales/en.json';
import thTranslations from './locales/th.json';

const resources = {
  en: {
    translation: enTranslations
  },
  th: {
    translation: thTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language - will be overridden by LanguageContext
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already does escaping
    },
    react: {
      useSuspense: false // Disable suspense to prevent hydration issues
    }
  });

export default i18n;
