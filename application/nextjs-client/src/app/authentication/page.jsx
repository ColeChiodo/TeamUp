'use client'

import '@/styles/Authentication.css'; 
import SimpleNavbar from '@/components/SimpleNavbar'
import { LeftArrow } from '@/components/Icons';
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import StoreTokens from '@/utils/TokenStorage';

const AuthenticationPage = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const router = useRouter();

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
        fetch('http://localhost:3000/v1/auth/login', options)
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
                handleLogin();
                router.push('/home');
            })
            .catch((response) => {
                if (response.status === 401){ // unauthorized
                    alert('Incorrect email or password');
                } else if (response.status === 400) { // bad request
                    alert('Please fill in all fields');
                } else {
                    alert('Something went wrong with processing your request. Please try again later.');
                }
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