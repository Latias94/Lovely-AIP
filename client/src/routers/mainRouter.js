import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import Welcome from '../welcomePage';
import RegisterForm from '../account/registerPage';
import LoginForm from '../account/loginForm';
import BooksPage from '../booksPage';
import AccountPage from '../account/accountPage/AccountPage';
import store from '../store';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../account/utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../account/actions/authActions';

// Check for token
if (localStorage.jwtToken) {
	// Set token header in axios
	setAuthToken(localStorage.jwtToken);

	const decoded = jwt_decode(localStorage.jwtToken);
	// install user
	store.dispatch(setCurrentUser(decoded));
  }

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
