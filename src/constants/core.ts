export const LOCAL_STORAGE_KEYS = {
  CUSTOM_THEME: 'CUSTOM_THEME',
};

export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export const ALERT_AUTOHIDE_DURATION = 10000;

export const MAX_FILE_SIZE_IN_MB = 2;
export const MAX_FILE_SIZE_IN_B = MAX_FILE_SIZE_IN_MB * 1024 * 1024;

export default {
  LOCAL_STORAGE_KEYS,
  FIREBASE_CONFIG,
};
