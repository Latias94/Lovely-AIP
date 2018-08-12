import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setCurrentUser, logoutUser } from './account/actions/authActions';
import setAuthToken from './account/utils/setAuthToken';
import App from './App';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

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


ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);
