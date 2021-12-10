import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { CustomThemeProvider } from './contexts/customTheme';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <StrictMode>
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>
  </StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
