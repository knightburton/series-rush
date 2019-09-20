import { combineReducers } from 'redux';
import { firestoreReducer as firestore } from 'redux-firestore';
import { firebaseReducer as firebase } from 'react-redux-firebase';

import { reducer as app } from './app';

export default combineReducers({
  app,
  firestore,
  firebase,
});
