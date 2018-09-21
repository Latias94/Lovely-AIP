import Axios from 'axios';
import { createAction } from 'redux-actions';


export const setCurrentUserBookLists = createAction('SET_CURRENT_USER_BOOKLISTS');

export const getCurrentUserBookLists = () => (dispatch) => {
	Axios.get('/users/current/booklist')
		.then((res) => {
			dispatch(setCurrentUserBookLists(res.data));
		})
		.catch(err => console.log(err.data));
};

export const createBookList = (title, description) => (dispatch) => {
	Axios.post('/booklists', { title, description })
		.then((res) => {
			// refresh
			getCurrentUserBookLists()(dispatch);
		})
	// TODO: transfer error msg to UI
		.catch(() => {});
};
