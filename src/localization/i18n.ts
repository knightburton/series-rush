import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enAlert from './en/alert.json';
import enCommon from './en/common.json';
import enCore from './en/core.json';

const debug = process.env.NODE_ENV === 'development';

i18n.use(initReactI18next).init({
  defaultNS: 'core',
  resources: {
    en: {
      common: enCommon,
      alert: enAlert,
      core: enCore,
    },
  },
  ns: ['alert', 'common', 'core'],
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
});

export default i18n;
