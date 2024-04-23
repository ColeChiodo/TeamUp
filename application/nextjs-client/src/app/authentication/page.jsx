'use client'

import '@/styles/Authentication.css'; 
import SimpleNavbar from '@/components/SimpleNavbar'
import { LeftArrow } from '@/components/Icons';
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
        <SimpleNavbar />
        <div className='bg'></div>
        <div className="authentication-container">
        <div className="back-header">
            <Link href="/">
                <div className="back-icon-container">
                    <LeftArrow />
                </div>
            </Link>
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
                        {!loginValid && <div className="label-text validation-err">Incorrect email or password</div>}
                        <a href="." className="forgot-password">Forgot Password?</a>
                        <br/>
                        <button type='submit' className="login text-lg btn btn-primary" onClick={login}>Login</button>
                    </form>
                </div>
            </div>
            <div className="signup-right">
                <div className="signup-right-content">
                    <form action='/authentication/signup'>
                        <button type='submit' className="signup text-lg btn btn-default">SignUp</button>
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