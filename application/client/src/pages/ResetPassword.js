import React from "react";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import {PasswordIcon} from "../components/Icons";

export default function ResetPassword() {
    const domain = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');

    const [passwordValid1, setPasswordValid1] = useState(true);
    const [passwordValid2, setPasswordValid2] = useState(true);
    const [confirmPwValid, setConfirmPwValid] = useState(true);

    const validatePassword1 = (input) => {
        const isValid = /.{8,}/.test(input);
        setPasswordValid1(isValid);
    };
    
    const validatePassword2 = (input) => {
        const isValid = /(?=.*[A-Za-z])(?=.*\d)/.test(input);
        setPasswordValid2(isValid);
    };

    const validateConfirmPw = (input) => {
        setConfirmPwValid(input === password);
    };

    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');  

    function resetPassword(e) {
        e.preventDefault();

        if(!passwordValid1 || !passwordValid2 || !confirmPwValid) {
            return;
        }

        const json = {
            password:password
        };

        fetch(`${url}/auth/reset-password?token=${token}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(json)
        }).then((res) => {
            if(res.status === 204) {
                alert("Your password has been reset!\nRedirecting to login page..");
                navigate('/login');
            } 
            else {
                alert("Error resetting password.\nPlease try again.");
                setPassword('');
                setConfirmPw('');
            }
        }).catch((err) => {
            console.error('Error while trying to Reset Password', err);
        })
    }

    return (
    <>
    <header>
            <title>Reset Password</title>
    </header>
    <div className="flex justify-center content-center align-center">
        <div className="card md:bordered w-96 mt-10">
            <div className="card-body">
            <img className="h-10 grayscale-0 object-scale-down" src="/images/Logo.png"/>
                <h2 className="card-title">Reset Password</h2>
                <p className="text-sm text-neutral-content">Enter A New Password.</p>
                <form onSubmit={resetPassword}>
                    <label className={`input input-bordered input-primary w-full flex items-center gap-2 ${(!passwordValid1 || !passwordValid2 || !confirmPwValid) && 'border-red-600'}`}>
                        <PasswordIcon />
                        <input type="password" className="grow" placeholder="Password" value={password}
                        onChange={(e) => {
                            validatePassword1(e.target.value);
                            validatePassword2(e.target.value);
                            validateConfirmPw(confirmPw);
                            setPassword(e.target.value);
                        }} />
                    </label>
                    {!passwordValid1 && <div className="label-text text-red-600 mt-2">Password must be at least 8 characters long</div>}
                    {!passwordValid2 && <div className="label-text text-red-600 mt-2">Password must contain at least one letter and one number</div>}
                    <label className={`input input-bordered input-primary w-full flex items-center gap-2 ${(!confirmPwValid) && 'border-red-600 my-2'}`}>
                        <PasswordIcon />
                        <input type="password" className="grow" placeholder="Confirm Password" value={confirmPw}
                        onChange={(e) => {
                            validateConfirmPw(e.target.value);
                            setConfirmPw(e.target.value);
                        }} />
                    </label>
                    {!confirmPwValid && <div className="label-text text-red-600 mt-2">Passwords must match</div>}
                    <input type="submit" value="Update Password" className="btn btn-primary w-full text-white"/>
                </form>
            </div>
        </div>
    </div>
    </>
    );
}
