import React, { useReducer } from 'react';
import axios from "axios";
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    DISPLAYED_ON_PROFILE,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_AUTH_LOADING,
    RESET_AUTH_LOADING,
    LOGOUT
} from '../types';

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
        user: null,
        userRecipes: null,
        isAuthenticated: null,
        displayedOnProfile: "createdRecipe",
        authLoading: false,
        error: null
	};

	const [ state, dispatch ] = useReducer(authReducer, initialState);

    // Load User

    const loadUser = async () => {
        
        if(localStorage.token) {
            setAuthToken(localStorage.token)
          }
          
        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })

        } catch (err) {
            console.log(err)
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data.msg

            })
        }
    }

	// Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data

            });
            loadUser();

        } catch (err) {
            console.log(err)
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg

            })
        }
    }
    // Login User
    const logUser =  async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            setAuthLoading();
            const res = await axios.post('/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data

            });
            loadUser();
            resetAuthLoading();
            
        } catch (err) {
            console.log(err)
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg

            })
            resetAuthLoading();
        }
    }

    // Logout
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }

    // Loading

    const setAuthLoading = () => {
        dispatch({
            type: SET_AUTH_LOADING
        })
    }

    const resetAuthLoading = () => {
        dispatch({
            type: RESET_AUTH_LOADING
        })
    }

    // Clear Errors
    
    // Handle what's displayed on user profile

    const handleDisplayedOnProfile = (itemName) => {
        dispatch({
            type: DISPLAYED_ON_PROFILE,
            payload: itemName
        })
    }

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
                user: state.user,
                userRecipes: state.userRecipes,
				isAuthenticated: state.isAuthenticated,
                error: state.error,
                authLoading: state.authLoading,
                displayedOnProfile: state.displayedOnProfile,
                register,
                loadUser,
                logUser,
                logout,
                handleDisplayedOnProfile
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
