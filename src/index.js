import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { createUploadLink } from 'apollo-upload-client';
import { ThemeProvider } from 'styled-components';
import { theme } from 'ui';
import 'sanitize.css';

export const history = createBrowserHistory();

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_BASE}/graphql`,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link: createUploadLink(),
});

ReactDOM.render(
  <Suspense fallback={<div>…</div>}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Router>
    </ThemeProvider>
  </Suspense>,
  document.getElementById('root'),
);

serviceWorker.unregister();
