import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enAlert from './locales/en/alert.json';
import enButton from './locales/en/button.json';
import enCommon from './locales/en/common.json';
import enTranslation from './locales/en/translation.json';

const debug = process.env.NODE_ENV === 'development';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        alert: enAlert,
        button: enButton,
        common: enCommon,
        translation: enTranslation,
      },
    },
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    cleanCode: true,
    joinArrays: true,
    debug,
  });

export default i18n;
