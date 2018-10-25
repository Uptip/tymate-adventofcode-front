import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_BASE}/graphql`,
  // request: operation => {
  //   const token = localStorage.getItem('access_token');
  //   if (token) {
  //     operation.setContext({
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     });
  //   }
  // },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
