import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './en/common.json';
import enError from './en/error.json';
import enTranslation from './en/translation.json';

const debug = process.env.NODE_ENV === 'development';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      error: enError,
      translation: enTranslation,
    },
  },
  fallbackLng: 'en',
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
  cleanCode: true,
  joinArrays: ' ',
  returnObjects: true,
  debug,
  returnEmptyString: true,
  nsSeparator: '::',
});

export default i18n;
