import { SET_AVATAR } from './types';

const initialState = {
	avatar: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
	case SET_AVATAR:
		return {
			...state,
			avatar: action.payload,
		};
	default:
		return state;
	}
}
