'use client'

import Link from 'next/link';
import '@/styles/TitlePage.css'
import getLoggedIn from '@/hooks/GetLoggedIn';
import useLogout from '@/hooks/Logout';

export default function TitlePage() {
    const loggedIn = getLoggedIn();

    const callLogout = useLogout();
    const logout = () => {
        callLogout();
    }
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
