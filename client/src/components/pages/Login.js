import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const authContext = useContext(AuthContext);

    const { logUser, error, clearErrors, isAuthenticated } = authContext;

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { email, password } = user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        if(email === "" || password === "") {
            console.log("Empty input")
        } else {
            logUser({
                email,
                password
            })
        }
    }


    return (
        <div className="auth-form-container">
            <form onSubmit={onSubmit} className="auth-form">
                <p>Connectez-vous avec vos identifiants Marmibon:</p>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Votre email" required/>
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Votre mot de passe" minLength="6" required/>
                <input type="submit" value="Se connecter" />
            </form>
            <p className="create-account-text">Ou créer votre compte:</p>
            <Link to="/register" className="switch-auth-component">Clickez ici pour créer un compte</Link>
        </div>
    )
}

export default Login
