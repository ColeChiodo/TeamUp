import React from "react";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import {PasswordIcon} from "../components/Icons";

export default function VerifyEmail() {
    document.title = 'Reset Password - TeamUp';
    const domain = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;
    const navigate = useNavigate();

    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');  

    const makeVerified = () => {
        fetch(`${url}/auth/verify-email?token=${token}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"}
        }).then((res) => {
            if(!res.ok) {
                alert("Your email could not be verified. Please try again.");
                navigate('/home');
            } 
        }).catch((err) => {
            console.error('Error while trying to Verify Email', err);
        })
    }


    return (
    <>
    <div className="flex justify-center content-center align-center" onLoad={makeVerified}>
        <div className="card md:bordered w-96 mt-10">
            <div className="card-body">
            <img className="h-10 grayscale-0 object-scale-down" src="/images/Logo.png"/>
                <h2 className="card-title">Your Email has successfully been Verified!</h2>
                <button onClick={() => navigate('/home')} className="btn-primary w-full">Return Home</button>
            </div>
        </div>
    </div>
    </>
    );
}
