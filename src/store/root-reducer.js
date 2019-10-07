import { combineReducers } from 'redux';
import { firestoreReducer as firestore } from 'redux-firestore';
import { firebaseReducer as firebase } from 'react-redux-firebase';

import { reducer as app } from './app';
import { reducer as auth } from './auth';
import { reducer as search } from './search';

export default combineReducers({
  app,
  auth,
  search,
  firestore,
  firebase,
});
