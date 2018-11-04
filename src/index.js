import React from 'react';
import ReactDOM from 'react-dom';
// import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
export const history = createBrowserHistory();

const client = new ApolloClient({
  link: createUploadLink({ uri: `${process.env.REACT_APP_API_BASE}/graphql` }),
  // link: ApolloLink.from([
  //   onError(({ graphQLErrors, networkError }) => {
  //     if (graphQLErrors)
  //       graphQLErrors.map(({ message, locations, path }) =>
  //         console.log(
  //           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
  //         ),
  //       );
  //     if (networkError) console.log(`[Network error]: ${networkError}`);
  //   }),
  //   new HttpLink({
  //     uri: `${process.env.REACT_APP_API_BASE}/graphql`,
  //     credentials: 'same-origin',
  //   }),
  //   createUploadLink(),
  // ]),
  cache: new InMemoryCache({ addTypename: false }),
});

// const client = new ApolloClient({
//   uri: `${process.env.REACT_APP_API_BASE}/graphql`,
//   cache: new InMemoryCache({
//     addTypename: false,
//   }),
//   link: createUploadLink(),
// });

ReactDOM.render(
  <Router history={history}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root'),
);

serviceWorker.unregister();
