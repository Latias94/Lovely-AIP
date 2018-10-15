import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { setCurrentUser, logoutUser } from './account/common/actions/authActions';
import setAuthTokenInHeader from './account/common/utils/setAuthTokenInHeader';
import App from './App';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { API_BASE_URL } from './config';

// Set base URL in request
axios.defaults.baseURL = API_BASE_URL;
// Check the token
if (localStorage.jwtToken) {
	// Set token header in Axios
	setAuthTokenInHeader(localStorage.jwtToken);
	// Set baseURL in header
	const user = jwt_decode(localStorage.jwtToken);
	// Install user into store
	store.dispatch(setCurrentUser(user));
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (user.exp < currentTime) {
	// Logout user
		store.dispatch(logoutUser());
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
