import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { AuthenticateContainer, FeedContainer, HomeContainer, MainContainer } from '../containers';

function getRoutes(checkAuth) {
  return (
    <HashRouter>
      <Route path="/" onEnter={checkAuth}>
        <MainContainer>
          <Switch>
            <Route path="/auth" component={AuthenticateContainer} />
            <Route path="/feed" component={FeedContainer} />
            <Route exact path="/" component={HomeContainer} />
          </Switch>
        </MainContainer>
      </Route>
    </HashRouter>
  );
}

export default getRoutes;
