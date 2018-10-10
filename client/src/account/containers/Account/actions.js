import Axios from 'axios';
import {createAction} from 'redux-actions';
import swal from 'sweetalert2';
import {showErrorMsgFromErrorObject} from '../../../common/utils/sweetAlert';

export const setCurrentUserBookLists = createAction('SET_CURRENT_USER_BOOKLISTS');

export const getCurrentUserBookLists = () => (dispatch) => {
	Axios.get('/users/current/booklist')
		.then((res) => {
			dispatch(setCurrentUserBookLists(res.data));
		})
		.catch(err => showErrorMsgFromErrorObject(err));
};

export const createBookList = (title, description) => (dispatch) => {
	Axios.post('/booklists', {title, description})
		.then(() => {
			// refresh
			getCurrentUserBookLists()(dispatch);
			swal({
				position: 'top',
				title: 'Created!',
				showConfirmButton: false,
				timer: 1500
			});
		})
		.catch(err => showErrorMsgFromErrorObject(err));
};
