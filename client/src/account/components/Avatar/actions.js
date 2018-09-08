import { SET_AVATAR } from './types';
import { config } from '../../../config';

const baseURL = (config.ENV === 'production') ? config.REL_API_BASE_URL : config.DEV_API_BASE_URL;

export const setAvatar = imgURL => dispatch => dispatch({
	type: SET_AVATAR,
	imgURL: baseURL + imgURL,
});

// export const loadAvatar = imgURL => dispatch => {
//   axios({
//     url: 'https://m03s6dh33i0jtc3uzfml36au-wpengine.netdna-ssl.com/wp-content/uploads/photo-1461080639469-66d73688fb21-1024x608.jpg',
//     responseType: 'arraybuffer'
//   })
//     .then(res => {
//         console.log('structure of the res', res.data);
//         // if (res.status === 200) {
//         //     setAvatar(res.data.avatar)(dispatch)
//         // }
//     })
//     .catch(err => console.log(err))
// }
