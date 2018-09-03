import { combineReducers } from 'redux';
import authReducer from './account/reducers/authReducer';
import errorReducer from './account/reducers/errorReducer';
import booksPageReducer from './booksPage/booksPageReducer';
import categoryPageReducer from './allCategoriesPage/categoriesPageReducer';
import headerReducer from './Header/headerPageReducer';
import cartPageTableRowReducer from './Cart/cartTableRow/cartTableRowReducer';

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	booksPageReducer,
	categoryPageReducer,
	headerReducer,
	cartPageTableRowReducer,
});
// root reducer
