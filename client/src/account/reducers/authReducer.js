import isEmpty from '../validation/isEmpty';
import { SET_CURRENT_USER } from '../actions/types';
import { SET_AVATAR } from "../components/Avatar/types";

const initialState = {
	isAuthenticated: false,
	user: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
	case SET_CURRENT_USER:
		return {
			...state,
			isAuthenticated: !isEmpty(action.payload),
			user: action.payload,
		};
		case SET_AVATAR:
			return {
				...state,
				avatar: action.imgURL
			}
	default:
		return state;
	}
}
