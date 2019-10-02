import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import mazeApi from '../api/tv-maze-api';
import history from '../side-effects/history';
import firebase from '../side-effects/firebase';
import rootReducer from './root-reducer';

const isDevelopment = process.env.NODE_ENV === 'development';

const middlewares = applyMiddleware(
  thunk.withExtraArgument({
    history,
    getFirebase,
    getFirestore,
    mazeApi,
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
