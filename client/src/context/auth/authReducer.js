import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            };
        case REGISTER_FAIL: 
        case LOGIN_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token : null,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        default:
            return state;
    }
}