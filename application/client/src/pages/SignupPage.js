import '../Stylesheets/SignupPage.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('Male');
    const [phone_number, setPhone_Number] = useState('');

    const register = (e) => {
        e.preventDefault();

        if (password !== confirm){
            //error handle
        }

        const user = {name, username, email, password, dob, gender, phone_number};
        const login = {email, password};

        fetch('http://localhost:3000/v1/auth/register', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(user)
        }).then((response) => {
            console.log(response);
            if(response.status === 400){
                //display error message
            } else{
                fetch('http://localhost:3000/v1/auth/login', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body:JSON.stringify(login)
                }).then((responsel) => {
                    console.log(responsel);
                    if(response.status === 401){
                        //display error
                    } else{
                        navigate('/home');
                    }
                });
            }
        });
    }

    return (
        <>
        <div className="container">
        <div className="signup-page">
            <div className='bg'>
                <h1 className="signup-title">Sign Up</h1>
            </div>
            <form onSubmit={register}>
                <div className="name">
                    <input type="text" placeholder="Full Name" name="first-name" className='inputBox' value={name}
                    onChange={(e) => setName(e.target.value)} required></input>
                    <input type="text" placeholder="Username" name="last-name" className='inputBox' value={username}
                    onChange={(e) => setUsername(e.target.value)} required></input>
                </div>
                <input className="email inputBox" type="email" placeholder="Email" name="emailInput" value={email}
                onChange={(e) => setEmail(e.target.value)} required></input>
                <input type="password" placeholder="Password" name="password" className='inputBox' value={password}
                onChange={(e) => setPassword(e.target.value)} required></input>
                <br/>
                <input type="password" placeholder="Confirm Password" name="confirm-password" className='inputBox' value={confirm}
                onChange={(e) => setConfirm(e.target.value)} required></input>
                <div className='name'>
                    <div>Date of Birth:</div>
                    <input type="date" name="dob" className='inputBox' value={dob}
                    onChange={(e) => setDob(e.target.value)} required></input>
                </div>
                <div className='name'>
                    <div>Gender:</div>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Prefer Not To Say</option>
                    </select>
                    <input type='text' placeholder='Phone Number' className='inputBox' value={phone_number}
                    onChange={(e) => setPhone_Number(e.target.value)} required></input>
                </div>
                <br/>
                <div className="error-message"></div>
                <button type="submit" className='submit-button'>Create Account</button>
                <a href="/authentication" className="login-link">Have an account? Login here.</a>
            </form>
        </div>
        </div>
        </>
    )
}

export default SignupPage