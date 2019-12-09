import React, { Fragment, useState , useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';
import { Link } from 'react-router-dom';
import spinner from '../layout/spinner.gif';

const Register = ( props) => {
    const authContext = useContext(AuthContext);
    const recipeContext = useContext(RecipeContext);

    const { register, error, setAuthError, clearErrors, isAuthenticated, loadUser, authLoading } = authContext;
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

    }, [error, isAuthenticated, props.history]);

    useEffect(() => {
        if(redirect.recipeCont) {
            props.history.push(`recipe/${recipeInfo._id}`)
        }
    }, [redirect])

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

        if(password !== passwordConfirm) {
            setAuthError(["Les mots de passe entrés ne correspondent pas"])
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
                <input type="text" name="userName" value={userName} onChange={onChange} placeholder="Votre pseudo" minLength="4" maxLength="16" required/>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Votre email" required/>
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Votre mot de passe" minLength="6" required/>
                <input type="password" name="passwordConfirm" value={passwordConfirm} onChange={onChange} placeholder="Confirmer votre mot de passe" minLength="6" required/>
                {authLoading ? (
                    <img src={spinner} style={{width: '75px', margin: 'auto', display: 'block'}}/>
                ) : (
                    <input type="submit" value="Créer un compte" />
                )}
                {error && error.map( (e,i) => (<p className="error-msg" key={'error-' + i}>{e}</p>))}
            </form>

            {!authLoading && (
                <Fragment>
                    <p className="create-account-text">Déjà inscrit?</p>
                    <Link to="/login" className="switch-auth-component">Clickez ici pour vous connecter</Link>
                </Fragment>
            )}

        </div>
    )
}

export default Register
