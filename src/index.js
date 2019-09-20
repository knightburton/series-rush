import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import history from './side-effects/history';
import configureStore from './store/configure-store';
import theme from './theme';
import * as serviceWorker from './serviceWorker';

import MainRoutes from './routes/main-routes';

import 'typeface-roboto';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <MainRoutes />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
