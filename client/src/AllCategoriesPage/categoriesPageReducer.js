const initialData = {
	name: {
		mainCategories: 'All',
		subCategories: '',
	},
	allCategories: [],
	booksInCategories: [],
};

export default (state = initialData, action) => {
	switch (action.type) {
	case 'SELECT_CATEGORY':
		return {
			...state, name: action.name,
		};
	case 'INITIAL_ALL_CATEGORIES':
		return {
			...state, allCategories: [...action.allCategories],
		};
	case 'SET_BOOKS_IN_CATEGORIES':
		return {
			...state, booksInCategories: [...action.booksInCategories.books],
		};
	default:
		return state;
	}
};
