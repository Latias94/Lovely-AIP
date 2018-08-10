import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import Welcome from '../welcomePage';
import RegisterForm from '../registerPage';
import LoginForm from '../loginForm';
import BooksPage from '../booksPage';
import AccountPage from '../accountPage/AccountPage';
import store from '../store';

const MainRoute = () => (
	<Provider store={ store }>
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
	</Provider>
);

export default MainRoute;
