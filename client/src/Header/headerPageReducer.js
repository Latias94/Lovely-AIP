export default function (state = {
	cartNumber: 0, searchType: 0, data: {}, searchInputContent: '',
}, action) {
	const cartNumber = state.cartNumber;
	switch (action.type) {
	case 'SET_CART_NUMBER':
		return {
			cartNumber: action.cartNumber,
		};
	case 'ADD_CART_NUMBER':
		return {
			cartNumber: cartNumber + 1,
		};
	case 'SET_SEARCH_TYPE':
		return {
			searchType: action.searchType,
		};
	case 'SET_RES_DATA':
		return {
			resultData: action.resultData,
		};
	case 'CHANGE_INPUT_VALUE':
		return {
			searchInputContent: action.searchInputContent,
		};
	default:
		return state;
	}
}
