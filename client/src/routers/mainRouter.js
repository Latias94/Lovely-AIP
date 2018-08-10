import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Welcome from '../welcomePage';
import RegisterForm from '../registerPage';
import LoginForm from '../loginForm';
import BooksPage from '../booksPage';
import Categories from '../allCategoriesPage';

const MainRoute = () => (
	<Route>
		<Switch>
			<Route exact path="/" component={Welcome} />
			<Route path="/register" component={Register} />
			<Route path="/login" component={Login} />
			<Route path="/book/:id" component={BooksPage} />
			<Route path="/categories" component={Categories} />
		</Switch>
	</Route>
);

export default MainRoute;
