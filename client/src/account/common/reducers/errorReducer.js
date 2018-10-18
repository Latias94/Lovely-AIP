import { GET_ERRORS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
	switch (action.type) {
	case GET_ERRORS:
		if (Object.prototype.hasOwnProperty.call(action.payload, 'emailexist')) {
			return { email: 'This email address is already singed up.' };
		}
		if (Object.prototype.hasOwnProperty.call(action.payload, 'usernotfound')) {
			return { email: 'The email address is not signed up.' };
		}
		return action.payload;
	default:
		return state;
	}
}
