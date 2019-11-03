import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { email, password } = user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        console.log('login');
        console.log(user);
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
