import React, { Fragment, useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';
import LanguageContext from '../../context/language/languageContext';
import { Link } from 'react-router-dom';
import spinner from '../layout/spinner.gif'

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const recipeContext = useContext(RecipeContext);
    const languageContext = useContext(LanguageContext);

    const { logUser, error, clearErrors, isAuthenticated, loadUser, authLoading } = authContext;
    const { recipeInfo, redirect} = recipeContext;
    const { languageDisplayed, language, switchLanguage } = languageContext;

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
                <p>{ language[languageDisplayed].login.header }</p>
                <input type="email" name="email" value={email} onChange={onChange} placeholder={ language[languageDisplayed].login.email } required/>
                <input type="password" name="password" value={password} onChange={onChange} placeholder={ language[languageDisplayed].login.password } minLength="6" required/>
                {authLoading ? (
                    <img src={spinner} style={{width: '75px', margin: 'auto', display: 'block'}} alt="spinner loading"/>
                ) : (
                    <input type="submit" value={ language[languageDisplayed].login.login } />
                )}
                {error && error.map( (e,i) => (<p className="error-msg" key={'error-' + i}>{e}</p>))}
            </form>
            {!authLoading && (
                <Fragment>
                <p className="create-account-text">{ language[languageDisplayed].login.switchTxt }</p>
                <Link to="/register" className="switch-auth-component">{ language[languageDisplayed].login.switchBtnTxt }</Link>
                </Fragment>
            )}

        </div>
    )
}

export default Login
