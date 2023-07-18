import {
    REQUEST_USERS,
    REQUEST_USERS_SUCCESS,
    REQUEST_USERS_ERROR,
    CLEAR_ERROR,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
} from './usersActionTypes';

const initialState = {
    users: [],
    isLoading: false,
    error: null,
    total: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        case REQUEST_USERS:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case REQUEST_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.users,
                total: action.size,
            };
        case REQUEST_USERS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        case ADD_USER:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case ADD_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        case DELETE_USER:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case DELETE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        case UPDATE_USER:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case UPDATE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        default:
            return state;
    }
}
