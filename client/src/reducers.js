import { combineReducers } from 'redux';
import authReducer from './account/common/reducers/authReducer';
import errorReducer from './account/common/reducers/errorReducer';
import booksPageReducer from './BookPage/booksPageReducer';
import categoryPageReducer from './AllCategoriesPage/categoriesPageReducer';
import headerReducer from './Header/headerPageReducer';
import cartPageTableRowReducer from './Cart/cartTableRow/cartTableRowReducer';
import userReducer from './account/containers/Account/reducers';
import recommendationReducer from './Recommendation/RecommendationReducer';
import welcomePageReducer from './Welcome/welcomePageReducer';

// root reducer
export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	booksPageReducer,
	categoryPageReducer,
	headerReducer,
	user: userReducer,
	cartPageTableRowReducer,
	recommendationReducer,
	welcomePageReducer,
});
