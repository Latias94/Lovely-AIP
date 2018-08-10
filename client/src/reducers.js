// root reducer
import { combineReducers } from 'redux';
import authReducer from './account/reducers/authReducer';

export default combineReducers({
	auth: authReducer,
});
