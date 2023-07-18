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
import { apiUrl } from '../../utils/constants'

async function checkAvailability(user, userId) {
    const url = new URL(apiUrl + 'checkUser.php');
    url.searchParams.append('userName', user.username)
    url.searchParams.append('name', user.name)
    url.searchParams.append('userId', userId)
        const response = await fetch(url);
        const responseJSON = await response.json();
        return responseJSON
}

export function clearError() {
    return {
        type: CLEAR_ERROR,
    };
}

function requestUsers() {
    return {
        type: REQUEST_USERS,
    };
}

function requestUsersSuccess(users, size) {
    return {
        type: REQUEST_USERS_SUCCESS,
        users,
        size,
    };
}

function requestUsersError(error) {
    return {
        type: REQUEST_USERS_ERROR,
        error,
    };
}

export function fetchUsers(params) {
    const url = new URL(apiUrl + 'getUsers.php');
    params.forEach(param => url.searchParams.append(param.label, param.value));
    return async (dispatch) => {
        dispatch(requestUsers());
        try {
            const response = await fetch(url);
            const responseJSON = await response.json();
            dispatch(requestUsersSuccess(responseJSON.users, responseJSON.size));
        } catch (e) {
            dispatch(requestUsersError('bServerio klaida.\nPabandykite vėliau.'));
        }
    };
}



function addUser() {
    return {
        type: UPDATE_USER,
    };
}

function addUserSuccess() {
    return {
        type: UPDATE_USER_SUCCESS,
    };
}

function addUserError(error) {
    return {
        type: UPDATE_USER_ERROR,
        error,
    };
}

export function postUser(user, params, handleClose) {
    const url = new URL(apiUrl + 'postUser.php');
    return async (dispatch) => {
        dispatch(addUser());
        try {
            const availability = await checkAvailability(user, 'c5f12c4c-47a6-11ea-b77f-2e728ce88125');
            if(!availability.pass){
                dispatch(addUserError(`${availability.fail === 'username' ? 'Vartotojo vardas' : 'Vardas'} turi būti unikalus.`));
            }
            else{
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
                await response.json();
                dispatch(addUserSuccess());
                handleClose();
                dispatch(fetchUsers(params));
            }
        } catch (e) {
            dispatch(addUserError('Serverio klaida.\nPabandykite vėliau.'));
        }
    };
}

function deleteUser() {
    return {
        type: DELETE_USER,
    };
}

function deleteUserSuccess() {
    return {
        type: DELETE_USER_SUCCESS,
    };
}

function deleteUserError(error) {
    return {
        type: DELETE_USER_ERROR,
        error,
    };
}

export function removeUser(id, params, closeModal) {
    const url = new URL(apiUrl + 'deleteUser.php');
    url.searchParams.append('userId', id);
    return async (dispatch) => {
        dispatch(deleteUser());
        try {
            const response = await fetch(url, {
                method: 'POST'
            });
            await response.json();
            dispatch(deleteUserSuccess());
            dispatch(fetchUsers(params));
        } catch (e) {
            dispatch(deleteUserError('Serverio klaida.\nPabandykite vėliau.'));
        }
    };
}

function updateUser() {
    return {
        type: ADD_USER,
    };
}

function updateUserSuccess() {
    return {
        type: ADD_USER_SUCCESS,
    };
}

function updateUserError(error) {
    return {
        type: ADD_USER_ERROR,
        error,
    };
}

export function editUser(seminar, seminarId, params, handleClose) {
    const url = new URL(apiUrl + 'postUpdateUser.php');
    url.searchParams.append('userId', seminarId);
    return async (dispatch) => {
        dispatch(updateUser());
        try {
            const availability = await checkAvailability(seminar, seminarId);
            if(!availability.pass){
                dispatch(addUserError(`${availability.fail === 'username' ? 'Vartotojo vardas' : 'Vardas'} turi būti unikalus.`));
            }
            else {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(seminar)
                });
                await response.json();
                dispatch(updateUserSuccess());
                handleClose();
                dispatch(fetchUsers(params));
            }
        } catch (e) {
            dispatch(updateUserError('aServerio klaida.\nPabandykite vėliau.'));
        }
    };
}