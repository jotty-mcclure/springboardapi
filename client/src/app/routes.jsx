import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Register, Protected, Error } from './containers';
import PrivateRoute from './protectedRoutes';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/register" component={Register} />
    <Route path="/about" component={About} />
    <PrivateRoute path="/protected" component={Protected} />
    <Route component={Error} />
  </Switch>
);

export default Routes;
