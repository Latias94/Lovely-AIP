import isEmpty from '../utils/isEmpty';
import { SET_CURRENT_USER } from '../actions/types';
import { SET_AVATAR } from "../../containers/AvatarUploader/types";

const initialState = {
	isAuthenticated: false,
	user: {},
};

export default function (state = initialState, action) {
	// TODO: redux-actions
	switch (action.type) {
	case SET_CURRENT_USER:
		return {
			...state,
			isAuthenticated: !isEmpty(action.payload),
			user: action.payload,
		};
		case SET_AVATAR:
			// TODO: refine this
			const newUser = state.user;
			newUser.avatar = action.imgURL;
			return {
				...state,
				user: newUser
			};
	default:
		return state;
	}
}
