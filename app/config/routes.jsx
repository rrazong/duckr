import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { AuthenticateContainer, FeedContainer, HomeContainer, MainContainer } from '../containers';

function getRoutes(checkAuth) {
  return (
    <HashRouter>
      <Route path="/">
        <MainContainer>
          <Switch>
            <Route path="/auth" component={checkAuth(AuthenticateContainer)} />
            <Route path="/feed" component={checkAuth(FeedContainer)} />
            <Route exact path="/" component={checkAuth(HomeContainer)} />
          </Switch>
        </MainContainer>
      </Route>
    </HashRouter>
  );
}

export default getRoutes;
