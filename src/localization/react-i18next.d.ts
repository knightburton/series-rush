import 'react-i18next';
import common from './en/common.json';
import error from './en/error.json';
import translation from './en/translation.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      common: typeof common;
      error: typeof error;
      translation: typeof translation;
    };
  }
}
