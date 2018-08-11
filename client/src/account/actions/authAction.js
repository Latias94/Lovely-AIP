import axios from 'axios';
import { GET_ERRORS } from './types';

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
		.then(res => history.push('/login'))
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data,
		}));
};
