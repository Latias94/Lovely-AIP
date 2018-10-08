import axios from 'axios';

export const setCartNumberAction = number => ({ type: 'SET_CART_NUMBER', cartNumber: number });
export const addBookToCart = { type: 'ADD_CART_NUMBER' };
// export const initialCartContent = data => ({ type: 'SET_ini_CART', cartContent: data });
export const setSearchType = type => ({ type: 'SET_SEARCH_TYPE', searchType: type });
export const setResData = data => ({ type: 'SET_RES_DATA', resultData: data });
export const searchInputContentChange = text => ({ type: 'CHANGE_INPUT_VALUE', searchInputContent: text });

export const getUsersCart = () => (dispatch) => {
	axios({
		method: 'get',
		url: '/cart',
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
		url: `/cart/${bookid}`,
	})
		.then(() => {
			dispatch(addBookToCart);
			alert('Add product successful');
		})
		.catch((error) => {
			console.log(error);
		});
};
