import { SET_AVATAR } from "./types";
import axios from "axios";

export const setAvatar = img => dispatch => dispatch({
    type: SET_AVATAR,
    img
})

export const loadAvatar = imgURL => dispatch => {
    axios.get(imgURL)
    .then(res => {
        console.log('structure of the res', res);
        if (res.status === 200) {
            setAvatar(res.data.avatar)(dispatch)
        }
    })
    .catch(err => console.log(err))
}
