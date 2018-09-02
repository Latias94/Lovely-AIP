import axios from 'axios';

export const setCartNumberAction = number => ({ type: 'SET_CART_NUMBER', cartNumber: number });
// export const initialCartContent = data => ({ type: 'SET_ini_CART', cartContent: data });

export const getUsersCart = () => (dispatch) => {
	axios({
		method: 'get',
		url: 'http://localhost:5000/api/cart',
	})
		.then((res) => {
			dispatch(setCartNumberAction(res.data.length));
		})
		.catch((err) => {
			console.log(err);
		});
};

export const addBookToCart = bookid => (dispatch) => {

};
