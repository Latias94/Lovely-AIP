import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Welcome from '../welcomePage';
import RegisterForm from '../registerPage';
import LoginForm from '../loginForm';
import BooksPage from '../booksPage';
import AccountPage from '../accountPage/AccountPage';

const MainRoute = () => (
	<Router>
		<Route>
			<Switch>
				<Route exact path="/" component={Welcome} />
				<Route path="/register" component={RegisterForm} />
				<Route path="/login" component={LoginForm} />
				<Route path={'/account'} component={AccountPage} />
				<Route path="/book/:id" component={BooksPage}/>
			</Switch>
		</Route>
	</Router>
);

export default MainRoute;
