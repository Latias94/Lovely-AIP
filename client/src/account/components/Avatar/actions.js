import { SET_AVATAR } from "./types";

export const setAvatar = img => (dispatch) => dispatch({
    type: SET_AVATAR,
	payload: {img},
})
