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
    localStorage.removeItem('token');
    localStorage.removeItem('expiritaionDate');
    localStorage.removeItem('userId');
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
            const experitionDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            console.log(response);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expiritaionDate', experitionDate );
            localStorage.setItem('userId', response.data.localId );
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
};

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        
        if(!token){
            dispatch(logout())
        }else{
            const expires = new Date(localStorage.getItem('expiritaionDate'));
            if(expires <= new Date()){
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expires.getTime() - new Date().getTime()) / 1000 ));
            }

            dispatch(authSuccess())
        }
    }
}
















