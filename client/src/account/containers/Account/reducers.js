import { handleActions } from 'redux-actions';
import { setCurrentUserBookLists } from './actions';

const initialState = {
    bookLists: []
};

const accountReducer = handleActions({
	[setCurrentUserBookLists](state, { payload }) {
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
