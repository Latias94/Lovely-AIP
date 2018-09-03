import axios from 'axios';

export const setCartNumberAction = number => ({ type: 'SET_CART_NUMBER', cartNumber: number });
export const addBookToCart = { type: 'ADD_CART_NUMBER' };
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

export const addBookToCartData = bookid => (dispatch) => {
	axios({
		method: 'post',
		url: `http://localhost:5000/api/cart/${bookid}`,
	})
		.then(() => {
			dispatch(addBookToCart);
			alert('Add product successful');
		})
		.catch((error) => {
			console.log(error);
		});
};
