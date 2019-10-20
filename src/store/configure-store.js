import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import tvmazeApi from '../api/tvmaze-api';
import tmdbApi from '../api/tmdb-api';
import history from '../side-effects/history';
import firebase from '../side-effects/firebase';
import storage from '../side-effects/locale-storage';
import rootReducer from './root-reducer';

const isDevelopment = process.env.NODE_ENV === 'development';

const middlewares = applyMiddleware(
  thunk.withExtraArgument({
    history,
    getFirebase,
    getFirestore,
    storage,
    tvmazeApi,
    tmdbApi,
  }),
);

const enhancers = [
  middlewares,
  reduxFirestore(firebase),
];

const composer = isDevelopment ? composeWithDevTools : compose;

const createStoreWithMiddlewares = composer(...enhancers)(createStore);

const configureStore = () => createStoreWithMiddlewares(rootReducer);

export default configureStore;
