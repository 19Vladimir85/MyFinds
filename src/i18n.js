import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './locales/resources';

const settingsFromLs = window.localStorage.getItem('settings');
const initialLang = settingsFromLs ? JSON.parse(settingsFromLs).language : 'ru';
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: initialLang,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
