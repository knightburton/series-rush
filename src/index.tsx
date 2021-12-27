import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CustomThemeProvider } from './contexts/customTheme';
import { store } from './store/configureStore';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './localization/i18n';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
