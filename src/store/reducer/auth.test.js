import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';



describe('auth reducer', ()=> {
    it('should return initial state', ()=>{
        expect(reducer(undefined, {}))
        .toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,  
            authRedirect: '/'
        });
    });

    it('should store token upon login', ()=>{
        expect(reducer({
            
                token: null,
                userId: null,
                error: null,
                loading: false,  
                authRedirect: '/'
            
        }, {type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-UserID'
        })).toEqual({
            token: 'some-token',
            userId: 'some-UserID',
            error: null,
            loading: false,  
            authRedirect: '/'

        })
    })
});

