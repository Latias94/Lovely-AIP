const initialNames = {
	mainCategories: '',
	subCategories: '',
};

export default (state = { name: initialNames }, action) => {
	switch (action.type) {
	case 'SELECT_CATEGORY':
		return {
			name: action.name,
		};
	default:
		return state;
	}
};
