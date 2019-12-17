import React, { Fragment, useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';
import { Link } from 'react-router-dom';
import spinner from '../layout/spinner.gif'

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const recipeContext = useContext(RecipeContext);

    const { logUser, error, clearErrors, isAuthenticated, loadUser, authLoading } = authContext;
    const { recipeInfo, redirect} = recipeContext;

    useEffect(() => {
        if(localStorage.getItem('token') !== null) {
            loadUser()
        }
		// eslint-disable-next-line
	}, []);

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/')
        }
        if(error) {
            setTimeout(() => {
                clearErrors()
            }, 7000);
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    useEffect(() => {
        if(redirect.recipeCont) {
            props.history.push(`recipe/${recipeInfo._id}`)
        }
        // eslint-disable-next-line
    }, [redirect]);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { email, password } = user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        logUser({
            email,
            password
        })  
    }


    return (
        
        <div className="auth-form-container">
            <form onSubmit={onSubmit} className="auth-form">
                <p>Connectez-vous avec vos identifiants Marmibon:</p>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Votre email" required/>
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Votre mot de passe" minLength="6" required/>
                {authLoading ? (
                    <img src={spinner} style={{width: '75px', margin: 'auto', display: 'block'}} alt="spinner loading"/>
                ) : (
                    <input type="submit" value="Se connecter" />
                )}
                {error && error.map( (e,i) => (<p className="error-msg" key={'error-' + i}>{e}</p>))}
            </form>
            {!authLoading && (
                <Fragment>
                <p className="create-account-text">Ou créer votre compte:</p>
                <Link to="/register" className="switch-auth-component">Clickez ici pour créer un compte</Link>
                </Fragment>
            )}

        </div>
    )
}

export default Login
