import {
    LOG_IN,
    REQUEST_LOGIN,
    REQUEST_LOGIN_SUCCESS,
    REQUEST_LOGIN_ERROR,
    LOG_OUT,
} from "./authActionTypes";
const initialState = {
    loggedIn: false,
    user: null,
    loading: false,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                user: action.user,
                loggedIn: true,
            };
        case LOG_OUT:
            return {
                ...state,
                user: null,
                loggedIn: false,
            };
        case REQUEST_LOGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case REQUEST_LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                loggedIn: true,
                loading: false,
            };
        case REQUEST_LOGIN_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return state;
    }
}