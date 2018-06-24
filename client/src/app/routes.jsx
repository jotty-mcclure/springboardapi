import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Protected } from './containers';
import PrivateRoute from './protectedRoutes';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <PrivateRoute path="/protected" component={Protected} />
  </Switch>
);

export default Routes;
