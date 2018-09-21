import Axios from 'axios';
import { createAction } from 'redux-actions';
// import { GET_CURRENT_USER_BOOKLISTS } from './types';

// export const { getCurrentUserBookLists } = createActions({
//     GET_CURRENT_USER_BOOKLISTS: (dispatch) => {
//         Axios.get('/users/current/booklist')
//             .then(res => {
//                 dispatch({
//                     type: GET_CURRENT_USER_BOOKLISTS,
//                     bookLists: res.data
//                 });
//             })
//             .catch(err => console.log(err.data));
//     },
//     // DECREMENT: (amount = 1) => ({ amount: -amount })
// });
//
// const createActions({
//     GET_CURRENT_USER_BOOKLISTS: (dispatch) => {
//         Axios.get('/users/current/booklist')
//             .then(res => {
//                 dispatch({
//                     type: GET_CURRENT_USER_BOOKLISTS,
//                     bookLists: res.data
//                 });
//             })
//             .catch(err => console.log(err.data));
//     },
//     // DECREMENT: (amount = 1) => ({ amount: -amount })
// });

export const setCurrentUserBookListsRequest = createAction('SET_CURRENT_USER_BOOKLISTS');

export const getCurrentUserBookLists = () => (dispatch) => {
	Axios.get('/users/current/booklist')
		.then(res => {
			dispatch(setCurrentUserBookListsRequest(res.data));
		})
		.catch(err => console.log(err.data));
};

export const createBookList = (title, description) => (dispatch) => {
    Axios.post('/booklists', { title, description })
        .then(res => {
            // refresh
			getCurrentUserBookLists()(dispatch);
        })
		.catch(
            // TODO: transfer error msg to UI
            ()=>{})
};
