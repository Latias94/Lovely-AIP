export default (state = { bookNumber: 1 }, action) => {
	switch (action.type) {
	case 'SELECT_BOOKNUMBER':
		return { bookNumber: action.bookNumber };
	default:
		return state;
	}
};
