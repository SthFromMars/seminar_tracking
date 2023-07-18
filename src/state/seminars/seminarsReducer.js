import {
    REQUEST_SEMINARS,
    REQUEST_SEMINARS_SUCCESS,
    REQUEST_SEMINARS_ERROR,
    ADD_SEMINAR,
    ADD_SEMINAR_SUCCESS,
    ADD_SEMINAR_ERROR,
    DELETE_SEMINAR,
    DELETE_SEMINAR_SUCCESS,
    DELETE_SEMINAR_ERROR,
    UPDATE_SEMINAR,
    UPDATE_SEMINAR_SUCCESS,
    UPDATE_SEMINAR_ERROR,
    CLEAR_ERROR,
} from './seminarsActionTypes';

const initialState = {
    seminars: [],
    isLoading: false,
    error: null,
    total: 0,
    totalLength: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        case REQUEST_SEMINARS:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case REQUEST_SEMINARS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                seminars: action.seminars,
                total: action.size,
                totalLength: action.totalLength,
            };
        case REQUEST_SEMINARS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        case ADD_SEMINAR:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case ADD_SEMINAR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                total: action.size,
            };
        case ADD_SEMINAR_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        case DELETE_SEMINAR:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case DELETE_SEMINAR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                total: action.size,
            };
        case DELETE_SEMINAR_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        case UPDATE_SEMINAR:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case UPDATE_SEMINAR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                total: action.size,
            };
        case UPDATE_SEMINAR_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        default:
            return state;
    }
}
