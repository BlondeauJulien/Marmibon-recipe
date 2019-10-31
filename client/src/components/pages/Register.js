import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="auth-form-container">
            <form className="auth-form">
                <p>Créer votre compte Marmibon:</p>
                <input type="text" name="userName" placeholder="Votre pseudo" required/>
                <input type="email" name="email" placeholder="Votre email" required/>
                <input type="password" name="password" placeholder="Votre mot de passe" minLength="6" required/>
                <input type="password" name="passwordConfirm" placeholder="Confirmer votre mot de passe" minLength="6" required/>
                <input type="submit" value="Créer un compte" />
            </form>
            <p className="create-account-text">Déjà inscrit?</p>
            <Link to="/login" className="switch-auth-component">Clickez ici pour vous connecter</Link>
        </div>
    )
}

export default Register
