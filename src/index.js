import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import 'modern-normalize/modern-normalize.css';
// import './styles.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { theme } from 'constants';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'components/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App  />
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>
);
