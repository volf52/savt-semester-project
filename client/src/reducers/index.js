import { combineReducers } from 'redux';
import authReducer from './authReducer';
import shipReducer from './shipReducer';
import errorReducer from './errorReducer';
import routesReducer from './routesReducer';

export default combineReducers({
    auth: authReducer,
    shipR: shipReducer,
    errors: errorReducer,
    routesR: routesReducer,
});
