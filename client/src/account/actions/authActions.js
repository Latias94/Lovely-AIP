import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthTokenInHeader from '../utils/setAuthTokenInHeader';

/**
 * @todo use Redux for the validation
 * @param data - User data
 * @returns boolean is validated
 */

const validate = data => (dispatch) => {
	const {
		email, name, password, password2,
	} = data;
	if (email.length === 0) {
		const errMsg = { email: 'Please fill in your email.' };
		dispatch({
			type: GET_ERRORS,
			payload: errMsg,
		});
		return false;
	}
	if (name.length === 0) {
		const errMsg = { name: 'Please fill in your name.' };
		dispatch({
			type: GET_ERRORS,
			payload: errMsg,
		});
		return false;
	}
	if (name.length < 2 || name.length > 30) {
		const errMsg = { name: 'Name must be between 2 and 30 characters.' };
		dispatch({
			type: GET_ERRORS,
			payload: errMsg,
		});
		return false;
	}
	if (password.length === 0) {
		const errMsg = { password: 'Password is required.' };
		dispatch({
			type: GET_ERRORS,
			payload: errMsg,
		});
		return false;
	}
	if (password.length < 6) {
		const errMsg = { password: 'Password must be at least 6 character.' };
		dispatch({
			type: GET_ERRORS,
			payload: errMsg,
		});
		return false;
	}
	if (password2.length === 0) {
		const errMsg = { password2: 'Please type your password again.' };
		dispatch({
			type: GET_ERRORS,
			payload: errMsg,
		});
		return false;
	}
	if (password !== password2) {
		const errMsg = { password2: 'The two passwords don\'t match.' };
		dispatch({
			type: GET_ERRORS,
			payload: errMsg,
		});
		return false;
	}
	return true;
};

// Register User
export const registerUser = (userData, history) => (dispatch) => {
	const isValid = validate(userData)(dispatch);
	if (isValid) {
		delete userData.password2;
		sessionStorage.setItem('unactivatedEmail', userData.email);
		axios({
			method: 'post',
			url: '/users/register',
			data: userData,
		})
			.then(() => history.push('/verify-email'))
			.catch(err => dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			}));
	}
};

// install logged-in user
export const setCurrentUser = decoded => ({
	type: SET_CURRENT_USER,
	payload: decoded,
});

// TODO: split it to the right page folder
// Login and get the token
export const loginUser = userData => (dispatch) => {
	axios.post('/users/login', userData)
	.then((res) => {
		const { token } = res.data;
		// Save to localStorage
		localStorage.setItem('jwtToken', token);
		// Set to Axios global header
		setAuthTokenInHeader(token);
		const decoded = jwt_decode(token);
		dispatch(setCurrentUser(decoded));
	})
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data,
		}));
};

// log out
export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('jwtToken');
	// Remove auth header from global
	setAuthTokenInHeader(false);
	// Set current user to {} which will set isAuthenticated to false as well
	dispatch(setCurrentUser({}));
	// return to home page
	window.location = '/';
};

// TODO: move this to account folder
export const getCurrentUserInfo = () => (dispatch) => {
	axios.get('/users/current')
		.then((res) => {
			dispatch(setCurrentUser(res.data));
		})
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data,
		}));
};
