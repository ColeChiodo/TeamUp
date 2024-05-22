/*********************************************************************
Component: VerifyEmail
Contributors: Cole Chiodo
Description: Modal Popup that reminds the user to verify their email
             if they have not already done so.
********************************************************************/
import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function SportFilter() {
    const domain=process.env.REACT_APP_API_URL;
    const version=process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;

    const navigate = useNavigate();

    const [emailVerified, setEmailVerified] = useState(false);

    const checkVerified = () => {
        if(!Cookies.get('userData')) {
            navigate('/login');
        }

        const userData = JSON.parse(Cookies.get('userData'));

        fetch(`${url}/users/${userData.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('accessToken'),
            }
        }).then((res) => {
            if(!res.ok) {
                throw new Error('Could not get user data');
            }
            
            return res.json();
        }).then((data) => {
            setEmailVerified(data.isEmailVerified);
        }).catch((err) => {
            console.error('Error while trying to get user: ', err);
        });
    }

    const sendEmail = () => {
        if(!Cookies.get('userData')) {
            navigate('/login');
        }

        const userData = JSON.parse(Cookies.get('userData'));

        fetch(`${url}/auth/send-verification-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('accessToken'),
            }
        }).then((res) => {
            if(!res.ok) {
                throw new Error('Could not send verification email');
            }
            
            return res.json();
        }).then((data) => {
            alert('Verification email sent');
            handleClose();
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
    <>
    <div onLoad={checkVerified()}></div>
    {isOpen && !emailVerified && (
    <div className="fixed bottom-0 left-0 right-0 md:left-4 md:right-auto md:bottom-4 bg-white border border-gray-300 rounded-md p-4 shadow-md z-50">
        <button className="absolute top-2 right-2" onClick={handleClose}>x</button>
        <div className="flex flex-col items-center">
            <p className="flex-grow mr-2">Your email has not yet been verified.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={sendEmail}>Resend Verification Email</button>
        </div>
    </div>
    )}
    </>
    );
}

export default SportFilter;
