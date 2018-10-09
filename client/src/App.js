import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter} from 'react-router-dom';

import './App.css';
import MainRoute from './routers/mainRouter';
import Header from './Header';
import Footer from './Footer';


class App extends Component {
	componentDidMount() {
		document.title = 'Knight Frank';
	}

	static hideHeaderFooter() {
		const isAdmin = window.location.pathname === '/admin';
		const isRss = window.location.pathname === '/feed/book-lists.xml';
		return isAdmin || isRss;
	}

	render() {
		const show = !App.hideHeaderFooter();
		const { authed, isAdmin } = this.props;

		return (
			<div className='app'>
				{show && <Header/>}
				<div className='router'>
					<MainRoute authed={authed} isAdmin={isAdmin}/>
				</div>
				{show && <Footer/>}
			</div>
		);
	}
}

const mapStateToProps = state => ({
    authed: state.auth.isAuthenticated,
    isAdmin: state.auth.user.isStaff,
});

export default compose(
	withRouter,
	connect(mapStateToProps)
)(App);
