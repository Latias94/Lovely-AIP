import { combineReducers } from 'redux';
import authReducer from './account/reducers/authReducer';
import errorReducer from './account/reducers/errorReducer';
import booksPageReducer from './booksPage/booksPageReducer';
import categoryPageReducer from './allCategoriesPage/categoriesPageReducer';
import headerReducer from './Header/headerPageReducer';
import avatarReducers from "./account/components/Avatar/avatarReducers";
import cartPageTableRowReducer from './Cart/cartTableRow/cartTableRowReducer';

// root reducer
export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	booksPageReducer,
	categoryPageReducer,
	headerReducer,
	avatarReducers,
	cartPageTableRowReducer,
});
