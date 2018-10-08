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
import Payment from '../Payment';
import Admin from '../Admin';
import BookListDetail from '../BookList/BookList';
import Recommendation from '../Recommendation';
import BookListFeed from '../RSS/BookListFeed';
import Search from '../Search';
import PageNotFound from '../PageNotFound';

const MainRoute = () => (

	<Route>
		<Switch>
			<Route exact path={'/'} component={Welcome} />
			<Route path={'/register'} component={RegisterForm} />
			<Route path={'/login'} component={LoginForm} />
			<Route path={'/book/:id'} component={BooksPage} />
			<Route exact path={'/categories/:categoryID?'} component={Categories} />
			<Route path={'/cart'} component={Cart} />
			<Route path={'/account'} component={Account} />
			<Route path={'/verify-email'} component={EmailVerification} />
			<Route path={'/activate/:token'} component={VerifyEmail}/>
			<Route path={'/payment'} component={Payment}/>
			<Route path={'/booklist/:slug'} component={BookListDetail}/> {/* modal? */}
			<Route path={'/admin'} component={Admin} /> {/* TODO: move to another route */}
			<Route path={'/recommendation'} component={Recommendation} /> {/* TODO: move to another route */}
			<Route path={'/feed/book-lists.xml'} component={BookListFeed} />
			<Route path={'/search/:type/:parm?'} component={Search} />
			<Route component={PageNotFound} />
		</Switch>
	</Route>
);

export default MainRoute;
