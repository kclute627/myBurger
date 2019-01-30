import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../utility'


const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,  
  authRedirect: '/'
};


const authStart = (state, action)=>{
    return updateObj(state, {error: null, loading: true});
}
const authSuccess = (state, action)=>{
    return updateObj(state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false    
    })
}

const authFail = (state, action)=>{
    return updateObj(state, {
        error: action.error,
        loading: false,
    })
}

const authLogout = (state, action) => {
    return updateObj(state, {
        token: null,
        userId: null,
    })
}

const authRedirect = (state, action)=>{
    return updateObj(state, {
        authRedirect: action.path
    })
}

const reducer =(state = initialState, action)=>{

    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT: return authRedirect(state, action);
        default: return state;
        
        
    }
    
   
}


export default reducer;