import React from 'react';
import ReactDOM from 'react-dom';
import { CSSReset } from '@chakra-ui/core';
import { ThemeProvider } from 'emotion-theming';
import { ApolloProvider } from '@apollo/client';

import { theme } from './app/config/theme';
import { client } from './app/config/apollo-client';
import App from './app/app';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
