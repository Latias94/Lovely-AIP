export default (state = { booksCategory: '5b654b5b9147ad0de0336650' }, action) => {
	switch (action.type) {
	case 'SELECT_CATEGORY':
		return { booksCategory: action.booksCategory };
	default:
		return state;
	}
};
