import React, { Fragment, useState , useContext, useEffect} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';
import LanguageContext from '../../context/language/languageContext';
import { Link } from 'react-router-dom';
import spinner from '../layout/spinner.gif';

const Register = ( props) => {
    const authContext = useContext(AuthContext);
    const recipeContext = useContext(RecipeContext);
    const languageContext = useContext(LanguageContext);

    const { register, error, setAuthError, clearErrors, isAuthenticated, loadUser, authLoading } = authContext;
    const { recipeInfo, redirect} = recipeContext;
    const { languageDisplayed, language, switchLanguage } = languageContext;

    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const [captcha, setCaptcha] = useState(undefined);

    const {userName, email, password, passwordConfirm } = user;

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
    }, [redirect])

    useEffect(() => {
        if(userName !== "" && email !== "" && password !== "" && passwordConfirm !== "") {
           document.querySelector('.captcha-register').style.display = "block"
        }
        // eslint-disable-next-line
    }, [user])

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(password !== passwordConfirm) {
            setAuthError(["Les mots de passe entrés ne correspondent pas"])
        } else { 
            register({
                userName,
                email,
                password,
                captcha
            });
        }
    }


    return (
        <div className="auth-form-container">
            <form onSubmit={onSubmit} className="auth-form">
                <p>{ language[languageDisplayed].register.header }</p>
                <input type="text" name="userName" value={userName} onChange={onChange} placeholder={ language[languageDisplayed].register.username } minLength="4" maxLength="16" required/>
                <input type="email" name="email" value={email} onChange={onChange} placeholder={ language[languageDisplayed].register.email } required/>
                <input type="password" name="password" value={password} onChange={onChange} placeholder={ language[languageDisplayed].register.password } minLength="6" required/>
                <input type="password" name="passwordConfirm" value={passwordConfirm} onChange={onChange} placeholder={ language[languageDisplayed].register.passwordConfirm } minLength="6" required/>
                <div className="captcha-register" style={{textAlign: "center", marginBottom: "8px"}}>
                    <ReCAPTCHA
                    style={{display: "inline-block"}}
                        sitekey="6LeLJsgUAAAAABBZTKu_FRvmvSHDzywvbRj2j69T"
                        onChange={(value) => setCaptcha(value)}
                    />
                </div>
                {authLoading ? (
                    <img src={spinner} style={{width: '75px', margin: 'auto', display: 'block'}} alt="spinner"/>
                ) : (
                    <input type="submit" value={ language[languageDisplayed].register.register } />
                )}
                {error && error.map( (e,i) => (<p className="error-msg" key={'error-' + i}>{e}</p>))}
            </form>

            {!authLoading && (
                <Fragment>
                    <p className="create-account-text">{ language[languageDisplayed].register.switchTxt }</p>
                    <Link to="/login" className="switch-auth-component">{ language[languageDisplayed].register.switchBtnTxt }</Link>
                </Fragment>
            )}

        </div>
    )
}

export default Register
