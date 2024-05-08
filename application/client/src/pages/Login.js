/*********************************************************************
Page: Authentication Page
Contributors: Martin Pham
Description: This is where a user can login. If they do not have an account
             they can click the link to lead them to the sign up page. 
             Also displays information about TeamUp
Components:
    - Icons: uses icon for fields user needs to login (email, password)
********************************************************************/

import '../styles/Authentication.css'; 
import { LeftArrow, EmailIcon, PasswordIcon } from '../components/Icons';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Authentication = () => {
    const domain=process.env.REACT_APP_API_URL;
    const version=process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginValid, setLoginValid] = useState(true);

    const login = () => {
        const loginCredentials = {
            email: email,
            password: password
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginCredentials)
        };
        fetch(`${url}/auth/login`, options)
        .then((res) => {
            if(!res.ok) {
                if(res.status === 401) {
                    setLoginValid(false);
                }
                throw new Error('Login failed');
            }
            
            return res.json();
        }).then((data) => {
            document.cookie = `userData=${JSON.stringify(data.user)}; path=/`;
            document.cookie = `accessToken=${data.tokens.access.token}; path=/`;
            document.cookie = `refreshToken=${data.tokens.refresh.token}; path=/`;
            navigate('/home');
        }).catch((err) => {
            console.error('Error while trying to login user: ', err);
        });
    }

    return (
        <>
        <header>
            <title>Authentication</title>
            <link rel="icon" href="/images/TeamUp.ico" type="image/x-icon"/>
        </header>
        <div className="auth-page">
            <div className="auth-body">
                <div className="auth-body-content">
                    <div className="auth-body-title">Join TeamUp</div>
                    <div className="auth-body-paragraph">
                        <ul>
                            <li>Find recreational games in your area!</li>
                            <li>Join large sports community!</li>
                            <li>Set up your own games just how you like it!</li>
                            <li>Find your teammates!</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="auth-login">
                <div className="auth-back-header">
                    <Link to="/">
                        <div className="auth-back-icon-container">
                            <LeftArrow />
                        </div>
                    </Link>
                </div>
                <div className="auth-login-content">
                    <div id="auth-login-title">Login</div>
                    <form className="auth-login-form" 
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <label className="input input-bordered input-primary w-full flex items-center gap-2">
                            <EmailIcon />
                            <input type="text" className="grow" placeholder="Email" value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }} />
                        </label>
                        <label className="input input-bordered input-primary w-full flex items-center gap-2">
                            <PasswordIcon />
                            <input type="password" className="grow" placeholder="Password" value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }} />   
                        </label> 
                        {!loginValid && <div className="label-text validation-err">Incorrect email or password</div>}
                        <div className="mt-4"><a href="/forgot-password" style={{ color: "blue", textDecoration: "underline" }}>Forgot Password?</a></div>
                        <button onClick={login} type="submit" style={{color: 'white'}} className="btn btn-active w-full btn-primary mb-2">Login</button>
                        <div>Don't have an account?</div>
                        <div><a href="/signup" style={{ color: "blue", textDecoration: "underline" }}>Sign up here!</a></div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Authentication