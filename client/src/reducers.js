// root reducer
import { combineReducers } from 'redux';
import authReducer from './account/reducers/authReducer';
import errorReducer from './account/reducers/errorReducer';

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
});
