import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

const isDevelopment = process.env.NODE_ENV === 'development';

const middlewares = applyMiddleware(
  thunk.withExtraArgument({}),
);

const enhancers = [
  middlewares,
];

const composer = isDevelopment ? composeWithDevTools : compose;

const createStoreWithMiddlewares = composer(...enhancers)(createStore);

const configureStore = () => createStoreWithMiddlewares(rootReducer);

export default configureStore;
