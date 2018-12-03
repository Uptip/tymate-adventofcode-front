import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import noise from 'images/noise.png';
import { Switch, Route } from 'react-router-dom';
import Admin from 'containers/Admin';
import Calendar from 'containers/Calendar';
import snow from 'images/snow.svg';

const Wrapper = styled.div`
  background-image: url("${snow}");
  background-size: cover;
  min-height: 100vh;
`;

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    background: background-image: url("${noise}");
    background-image: url("${noise}"), linear-gradient(hsl(233, 94%, 13%) 30%, hsla(234, 81%, 25%, 0.67) 95%);
    position: relative;
    overflow-x: hidden;
    background-repeat: repeat;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />

      <Wrapper>
        <Switch>
          <Route path="/mon-calendrier/jours" component={Admin} />
          <Route path="/mon-calendrier/:token?" component={Admin} />
          <Route path="/jours/:dayId" component={Calendar} />
          <Route path="/:slug/jours/:dayId" component={Calendar} />
          <Route path="/:slug?" component={Calendar} />
        </Switch>
      </Wrapper>
    </>
  );
};

export default App;
