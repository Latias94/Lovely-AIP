import { handleActions } from 'redux-actions';
import { setCurrentUserBookListsRequest } from './actions';

const initialState = {
    bookLists: []
};

const accountReducer = handleActions({
	[setCurrentUserBookListsRequest](state, { payload }) {
        console.log(payload)
		return {
			...state,
			bookLists: payload,
		};
	},
	// [decrementCounter](state) {
	// 	return state - 1;
	// },
}, initialState);

export default accountReducer;
