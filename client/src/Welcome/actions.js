import axios from 'axios';

export const setWelcomePageBooksDataAction = data => ({ type: 'SET_WELCOME_BOOKS_DATA', booksInHomePage: data });

const booklistID = ['5b87b6da566163069154f729', '5b87b55f566163069154f705', '5b83eda73cf33874746df9b1'];

export const getWelcomePageBooksDataAction = () => (dispatch) => {
	const result = [];
	booklistID.forEach(
		(v) => {
			axios({
				method: 'get',
				url: `/booklists/${v}`,
			}).then((response) => {
				result.push(response.data);
				dispatch(setWelcomePageBooksDataAction(result));
			})
				.catch((error) => {
					console.log(error);
				});
		},
	);
};
