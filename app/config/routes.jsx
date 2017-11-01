import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { AuthenticateContainer, HomeContainer, MainContainer } from '../containers';

const routes = (
  <HashRouter>
    <Route path="/">
      <MainContainer>
        <Route path="/auth" component={AuthenticateContainer} />
        <Route exact path="/" component={HomeContainer} />
      </MainContainer>
    </Route>
  </HashRouter>
);

export default routes;
