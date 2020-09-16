/* Justin Edwards
 * 09/15/2020
 * Router Component - Controls the routing for private 
 * and public content
 */

import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from '../Display/Home';
import Todo from '../Display/Todo';
import { useAuthDataContext } from '../AuthDataProvider';

// returns Home component if no user in auth data context
const PrivateRoute = ({ component, ...options }) => {
    const { user } = useAuthDataContext();
    console.log("User in private route: ", user);
    const returnComponent = user ? component : Home;
    return <Route {...options} component={returnComponent} />;
};

// controls routing
const Router = () => (
    <Switch>
        {/* <Redirect from="/" to="/" /> */}
        {/* <PrivateRoute path="/home" component={Home} /> */}
        <PrivateRoute path="/" component={Todo} />
    </Switch>
);

export default Router;