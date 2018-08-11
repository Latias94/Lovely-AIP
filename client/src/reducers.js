import { combineReducers } from 'redux';
import booksPageReducer from './booksPage/booksPageReducer';
import categoryPageReducer from './allCategoriesPage/categoriesPageReducer';

export default combineReducers({
	booksPageReducer,
	categoryPageReducer,
});
// export BooksPageReducer;
