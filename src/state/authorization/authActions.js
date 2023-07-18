import {
    LOG_IN,
    REQUEST_LOGIN,
    REQUEST_LOGIN_SUCCESS,
    REQUEST_LOGIN_ERROR,
    LOG_OUT,
} from "./authActionTypes";
import {apiUrl} from "../../utils/constants";

export function logIn(user) {
    return {
        type: LOG_IN,
        user: user,
    };
}

export function logOut() {
    return {
        type: LOG_OUT,
    };
}

function requestLogIn() {
    return {
        type: REQUEST_LOGIN,
    };
}

function requestLogInSuccess(user) {
    return {
        type: REQUEST_LOGIN_SUCCESS,
        user,
    };
}

function requestLogInError(error) {
    return {
        type: REQUEST_LOGIN_ERROR,
        error,
    };
}

export function fetchLogIn(username, password) {
    const url = new URL(apiUrl + 'logIn.php');
    url.searchParams.append('userName', username);
    url.searchParams.append('password', password);
    return async (dispatch) => {
        dispatch(requestLogIn());
        try {
            const response = await fetch(url);
            const status = response.status;
            if(status===200){
                const responseJSON = await response.json();
                dispatch(requestLogInSuccess(responseJSON ));
            }
            else if(status===404){
                dispatch(requestLogInError('Blogas prisijungimo vardas arba slaptažodis'));
            }
            else{
                dispatch(requestLogInError('Serverio klaida.\nPabandykite vėliau.'));
            }
        } catch (e) {
            dispatch(requestLogInError('Serverio klaida.\nPabandykite vėliau.'));
        }
    };
}