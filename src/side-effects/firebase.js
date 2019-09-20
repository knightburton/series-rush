import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

export const fConfig = {
  apiKey: 'AIzaSyCiDARv2RM3fZorLnKXFhQftIMbe3yRUGE',
  authDomain: 'seriesrush-ea1f9.firebaseapp.com',
  databaseURL: 'https://seriesrush-ea1f9.firebaseio.com',
  projectId: 'seriesrush-ea1f9',
  storageBucket: '',
  messagingSenderId: '388274194001',
  appId: '1:388274194001:web:f94957e5159a8b57e4da70',
};

export const rfConfig = {
  userProfile: 'profiles',
  useFirestoreForProfile: true,
  useFirestoreForStorageMeta: true,
};

firebase.initializeApp(fConfig);
firebase.firestore();

export default firebase;
