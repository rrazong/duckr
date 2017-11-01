import React from 'react';
import { withRouter, HashRouter, Route, Switch } from 'react-router-dom';
import { AuthenticateContainer, FeedContainer, HomeContainer, MainContainer } from '../containers';

const MainContainerWithRouter = withRouter(MainContainer);

const routes = (
  <HashRouter>
    <Route path="/">
      <MainContainerWithRouter>
        <Switch>
          <Route path="/auth" component={AuthenticateContainer} />
          <Route path="/feed" component={FeedContainer} />
          <Route exact path="/" component={HomeContainer} />
        </Switch>
      </MainContainerWithRouter>
    </Route>
  </HashRouter>
);

export default routes;
