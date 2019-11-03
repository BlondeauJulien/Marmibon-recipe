import React, { useReducer } from 'react';
import axios from "axios";
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../types';

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		user: null,
		isAuthenticated: null,
		error: null
	};

	const [ state, dispatch ] = useReducer(authReducer, initialState);

    // Load User

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

            })

        } catch (err) {
            console.log(err)
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg

            })
        }
    }
	// Login User

	// Logout

	// Clear Errors

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
                error: state.error,
                register
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
