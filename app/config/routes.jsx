import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { HomeContainer, MainContainer } from '../containers';

const routes = (
  <HashRouter>
    <Route path="/">
      <MainContainer>
        <Route exact path="/" component={HomeContainer} />
      </MainContainer>
    </Route>
  </HashRouter>
);

export default routes;
