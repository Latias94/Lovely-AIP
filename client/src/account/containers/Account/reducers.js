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
}, initialState);

export default accountReducer;
