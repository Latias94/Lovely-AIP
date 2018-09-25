export default function (state = { cartNumber: 0 }, action) {
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
	default:
		return state;
	}
}
