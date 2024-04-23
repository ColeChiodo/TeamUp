'use client'

import Link from 'next/link';
import '@/styles/TitlePage.css'
import getLoggedIn from '@/hooks/GetLoggedIn';
import useLogout from '@/hooks/Logout';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function TitlePage() {
    const [loggedIn, setLoggedIn] = useState(false);

    // function to handle logout
    const callLogout = useLogout();
    const logout = () => {
        callLogout();
        // Update loggedIn state to false after logout
        setLoggedIn(false);
    }
    
    // Check if the user is logged in on component mount
    useEffect(() => {
        const userData = Cookies.get('userData');
        setLoggedIn(!!userData); // Convert userData to a boolean
    }, []);

    return (
        <div className="title-page">
            <div className="title-body">
                <div className="title-body-content">
                    <img id="logo" alt="Logo" src="/images/Logo.png"></img>
                    <div className="slogan">Unite your game</div>
                    <div className="slogan">Find your team</div>
                    <Link href="/about" className="about-link">About Us </Link>
                </div>
            </div>
            <div className="title-login">
                <div className="title-login-content">
                    {!loggedIn ? (
                        <>
                        <Link href="/home" className="link">Start Exploring</Link>
                        <Link href="/authentication" className="link">Login/Signup</Link>
                        </>
                    ) : (
                        <>
                        <Link href="/home" className="link">Home</Link>
                        <button className="link" onClick={logout}>Logout</button>
                        </>
                    )}
                    
                </div>
            </div>
        </div>
    );
}
