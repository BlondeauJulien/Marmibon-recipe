import React, { useState, useContext } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import spinner from '../layout/spinner.gif';
import LanguageContext from '../../context/language/languageContext';

const Contact = () => {
    const languageContext = useContext(LanguageContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [mailSent, setMailSent] = useState(false)
    const [captcha, setCaptcha] = useState(undefined);
    const [emailContact, setEmailContact] = useState({
        senderName: '',
        senderEmail: '',
        senderMessage: ''
    })

    const { languageDisplayed, language, switchLanguage } = languageContext;

    const handleChangeMail = e => setEmailContact({...emailContact, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        setLoading(true);
        e.preventDefault();
        let formData = {
            ...emailContact,
            captcha
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            setLoading(true);
            const res = await axios.post('/api/contact', formData, config);

            if(res.data === "success") {
                setError(false);
                setMailSent(true);
                setEmailContact({
                    senderName: '',
                    senderEmail: '',
                    senderMessage: ''
                });
                document.querySelector('.form-contact').style.display = "none";
            } else {
                setError(true);
            }

            setLoading(false);

        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }

    return (
        <div className="contact-cont">
            <h1>Contact</h1>
            <div className="twitter-info-cont">
                <h2>Via Twitter:</h2>
                <a className="twitter-links-contact" href="https://twitter.com/BldJulien" target="_blank" rel="noopener noreferrer">
                    <i style={{color: "#00acee", fontSize: "24px"}} className="fab fa-twitter"></i>
                    <p>/JulienBld</p>
                </a>
            </div>
            <form className="form-contact" onSubmit={onSubmit}>
                <h2>Via email:</h2>
                <label htmlFor="senderName">{ language[languageDisplayed].contact.name }</label>
                <input
                    type="text"
                    name="senderName"
                    id="senderName"
                    value={emailContact.senderName}
                    onChange={handleChangeMail}
                    minLength="4"
                    maxLength="30"
                    required
                />
                <label htmlFor="senderEmail">{ language[languageDisplayed].contact.email }</label>
                <input 
                    type="email"
                    name="senderEmail"
                    id="senderEmail"
                    value={emailContact.senderEmail} 
                    onChange={handleChangeMail} 
                    required
                />
                <label htmlFor="senderMessage">Message:</label>
                <textarea
                    minLength="10"
                    maxLength="2000"
                    style={{minHeight: "125px"}}
                    name="senderMessage"
                    value={emailContact.senderMessage} 
                    onChange={handleChangeMail} 
                    required
                />
                <div  style={{textAlign: "center", marginBottom: "8px"}}>
                    <ReCAPTCHA
                    style={{display: "inline-block"}}
                        sitekey="6LeLJsgUAAAAABBZTKu_FRvmvSHDzywvbRj2j69T"
                        onChange={(value) => setCaptcha(value)}
                    />
                </div>
                {error && (
                    <div className="send-fail">
                        <p>{ language[languageDisplayed].contact.error }</p>
                    </div>
                )}
                {loading ? (
                    <img src={spinner} style={{width: '75px', margin: 'auto', display: 'block'}} alt="spinner loading"/>
                ) : (
                    <input type="submit" value={ language[languageDisplayed].contact.send } />
                )}

            </form>
            {mailSent && (
                <div className="send-success">
                    <p>{ language[languageDisplayed].contact.success }</p>
                </div>
            )}

        </div>
    )
}

export default Contact
