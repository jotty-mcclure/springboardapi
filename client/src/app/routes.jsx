import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, register, Protected, error } from './containers';
import PrivateRoute from './protectedRoutes';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/register" component={register} />
    <Route path="/about" component={About} />
    <PrivateRoute path="/protected" component={Protected} />
    <Route component={error} />
  </Switch>
);

export default Routes;
