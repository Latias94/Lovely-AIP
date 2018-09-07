import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { setCurrentUser, logoutUser } from './account/actions/authActions';
import setAuthTokenInHeader from './account/utils/setAuthTokenInHeader';
import App from './App';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { config } from './config';

// set base URL in request
axios.defaults.baseURL = (config.ENV === 'production') ? config.REL_API_BASE_URL : config.DEV_API_BASE_URL;
// Check for token
if (localStorage.jwtToken) {
	// Set token header in axios
	setAuthTokenInHeader(localStorage.jwtToken);
	// set baseURL in header
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

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);
