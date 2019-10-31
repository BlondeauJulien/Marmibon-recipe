import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="auth-form-container">
            <form className="auth-form">
                <p>Connectez-vous avec vos identifiants Marmibon:</p>
                <input type="email" name="email" placeholder="Votre email" required/>
                <input type="password" name="password" placeholder="Votre mot de passe" minLength="6" required/>
                <input type="submit" value="Se connecter" />
            </form>
            <p className="create-account-text">Ou créer votre compte:</p>
            <Link to="/register" className="switch-auth-component">Clickez ici pour créer un compte</Link>
        </div>
    )
}

export default Login
