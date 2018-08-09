import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Welcome from '../welcomePage';
import RegisterForm from '../registerPage';
import LoginForm from '../loginPage';
import BooksPage from '../booksPage';
import AccountPage from '../accountPage/AccountPage';

const MainRoute = () => {
    return (
        <Route>
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/register" component={RegisterForm} />
                <Route path="/login" component={LoginForm} />
                <Route path={"/account"} component={AccountPage} />
                <Route path="/book/:id" component={BooksPage}/>
            </Switch>
        </Route>
    )
};

export default MainRoute;