import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

export const fConfig = {
  apiKey: 'AIzaSyDSiHSZ4_hwYgaJOdts2_fBd5nk-e_lNXM',
  authDomain: 'series-rush.firebaseapp.com',
  databaseURL: 'https://series-rush.firebaseio.com',
  projectId: 'series-rush',
  storageBucket: 'series-rush.appspot.com',
  messagingSenderId: '682132416209',
  appId: '1:682132416209:web:1d67e168993cb6f89947f0',
};

export const rfConfig = {
  userProfile: 'profiles',
  useFirestoreForProfile: true,
  useFirestoreForStorageMeta: true,
};

firebase.initializeApp(fConfig);
firebase.firestore();
firebase.storage();

export default firebase;
