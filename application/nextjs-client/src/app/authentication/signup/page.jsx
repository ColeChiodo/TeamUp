/*********************************************************************
Page: Sign Up Page
Contributors: Martin Pham
Description: Sign up page. Users will enter their information here that is 
             validated and will make the call to register their account. A call to 
             the login route is called immediately after upon success of registering 
Components:
    - Icons: contains many icons for fields that users need to create an account 
    - DatePicker: uses react's datepicker for user to select their birthday 
********************************************************************/

'use client'

import '@/styles/Signup.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SimpleNavbar from '@/components/SimpleNavbar';
import Link from 'next/link';
import { LeftArrow, UserIcon, ProfileIcon, EmailIcon, PasswordIcon, PhoneIcon, CalendarIcon } from '@/components/Icons'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SignupPage = () => {
    const domain = process.env.NEXT_PUBLIC_API_URL;
    const version = process.env.NEXT_PUBLIC_API_VERSION;
    const url = `${domain}${version}`;

    const router = useRouter();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [dob, setDob] = useState(new Date());
    const [gender, setGender] = useState('Gender');
    const [phone_number, setPhone_Number] = useState('');

    const [usernameValid, setUsernameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true); // correct format
    const [emailValid2, setEmailValid2] = useState(true); // it isn't taken
    const [passwordValid1, setPasswordValid1] = useState(true);
    const [passwordValid2, setPasswordValid2] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);
    const [genderValid, setGenderValid] = useState(true);
    const [confirmPwValid, setConfirmPwValid] = useState(true);
    const [tosValid, setTosValid] = useState(true);

    const validateEmail = (input) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
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
        if(input !== "Gender") {
            setGenderValid(true);
        } else {
            setGenderValid(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // check if all inputs are valid
        validateEmail();
        validatePassword1();
        validatePassword2();
        validateConfirmPw();
        validatePhoneNumber();
        validateTos();
        validateGender();

        if(!emailValid || !passwordValid1 || !passwordValid2 || !confirmPwValid || !phoneValid || !tosValid || !genderValid) {
            return;
        }

        const userCredentials = {
            name,
            username,
            email,
            password, 
            dob, 
            gender,
            phone_number
        }

        const loginCredentials = {
            email: email, 
            password: password
        }
        const loginOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginCredentials)
        };

        fetch(`${url}/auth/register`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(userCredentials)
        }).then((res) => {
            console.log("register response: ", res);
            if(res.status === 400) {
                console.log("Email taken, response: ", res);
                restoreInputs();
                setEmailValid2(false);
                throw new Error('Registration failed: Email already taken');
            }
            if(res.status === 401) {
                console.log("username taken, response: ", res);
                restoreInputs();
                setUsernameValid(false);
                throw new Error('Registration failed: Username already taken');
            }
        }).then(() => {
            fetch(`${url}/auth/login`, loginOptions)
            .then((res) => {
                if(!res.ok) {
                    throw new Error('Login failed');
                }
                
                return res.json();
            }).then((data) => {
                document.cookie = `userData=${JSON.stringify(data.user)}; path=/`;
                document.cookie = `accessToken=${data.tokens.access.token}; path=/`;
                document.cookie = `refreshToken=${data.tokens.refresh.token}; path=/`;
                router.push('/preferences');
            })
        }).catch((err) => {
            console.error('Error while trying to register user: ', err);
        })
    }

    return (
        <>
        <header>
            <title>Sign Up</title>
        </header>
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
                <form onSubmit={handleSubmit}>
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
                    {!usernameValid && <div style={{textAlign: 'right'}}className="label-text validation-err">That username is already taken</div>}
                    <label className="input input-bordered input-primary w-full flex items-center gap-2">
                        <EmailIcon />
                        <input type="text" className="grow" placeholder="Email" value={email}
                        onChange={(e) => {
                            validateEmail(e.target.value);
                            setEmail(e.target.value);
                        }} />
                    </label>
                    {!emailValid && <div className="label-text validation-err">Please enter a valid email address in the format <span style={{fontWeight: 'bold'}}>example@mail.com</span></div>}
                    {!emailValid2 && <div className="label-text validation-err">This email is taken. Please try another one.</div>}
                    <label className="input input-bordered input-primary w-full flex items-center gap-2">
                        <PasswordIcon />
                        <input type="password" className="grow" placeholder="Password" value={password}
                        onChange={(e) => {
                            validatePassword1(e.target.value);
                            validatePassword2(e.target.value);
                            validateConfirmPw(confirmPw);
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
                        <input type="text" className="grow" placeholder="Phone Number: (123) 456-7890" value={phone_number}
                        onChange={(e) => {
                            let formattedNumber = e.target.value;
                            // formattedNumber 
                            const cleaned = formattedNumber.replace(/\D/g, '');

                            if (cleaned.length <= 3) {
                                formattedNumber = `(${cleaned}`;
                            } else if (cleaned.length <= 6) {
                                formattedNumber = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
                            } else {
                                formattedNumber = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
                            }
                    
                            // Update the state with the formatted number
                            setPhone_Number(formattedNumber);
                            validatePhoneNumber(formattedNumber);
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