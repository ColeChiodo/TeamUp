'use client'

/*********************************************************************
Page: Landing Page
Contributors: Martin Pham, Jaycee Lorenzo
Description: Landing page for TeamUp. Users can navigate to the about page, login, or start exploring.
Components:
********************************************************************/
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
            <header>
                <title>TeamUp</title>
                <link rel="icon" href="/images/TeamUp.ico" type="image/x-icon"/>
            </header>
            <div className="title-body">
                <div className="title-body-content">
                    <img id="logo" alt="Logo" src="/images/Logo.png"></img>
                    <div className="font-light text-4xl p-3 pb-2"><span className="font-extrabold">DISCOVER</span>, <span className="font-extrabold">JOIN</span>, 
                        and <span className="font-extrabold">HOST</span> games for your favorite sports.</div>
                    <div className="font-light text-4xl p-3 pt-0 pb-4 w-full">Find your next team.</div>
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
