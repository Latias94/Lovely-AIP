import { SET_AVATAR } from './types';

// TODO: 
const initialState = {
	avatar: 'use axios to get the pic OR set a default pic',
	// avatarURL: 'axios'
};

export default function (state = initialState, action) {
	switch (action.type) {
	case SET_AVATAR:
		return {
			...state,
			avatar: action.img
			// avatarURL: action.imgURL
		};
	default:
		return state;
	}
}
