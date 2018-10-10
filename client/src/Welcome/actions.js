import axios from 'axios';

export const setWelcomePageBooksDataAction = data => ({ type: 'SET_WELCOME_BOOKS_DATA', booksInHomePage: data });

export const getWelcomePageBooksDataAction = itemid => (dispatch) => {
	axios({
		method: 'get',
		url: `/booklists/${itemid}`,
	}).then((response) => {
		dispatch(setWelcomePageBooksDataAction(response.data));
	}).catch((error) => {
		console.log(error);
	});
};
