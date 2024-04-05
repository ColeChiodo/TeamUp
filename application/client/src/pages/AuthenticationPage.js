import '../Stylesheets/AuthenticationPage.css';
import NavigationBarSimple from '../components/NavigationBarSimple';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import StoreTokens from '../components/TokenStorage';

const AuthenticationPage = ({onLogin, setUserInfo}) => {
    const domain = process.env.REACT_APP_DOMAIN;
    const loginEndpoint = '/v1/auth/login';

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const error = document.querySelector('.error-message');

    // frontend login routine
    function login(){
        const user = {
            email: email,
            password: password
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        };
        fetch(`${domain}${loginEndpoint}`, options)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                    
                }
            })
            .then((response) => { // store refresh token in cookies
                setUserInfo({
                    name: response.user.name
                });
                StoreTokens(response);
            })
            .then(() => {
                onLogin();
                navigate('/home');
            })
            .catch((response) => {
                if (response.status === 401){ // unauthorized
                    document.getElementById('error').hidden = false;
                    response.json().then((err) => {
                        error.innerHTML = err.message;
                    })
                } else if (response.status === 400) { // bad request
                    document.getElementById('error').hidden = false;
                    response.json().then(() => {
                        error.innerHTML = "All fields are required.";
                    })
                } else {
                    alert('Something went wrong with processing your request. Please try again later.');
                }
            });
    }

    return (
        <>
        {NavigationBarSimple()}
        <div className='bg'></div>
        <div className="container">
        <div className="back-header">
            <Link to="/">
                <div className="back-icon-container">
                    <FontAwesomeIcon icon={faChevronLeft} className='back-icon' size="2xl"/>
                </div>
            </Link>
            <p className="title">Back to home</p>
        </div>
        <div className="authentication-page">
            <div className="login-left">
                <div className="login-left-content">
                    <h1>Login</h1>
                    <hr/>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            name="email" 
                            required className='inputBox'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br/>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            required className='inputBox'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br/>
                        <a href="." className="forgot-password">Forgot Password?</a>
                        <br/>
                        <div className="error-message" id='error' hidden='true'>

                        </div>
                        <button type='submit' className='login' onClick={login}>Login</button>
                    </form>
                </div>
            </div>
            <div className="signup-right">
                <div className="signup-right-content">
                    <form action='/signup'>
                        <button type="submit" className='signup'>Sign Up</button>
                    </form>
                    <h2>Why?</h2>
                    <p>
                        - Find Games in Your Area
                        <br/>
                        - Join Tournaments
                        <br/>
                        - Connect with others
                    </p>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default AuthenticationPage