import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router';
import MainRoute from './routers/mainRouter';
import Header from './Header';
import Footer from './Footer';


class App extends Component {
	componentDidMount() {
		document.title = 'Knight Frank';
	}

	hideHeaderFooter() {
		const isAdmin = this.props.location.pathname === '/admin';
		const isRss = this.props.location.pathname === '/feed/book-lists.xml';
		return isAdmin || isRss;
	}

	render() {
		const showHeaderFooter = !this.hideHeaderFooter();

		return (
			<div className='app' style={{backgroundColor:'#FAFAFA'}}>
				{showHeaderFooter && <Header/>}
				<div className="router"><MainRoute/></div>
				{showHeaderFooter && <Footer/>}
			</div>
		);
	}
}

// use withRouter HOC in order to inject match, history and location in the component props.
export default withRouter(App);
