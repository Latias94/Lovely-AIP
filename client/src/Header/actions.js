import axios from 'axios';
import { showSuccess, showErrorMsgFromErrorObject } from "../common/utils/sweetAlert";


export const setCartNumberAction = number => ({ type: 'SET_CART_NUMBER', cartNumber: number });
export const addBookToCart = { type: 'ADD_CART_NUMBER' };

export const getUsersCart = () => (dispatch) => {
	axios({
		method: 'get',
		url: '/cart',
	})
		.then((res) => {
			dispatch(setCartNumberAction(res.data.length));
		});
};

export const addBookToCartData = (bookid, count) => (dispatch) => {
	axios({
		method: 'post',
		url: '/cart',
		data: {
			id: bookid,
			quantity: count,
		},
	})
		.then(() => {
			dispatch(addBookToCart);
			showSuccess();
		})
		.catch((error) => {
			showErrorMsgFromErrorObject(error);
		});
};
