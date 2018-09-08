const initialState = {
	cartNumber: 0,
};

export default function (state = { totalPrice: 0 }, action) {
	switch (action.type) {
	case 'SET_PRODUCTS_TOTALPRICE':
		return {
			totalPrice: action.totalPrice,
		};
	default:
		return state;
	}
}
