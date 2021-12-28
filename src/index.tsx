import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import { Provider } from 'react-redux';
import { CustomThemeProvider } from './contexts/customTheme';
import { FirebaseProvider } from './contexts/firebase';
import { store } from './store/configureStore';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { FIREBASE_CONFIG } from './constants/core';
import './localization/i18n';

initializeApp(FIREBASE_CONFIG);

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <FirebaseProvider>
        <CustomThemeProvider>
          <App />
        </CustomThemeProvider>
      </FirebaseProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
