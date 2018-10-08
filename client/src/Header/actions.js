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

export const search = (type, pram) => (dispatch) => {
	let content = {};
	switch (type) {
	case 0:
		content = {
			method: 'get',
			url: `/booklists/slug/${pram.slug}`,
		};
		break;
	case 1:
		content = {
			method: 'get',
			url: `/books/search/${pram.slug}?page=1&pageSize=20`,
		};
		break;
	case 2:
		content = {
			method: 'get',
			url: `/books/isbn/${pram.slug}`,
		};
		break;
	default:
		break;
	}
	if (content) {
		axios(content)
			.then((res) => {
				dispatch(setResData({ data: res.data }));
			});
	}
};
