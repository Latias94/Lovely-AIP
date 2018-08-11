import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

// Register User
export const registerUser = (userData, history) => (dispatch) => {
	axios({
		method: 'post',
		// TODO: URL need to be modified before deployment
		url: 'http://localhost:5000/api/users/register',
		header: {
			'Access-Control-Allow-Origin': '*',
			'content-type': 'application/x-www-form-urlencoded',
		},
		data: userData,
	})
		.then(() => history.push('/login'))
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data,
		}));
};

// Login and get the token
export const loginUser = userData => (dispatch) => {
	axios({
		method: 'post',
		// TODO: URL need to be modified before deployment
		url: 'http://localhost:5000/api/users/login',
		header: {
			'Access-Control-Allow-Origin': '*',
			'content-type': 'application/x-www-form-urlencoded',
		},
		data: userData,
	}).then((res) => {
		const { token } = res.data;
		// Save to localStorage
		localStorage.setItem('jwtToken', token);
		// Set to axios header
		setAuthToken(token);
		// TODO: email?
		const decoded = jwt_decode(token);
		dispatch(setCurrentUser(decoded));
	})
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data,
		}));
};

// install logged-in user
export const setCurrentUser = decoded => ({
	type: SET_CURRENT_USER,
	payload: decoded,
});

// log out
export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
