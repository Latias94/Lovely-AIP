import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Welcome from '../welcomePage';
import RegisterForm from '../account/registerPage';
import LoginForm from '../account/loginForm';
import BooksPage from '../booksPage';
import Categories from '../allCategoriesPage';
import AccountPage from '../account/accountPage/AccountPage';
import BookInCategory from '../allCategoriesPage/booksInCategory';
import Payment from '../payment'

const MainRoute = () => (

	<Route>
		<Switch>
			<Route exact path="/" component={Welcome} />
			<Route path="/register" component={RegisterForm} />
			<Route path="/login" component={LoginForm} />
			<Route path="/book/:id" component={BooksPage} />
			<Route path="/categories/:categoryID?" component={Categories} />
			<Route path={'/account'} component={AccountPage} />
            <Route path={'/payment'} component={Payment} />
		</Switch>
	</Route>
);

export default MainRoute;
