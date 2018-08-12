import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import MainRoute from './routers/mainRouter';
import store from './store';
import setAuthToken from './account/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './account/actions/authActions';

import Header from './headerPage';
import Footer from './footerPage';

// Check for token
if (localStorage.jwtToken) {
	// Set token header in axios
	setAuthToken(localStorage.jwtToken);

	const decoded = jwt_decode(localStorage.jwtToken);
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

class App extends Component {
	render() {
		return (
			<Provider store={ store }>
				<div className='app'>
					<Header/>
					<div className="router"><MainRoute/></div>
					<Footer/>
				</div>
			</Provider>
		);
	}
}

export default App;
