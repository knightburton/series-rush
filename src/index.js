import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import history from './side-effects/history';
import configureStore from './store/configure-store';
import * as serviceWorker from './serviceWorker';

import MainRoutes from './routes/main-routes';

import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MainRoutes />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
