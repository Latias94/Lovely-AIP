import axios from 'axios';

export const setBookListDataAction = data => ({ type: 'SET_BOOKLIST_DATA', recommendation: data });

export const getBookListDataAction = () => (dispatch) => {
	axios.get('/booklists')
		.then((response) => {
			dispatch(setBookListDataAction(response.data));
		})
		.catch((error) => { console.log(error); });
};
