import { SET_AVATAR } from './types';

export const setAvatar = imgURL => dispatch => dispatch({
	type: SET_AVATAR,
	imgURL,
});
