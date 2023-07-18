import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import seminarsReducer from './seminars/seminarsReducer';
import usersReducer from "./users/usersReducer";
import authReducer from './authorization/AuthReducer'

export default combineReducers({
    seminars: seminarsReducer,
    users: usersReducer,
    auth: authReducer,
    routerReducer,
});
