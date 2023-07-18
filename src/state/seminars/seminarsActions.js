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
import { apiUrl } from '../../utils/constants'

export function clearError() {
    return {
        type: CLEAR_ERROR,
    };
}

function requestSeminars() {
    return {
        type: REQUEST_SEMINARS,
    };
}

function requestSeminarsSuccess(seminars, size, totalLength) {
    return {
        type: REQUEST_SEMINARS_SUCCESS,
        seminars,
        size,
        totalLength,
    };
}

function requestSeminarsError(error) {
    return {
        type: REQUEST_SEMINARS_ERROR,
        error,
    };
}

export function fetchSeminars(params) {
    const url = new URL(apiUrl + 'getSeminars.php');
    params.forEach(param => url.searchParams.append(param.label, param.value));
    return async (dispatch) => {
        dispatch(requestSeminars());
        try {
            const response = await fetch(url);
            // console.log(await response.text())
            const responseJSON = await response.json();
            // console.log(JSON.stringify(responseJSON, null, 1));
            dispatch(requestSeminarsSuccess(responseJSON.seminars, responseJSON.size, responseJSON.totalLength));
        } catch (e) {
            dispatch(requestSeminarsError('Serverio klaida.\nPabandykite vėliau.'));
        }
    };
}


function addSeminar() {
    return {
        type: UPDATE_SEMINAR,
    };
}

function addSeminarSuccess() {
    return {
        type: UPDATE_SEMINAR_SUCCESS,
    };
}

function addSeminarError(error) {
    return {
        type: UPDATE_SEMINAR_ERROR,
        error,
    };
}

export function postSeminar(seminar, params, handleClose) {
    const url = new URL(apiUrl + 'postSeminar.php');
    return async (dispatch) => {
        dispatch(addSeminar());
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(seminar)
            });
            await response.json();
            dispatch(addSeminarSuccess());
            handleClose();
            dispatch(fetchSeminars(params));
        } catch (e) {
            dispatch(addSeminarError('Serverio klaida.\nPabandykite vėliau.'));
        }
    };
}

function deleteSeminar() {
    return {
        type: DELETE_SEMINAR,
    };
}

function deleteSeminarSuccess() {
    return {
        type: DELETE_SEMINAR_SUCCESS,
    };
}

function deleteSeminarError(error) {
    return {
        type: DELETE_SEMINAR_ERROR,
        error,
    };
}

export function removeSeminar(id, params, closeModal) {
    const url = new URL(apiUrl + 'deleteSeminar.php');
    url.searchParams.append('seminarId', id);
    return async (dispatch) => {
        dispatch(deleteSeminar());
        try {
            const response = await fetch(url, {
                method: 'POST'
            });
            await response.json();
            dispatch(deleteSeminarSuccess());
            dispatch(fetchSeminars(params));
        } catch (e) {
            dispatch(deleteSeminarError('Serverio klaida.\nPabandykite vėliau.'));
        }
    };
}

function updateSeminar() {
    return {
        type: ADD_SEMINAR,
    };
}

function updateSeminarSuccess() {
    return {
        type: ADD_SEMINAR_SUCCESS,
    };
}

function updateSeminarError(error) {
    return {
        type: ADD_SEMINAR_ERROR,
        error,
    };
}



export function editSeminar(seminar, seminarId, params, handleClose) {
    const url = new URL(apiUrl + 'postUpdateSeminar.php');
    url.searchParams.append('seminarId', seminarId);
    return async (dispatch) => {
        dispatch(updateSeminar());
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(seminar)
            });
            await response.json();
            dispatch(updateSeminarSuccess());
            handleClose();
            dispatch(fetchSeminars(params));
        } catch (e) {
            dispatch(updateSeminarError('Serverio klaida.\nPabandykite vėliau.'));
        }
    };
}