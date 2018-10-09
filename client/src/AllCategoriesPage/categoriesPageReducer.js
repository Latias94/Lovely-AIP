const defaultDate = {
	// booksCategory: '5b69933780422c14325872a7',
	mainCategories: 'Computers & Technology',
	subCategories: 'Databases & Big Data',
};

export default (state = { name: defaultDate }, action) => {
	switch (action.type) {
	case 'SELECT_CATEGORY':
		return {
			name: action.name,
		};
	default:
		return state;
	}
};
