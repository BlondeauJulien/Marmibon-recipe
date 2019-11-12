import React, { useState , useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';

const Register = ( props) => {
    const authContext = useContext(AuthContext);

    const { register, error, clearErrors, isAuthenticated, loadUser } = authContext;

    useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/')
        }
        // eslint-disable-next-line

    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const {userName, email, password, passwordConfirm } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if(userName === "" || email === "" || password === "") {
            console.log("Empty input")
        } else if (password !== passwordConfirm) {
            console.log("password doesn't match")
        } else {
            register({
                userName,
                email,
                password
            });
        }
    }


    return (
        <div className="auth-form-container">
            <form onSubmit={onSubmit} className="auth-form">
                <p>Créer votre compte Marmibon:</p>
                <input type="text" name="userName" value={userName} onChange={onChange} placeholder="Votre pseudo" required/>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Votre email" required/>
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Votre mot de passe" minLength="6" required/>
                <input type="password" name="passwordConfirm" value={passwordConfirm} onChange={onChange} placeholder="Confirmer votre mot de passe" minLength="6" required/>
                <input type="submit" value="Créer un compte" />
            </form>
            <p className="create-account-text">Déjà inscrit?</p>
            <Link to="/login" className="switch-auth-component">Clickez ici pour vous connecter</Link>
        </div>
    )
}

export default Register
