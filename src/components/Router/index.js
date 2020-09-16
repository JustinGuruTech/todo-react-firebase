/* Justin Edwards
 * 09/15/2020
 * Router Component - Controls the routing for private 
 * and public content
 */

import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Home from '../Home';
import Todo from '../Todo';
import { useAuthDataContext } from '../AuthDataProvider';

// returns Home component if no user in auth data context
const PrivateRoute = ({ component, ...options }) => {
    const { user } = useAuthDataContext();
    const returnComponent = user ? component : Home;
    return <Route {...options} component={returnComponent} />;
};

// controls routing
const Router = () => (
    <Switch>
        <Redirect exact from="/" to="/home" />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/todo" component={Todo} />
    </Switch>
);

export default Router;