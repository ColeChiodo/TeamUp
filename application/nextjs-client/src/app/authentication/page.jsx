'use client'

import '@/styles/Authentication.css'; 
import SimpleNavbar from '@/components/SimpleNavbar'
import { LeftArrow, EmailIcon, PasswordIcon } from '@/components/Icons';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';

const AuthenticationPage = () => {
    const router = useRouter();

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
        fetch("http://localhost:3000/v1/auth/login", options)
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
            router.push('/home');
        }).catch((err) => {
            console.error('Error while trying to login user: ', err);
        });
    }

    return (
        <>
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
                    <Link href="/">
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
                        <div className="mt-4" style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>Forgot Password?</div>
                        <button onClick={login} type="submit" style={{color: 'white'}} className="btn btn-active w-full btn-primary mb-2">Login</button>
                        <div>Don't have an account?</div>
                        <div><a href="/authentication/signup" style={{ color: "blue", textDecoration: "underline" }}>Sign up here!</a></div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default AuthenticationPage