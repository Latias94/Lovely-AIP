import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Wellcome from '../wellcomePage'

const MainRoute = () => {
    return (
        <Route>
            <Switch>
                <Route exact path="/" component={Wellcome} />
            </Switch>
        </Route>
    )
};

export default MainRoute;