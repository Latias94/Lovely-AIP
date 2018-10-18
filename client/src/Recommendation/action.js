import axios from 'axios';
import { showErrorMsgFromErrorObject } from "../common/utils/sweetAlert";

export const setBookListDataAction = data => ({ type: 'SET_BOOKLIST_DATA', recommendation: data });

export const getBookListDataAction = () => (dispatch) => {
	axios.get('/booklists')
		.then((response) => {
			dispatch(setBookListDataAction(response.data));
		})
		.catch((error) => {
			showErrorMsgFromErrorObject(error)
		});
};
