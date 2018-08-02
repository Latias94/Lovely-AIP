import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Welcome from '../welcomePage';
import Register from '../registerPage';
import Login from '../loginPage'

const MainRoute = () => {
    return (
        <Route>
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
            </Switch>
        </Route>
    )
};

export default MainRoute;