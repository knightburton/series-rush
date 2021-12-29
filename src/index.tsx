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
      <CustomThemeProvider>
        <FirebaseProvider>
          <App />
        </FirebaseProvider>
      </CustomThemeProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
