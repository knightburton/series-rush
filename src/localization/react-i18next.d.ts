import 'react-i18next';
import alert from './en/alert.json';
import common from './en/common.json';
import core from './en/core.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'core';
    resources: {
      alert: typeof alert;
      common: typeof common;
      core: typeof core;
    };
  }
}
