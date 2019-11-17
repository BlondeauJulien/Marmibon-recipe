import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    DISPLAYED_ON_PROFILE,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                userRecipes: action.payload.recipes
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            };
        case LOGOUT: 
            localStorage.removeItem("token")
            return {
                ...state,
                token: localStorage.getItem('token'),
                user: null,
                userRecipes: null,
                isAuthenticated: null,
                displayedOnProfile: "createdRecipe",
                error: null
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
            };
        case DISPLAYED_ON_PROFILE:
            return {
                ...state,
                displayedOnProfile: action.payload
            }
        default:
            return state;
    }
}