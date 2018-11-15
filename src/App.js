import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import noise from 'images/noise.png';
import { Switch, Route } from 'react-router-dom';
import Admin from 'containers/Admin';
import Calendar from 'containers/Calendar';
import { CREATE_ADMIN } from 'queries';
import { Mutation } from 'react-apollo';
import get from 'lodash/get';

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    background: background-image: url("${noise}");
    background-image: url("${noise}"), linear-gradient(hsl(233, 94%, 13%) 30%, hsla(234, 81%, 25%, 0.67) 95%);
    position: relative;
    overflow-x: hidden;
  }
`;

const App = () => {
  const [email, setEmail] = useState('');

  return (
    <>
      <GlobalStyle />

      <Switch>
        <Route path="/admin/jours" component={Admin} />
        <Route path="/admin/:token?" component={Admin} />
        <Route path="/jours/:dayId" component={Calendar} />
        <Route path="/:slug/jours/:dayId" component={Calendar} />
        <Route path="/:slug?" component={Calendar} />
      </Switch>

      {/* <Mutation
          mutation={CREATE_ADMIN}
          variables={{ input: { email, newsletter: false } }}
          onCompleted={({ createAdmin }) => console.log(createAdmin)}
          onError={e => console.error(e)}
        >
          {(createAdmin, { data }) => (
            <>
              <input value={email} onChange={e => setEmail(e.target.value)} />
              <button type="submit" onClick={createAdmin}>
                Register
              </button>
            </>
          )}
        </Mutation> */}

      {/* <Tinsels>
        {[...Array(tinselsLength).keys()].map(index => (
          <Tinsel
            key={index}
            startY={50}
            stopY={20}
            lowHangingFruit={{ x: 30, y: 90 }}
            width={width}
            height={Math.max(height / (tinselsLength + 1), 200)}
          />
        ))}
      </Tinsels> */}

      <Mutation
        mutation={CREATE_ADMIN}
        variables={{ input: { email, newsletter: true } }}
        onCompleted={({ createAdmin }) => console.log(createAdmin)}
        onError={e => console.error(e)}
      >
        {(createAdmin, { data }) => {
          if (get(data, 'createAdmin.user.id')) {
            return <div>Check your mail</div>;
          }

          return (
            <>
              <input value={email} onChange={e => setEmail(e.target.value)} />
              <button type="submit" onClick={createAdmin}>
                Add Todo
              </button>
            </>
          );
        }}
      </Mutation>

      {/* <Query query={GET_USER_CALENDAR}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading...</div>;
            }

            if (error) {
              return <div>Error</div>;
            }

            return <pre>{JSON.stringify(data, null, 2)}</pre>;
          }}
        </Query> */}
    </>
  );
};

export default App;
