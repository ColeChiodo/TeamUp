'use client'

import '@/styles/Signup.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StoreTokens from '@/utils/TokenStorage';
import SimpleNavbar from '@/components/SimpleNavbar';
import Link from 'next/link';
import { LeftArrow, UserIcon, ProfileIcon, EmailIcon, PasswordIcon, PhoneIcon, CalendarIcon } from '@/components/Icons'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SignupPage = () => {
    const router = useRouter();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [dob, setDob] = useState(new Date());
    const [gender, setGender] = useState('Gender');
    const [phone_number, setPhone_Number] = useState('');

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid1, setPasswordValid1] = useState(true);
    const [passwordValid2, setPasswordValid2] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);
    const [genderValid, setGenderValid] = useState(true);
    const [confirmPwValid, setConfirmPwValid] = useState(true);
    const [tosValid, setTosValid] = useState(true);

    const validateEmail = (input) => {
        const isValid = /^[^\s@]+@[^\s@]+\.(com)$/.test(input);
        setEmailValid(isValid);
    };

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

    const validatePhoneNumber = (input) => {
        const isValid = /^\(\d{3}\)\s\d{3}-\d{4}$/.test(input);
        setPhoneValid(isValid);
    };

    const validateTos = (checked) => {
        setTosValid(checked);
    };

    const validateGender = (input) => {
        setGender(input);
    }

    const register = (e) => {
        e.preventDefault();

        const user = {name, username, email, password, dob, gender, phone_number};
        const login = {
            email: email,
            password: password
        };

        if (password !== confirm){
            document.getElementById('error').hidden = false;
            error.innerHTML = 'Passwords do not match.';
        } else{
            fetch('http://localhost:3000/v1/auth/register', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify(user)
            }).then((response) => {
                if(response.status === 400){
                    document.getElementById('error').hidden = false;
                    response.json().then((err) => {error.innerHTML = err.message;});
                } else{
                    fetch('http://localhost:3000/v1/auth/login', {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body:JSON.stringify(login)
                    }).then((response) => {
                        if(response.status === 401){
                            router.push('/authentication');
                        } else if (response.ok){
                            return response.json();
                        }
                    }).then((responsel) => {
                        handleLogin();
                        if (responsel && responsel.user && responsel.user.name) {
                            setUserInfo({
                                name: responsel.user.name
                            });
                        }
                        StoreTokens(responsel);
                        router.push('/home');
                    })
                }
            }).catch((error) => {
                error.innerHTML = JSON.stringify(error.response.message);
                console.log(JSON.stringify(error.response.message));
            });
        }
    }

    return (
        <>
        <SimpleNavbar />
        <div className="signup-container">
            <div className="back-header">
                <Link href="/authentication">
                    <div className="back-icon-container">
                        <LeftArrow />
                    </div>
                </Link>
            </div>
            <div className="signup-body">
                <div id="signup-title">Sign Up</div>
                <form onSubmit={register}>
                    <div className="same-line">
                        <label className="input input-bordered input-primary w-full flex items-center gap-2">
                            <UserIcon />
                            <input type="text" className="grow" placeholder="Full Name" value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }} />
                        </label>
                        <label className="input input-bordered input-primary w-full flex items-center gap-2">
                            <ProfileIcon />
                            <input type="text" className="grow" placeholder="Username" value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                        </label>
                    </div>
                    <label className="input input-bordered input-primary w-full flex items-center gap-2">
                        <EmailIcon />
                        <input type="text" className="grow" placeholder="Email" value={email}
                        onChange={(e) => {
                            validateEmail(e.target.value);
                            setEmail(e.target.value);
                        }} />
                    </label>
                    {!emailValid && <div className="label-text validation-err">Please enter a valid email address in the format <span style={{fontWeight: 'bold'}}>example@mail.com</span></div>}
                    <label className="input input-bordered input-primary w-full flex items-center gap-2">
                        <PasswordIcon />
                        <input type="password" className="grow" placeholder="Password" value={password}
                        onChange={(e) => {
                            validatePassword1(e.target.value);
                            validatePassword2(e.target.value);
                            setPassword(e.target.value);
                        }} />
                    </label>
                    {!passwordValid1 && <div className="label-text validation-err">Password must be at least 8 characters long</div>}
                    {!passwordValid2 && <div className="label-text validation-err">Password must contain at least one letter and one number</div>}
                    <label className="input input-bordered input-primary w-full flex items-center gap-2">
                        <PasswordIcon />
                        <input type="password" className="grow" placeholder="Confirm Password" value={confirmPw}
                        onChange={(e) => {
                            validateConfirmPw(e.target.value);
                            setConfirmPw(e.target.value);
                        }} />
                    </label>
                    {!confirmPwValid && <div className="label-text validation-err">Passwords must match</div>}
                    <label className="input input-bordered input-primary w-full flex items-center gap-2">
                        <PhoneIcon />
                        <input type="text" className="grow" placeholder="Phone Number" value={phone_number}
                        onChange={(e) => {
                            validatePhoneNumber(e.target.value);
                            setPhone_Number(e.target.value);
                        }} />
                    </label>
                    {!phoneValid && <div className="label-text validation-err">Phone number must be in the format <span style={{fontWeight: 'bold'}}>(123) 456-7890</span></div>}
                    <div className="mb-2"/>
                    <div className="same-line">
                        <div>
                            <label htmlFor="dob">Date of Birth:</label>
                            <label id="dob" className="input input-bordered input-primary w-full flex items-center gap-2">
                                <CalendarIcon />
                                <DatePicker selected={dob} onChange={(value) => setDob(value)}/>
                            </label>
                        </div>
                        <div className="w-full">
                            <label htmlFor="gender">Select Gender:</label>
                            <select id="gender" className="input select select-primary w-full" value={gender} 
                            onChange={(e) => {
                                validateGender();
                                setGender(e.target.value);
                            }} >
                                <option disabled>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Prefer not to say</option>
                            </select>
                        </div>
                    </div>
                    <label className="flex items-center mt-2 mb-2">
                        <input type="checkbox" className="checkbox checkbox-primary mr-2" 
                        onChange={(e) => {
                            validateTos(e.target.checked);
                        }}/>
                        <span className="label-text">By checking this box, you agree to our Terms of Service and Privacy Policy.</span>
                    </label>
                    {!tosValid && <div className="label-text validation-err">Please agree to our Terms of Service and Privacy Policy to create an account</div>}
                    <button type="submit" style={{color: 'white'}}className="btn btn-active w-full btn-primary mb-2">Create Account</button>
                    <div>
                        <a href="/authentication" style={{ color: "blue", textDecoration: "underline" }}>Have an account? Login here.</a>
                    </div>
                </form>
            </div>    
        </div>
        </>
    )
}

export default SignupPage