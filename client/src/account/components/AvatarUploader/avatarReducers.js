import { SET_AVATAR } from './types';

// TODO: 
const initialState = {
	imgURL: null
	// avatarURL: 'Axios'
};

export default function (state = initialState, action) {
	switch (action.type) {
	case SET_AVATAR:
		return {
			...state,
			imgURL: action.imgURL
		};
	default:
		return state;
	}
}
