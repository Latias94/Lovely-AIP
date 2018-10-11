export default function (state = {
	booksInHomePage: [],
}, action) {
	switch (action.type) {
	case 'SET_WELCOME_BOOKS_DATA':
		return {
			booksInHomePage: [...action.booksInHomePage],
		};
	default:
		return state;
	}
}
