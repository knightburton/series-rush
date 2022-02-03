import 'react-i18next';
import alert from './en/alert.json';
import common from './en/common.json';
import translation from './en/translation.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      alert: typeof alert;
      common: typeof common;
      translation: typeof translation;
    };
  }
}
