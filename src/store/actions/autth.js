import * as actionTypes from './actionTypes';
import axios from 'axios';




export const authStart = ()=>{

    return{
        type: actionTypes.AUTH_START,
    }
};


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId,
        

    }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error,
    }
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());

        },expirationTime * 1000)

    };
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCen_DJxvYfOaqDDl3woFU2UeoU5i_arZg';
        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCen_DJxvYfOaqDDl3woFU2UeoU5i_arZg';
        }
        axios.post(url,
        authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err => {
            console.log(err)
            dispatch(authFail(err.response.data.error))
        })

    };
}

export const setAuthRedirect = (path) =>{

    return{
        type: actionTypes.SET_AUTH_REDIRECT,
        path,
    }
}
















