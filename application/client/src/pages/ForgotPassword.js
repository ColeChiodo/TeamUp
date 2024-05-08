import React from "react";
import {useNavigate} from 'react-router-dom';

export default function ForgotPassword() {
    const domain = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;
    const navigate = useNavigate();

    const [email, setEmail] = React.useState("");

    function sendEmail(e) {
        e.preventDefault();

        const json = {
            email: email
        }

        fetch(`${url}/auth/forgot-password`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(json)
        }).then((res) => {
            if(res.status === 204) {
                alert("Email sent!\nClose this window and check your email for the reset link.");
                navigate('/login');
            } 
            else {
                alert("Email not found.\nPlease enter a valid email address.");
            }
        }).catch((err) => {
            console.error('Error while trying to Send email', err);
        })
    }

    return (
    <>
    <header>
            <title>Forgot Password</title>
    </header>
    <div className="flex justify-center content-center align-center">
        <div className="card md:bordered w-96 mt-10">
            <div className="card-body">
            <img className="h-10 grayscale-0 object-scale-down" src="/images/Logo.png"/>
                <h2 className="card-title">Forgot Password?</h2>
                <p className="text-sm text-neutral-content">Enter your email and we will send you a link to reset your password.</p>
                <form onSubmit={sendEmail}>
                    <input type="email" placeholder="Enter your email" className="input input-bordered w-full" value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                    <input type="submit" value="Send Email" className="btn btn-primary mt-2 w-full text-white"/>
                </form>
            </div>
        </div>
    </div>
    </>
    );
}
