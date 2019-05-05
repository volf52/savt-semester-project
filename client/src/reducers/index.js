import { combineReducers } from 'redux';
import authReducer from './authReducer';
import shipReducer from './shipReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    auth: authReducer,
    shipR: shipReducer,
    errors: errorReducer,
});
