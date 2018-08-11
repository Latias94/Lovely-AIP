import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { jwt_decode as decoder } from 'jwt-decode';
import Welcome from '../welcomePage';
import RegisterForm from '../account/registerPage';
import LoginForm from '../account/loginForm';
import BooksPage from '../booksPage';
import Categories from '../allCategoriesPage';
import AccountPage from '../account/accountPage/AccountPage';
import store from '../store';
import setAuthToken from '../account/utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../account/actions/authActions';

// Check for token
if (localStorage.jwtToken) {
	// Set token header in axios
	setAuthToken(localStorage.jwtToken);

	const decoded = decoder(localStorage.jwtToken);
	// install user
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
	// Logout user
    store.dispatch(logoutUser());
		// TODO: Clear current Profile

	// Redirect to login
	//   window.location.href = '/login';
	}
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
          <Route path="/categories" component={Categories} />
				</Switch>
			</Route>
		</Router>
	</Provider>
);

export default MainRoute;