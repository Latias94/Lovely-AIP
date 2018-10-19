import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Welcome from '../Welcome';
import RegisterForm from '../account/containers/Register';
import LoginForm from '../account/containers/LoginForm';
import BooksPage from '../BookPage';
import Categories from '../AllCategoriesPage';
import Account from '../account/containers/Account';
import EmailSent from '../account/containers/EmailSent';
import EmailVerification from '../account/containers/EmailVerification/index';
import Cart from '../Cart';
import Admin from '../Admin';
import BookListDetail from '../BookList/index';
import Recommendation from '../Recommendation';
import Search from '../Search';
import PageNotFound from '../PageNotFound';

const MainRoute = (props) => {
	const { authed, isAdmin } = props;

	return (
		<Route>
			<Switch>
				<Route exact path={'/'} component={Welcome} />
				<Route path={'/register'} component={RegisterForm} />
				<Route path={'/login'} component={LoginForm} />
				<Route path={'/book/:id'} component={BooksPage} />
				<Route exact path={'/categories/:categoryID?'} component={Categories} />
				<PrivateRoute authed={authed} path={'/cart'} component={Cart} />
				<PrivateRoute authed={authed} path={'/account'} component={Account} />
				<Route path={'/email-sent'} component={EmailSent} />
				<Route path={'/activate/:token'} component={EmailVerification}/>
				<Route path={'/booklist/:slug'} component={BookListDetail}/>
				<PrivateRoute authed={isAdmin} path={'/admin'} component={Admin} />
				<Route path={'/recommendation'} component={Recommendation} />
				<Route path={'/search/:type/:parm?'} component={Search} />
				<Route component={PageNotFound} />
			</Switch>
		</Route>
	);
};

export default MainRoute;
