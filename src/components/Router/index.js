/* Justin Edwards
 * 09/15/2020
 * Router Component - Controls the routing for private 
 * and public content
 */

 /* #region IMPORTS */
import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from '../Display/Home';
import TodoPage from '../Display/TodoPage';
import { useAuthDataContext } from '../AuthDataProvider';
/* #endregion */

// returns Home component if no user in auth data context
const PrivateRoute = ({ component, ...options }) => {
    const { user } = useAuthDataContext();
    const returnComponent = user ? component : Home;
    return <Route {...options} component={returnComponent} />;
};

// controls routing
const Router = () => (
    <Switch>
        {/* <Redirect from="/" to="/" /> */}
        {/* <PrivateRoute path="/home" component={Home} /> */}
        <PrivateRoute path="/" component={TodoPage} />
    </Switch>
);

export default Router;