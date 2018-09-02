import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Welcome from '../Welcome';
import RegisterForm from '../account/components/Register';
import LoginForm from '../account/components/LoginForm';
import BooksPage from '../booksPage';
import Categories from '../allCategoriesPage';
import Account from '../account/components/Account';
import EmailVerification from '../account/components/EmailVerification';
import VerifyEmail from '../account/utils/verifyEmail';
import Cart from '../Cart';

const MainRoute = () => (

	<Route>
		<Switch>
			<Route exact path="/" component={Welcome} />
			<Route path="/register" component={RegisterForm} />
			<Route path="/login" component={LoginForm} />
			<Route path="/book/:id" component={BooksPage} />
			<Route path="/categories/:categoryID?" component={Categories} />
			<Route path="/cart" component={Cart} />
			<Route path={'/account'} component={Account} />
			<Route path={'/verify-email'} component={EmailVerification} />
			<Route path={'/activate/:token'} component={VerifyEmail}/>
		</Switch>
	</Route>
);

export default MainRoute;
