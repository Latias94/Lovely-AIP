const initialState = {
	cartNumber: 0,
};

export default function (state = { cartNumber: 0 }, action) {
	switch (action.type) {
	case 'SET_CART_NUMBER':
		return {
			cartNumber: action.cartNumber,
		};
	default:
		return state;
	}
}
