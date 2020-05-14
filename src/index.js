import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import './side-effects/console';
import { ProfileProvider } from './contexts/profile';
import history from './side-effects/history';
import configureStore from './store/configure-store';
import firebase, { rfConfig } from './side-effects/firebase';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import MainRoutes from './routes/main-routes';
import './i18n';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={rfConfig}
      dispatch={store.dispatch}
      createFirestoreInstance={createFirestoreInstance}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ProfileProvider>
          <Router history={history}>
            <MainRoutes />
          </Router>
        </ProfileProvider>
      </MuiThemeProvider>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
