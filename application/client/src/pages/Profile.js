'use client';
/*********************************************************************
Page: My Games Page
Contributors: Cole Chiodo
Description: User's profile page that displays the user's information and preferences.
             The user can also edit their information and preferences.
Components:
    - ProfilePreferences: Container for the user's preferences
    - ProfilePreferenceCards: Display the user's preferences
    - NavigationBar: Navigation bar for the application
    - Footer: Footer for the application
********************************************************************/
import '../styles/globals.css';
import React, { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { UserIcon, EmailIcon, PasswordIcon, PhoneIcon, CalendarIcon, ProfileIcon } from '../components/Icons'; 
import { FootballIcon, SoccerIcon, BasketballIcon, TennisIcon, VolleyballIcon } from '../components/Icons';
import ProfilePreferences from '../components/profile/ProfilePreferences';
import ProfilePreferenceCards from '../components/profile/ProfilePreferenceCards';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import VerifyEmail from '../components/VerifyEmail';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Profile() {
    const domain=process.env.REACT_APP_API_URL;
    const version=process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;

    const navigate = useNavigate();

    const [userImg, setUserImg] = useState(null);
    const [imgUrl, setImgUrl] = useState('https://via.placeholder.com/320');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [dob, setDob] = useState(new Date());
    const [gender, setGender] = useState('');
    const [phone_number, setPhone_Number] = useState('');
    const [bio, setBio] = useState('');
    const [changesSaved, setChangesSaved] = useState(false);

    const [usernameValid, setUsernameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true); // correct format
    const [emailValid2, setEmailValid2] = useState(true); // it isn't taken
    const [passwordValid1, setPasswordValid1] = useState(true);
    const [passwordValid2, setPasswordValid2] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);
    const [genderValid, setGenderValid] = useState(true);
    const [confirmPwValid, setConfirmPwValid] = useState(true);

    const [nameChanged, setNameChanged] = useState(false);
    const [usernameChanged, setUsernameChanged] = useState(false);
    const [emailChanged, setEmailChanged] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [phoneChanged, setPhoneChanged] = useState(false);
    const [genderChanged, setGenderChanged] = useState(false);
    const [bioChanged, setBioChanged] = useState(false);
    const [dobChanged, setDobChanged] = useState(false);

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

    const validateGender = (input) => {
        if(input !== "Gender") {
            setGenderValid(true);
        } else {
            setGenderValid(false);
        }
    }
    
    const setImg = () => {
        const userData = JSON.parse(Cookies.get('userData'));

        const json = {
            image: imgUrl
        }

        if(userImg === null) {
            return;
        }

        fetch(`http://18.209.58.188:4000/imageUpload/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: json
        }).then((res) => {
            if(!res.ok) {
                throw new Error('Could not upload image');
            }
            
            return res.json();
        }).then((data) => {
            console.log("Successfully uploaded image to URL: ", data);
            fetch(`${url}/users/${userData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
                body: JSON.stringify({
                    image: data
                })
            }).then((res) => {
                if(!res.ok) {
                    throw new Error('Could not update user image');
                }
                
                return res.json();
            }).then((data) => {
                console.log("Successfully updated user image: ", data);
            }).catch((err) => {
                console.error('Error while trying to update user image: ', err);
            });
        }).catch((err) => {
            console.error('Error while trying to upload image: ', err);
        });
    }   

    const getUser = () => {
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
            console.log("Data from get user by id: ", data)
            setName(data.name);
            setUsername(data.username);
            setEmail(data.email);

            if(data.image) {
                setImgUrl(data.image);
            }

            // Get user bio and gender
            fetch(`${url}/users/userBio/${data.username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                }
            }).then((res) => {
                console.log("Response from get user bio by username: ", res)
                if(!res.ok) {
                    throw new Error('Could not get user bio');
                }
                
                return res.json();
            }
            ).then((data) => {
                console.log("Data from get user bio by username: ", data);

                setPhone_Number(data.phone_number);
                setDob(data.dob);

                if(data.gender === 'Male'){
                    setGender('♂');
                } else if(data.gender === "Female"){
                    setGender('♀');
                } else {
                    setGender('⚥');
                }

                setBio(data.bio);

            }).catch((err) => {
                console.error('Error while trying to get user bio: ', err);
            });

            setDob(data.dob);
            getPreferences();
            document.title = `@${data.username} - TeamUp`;
        }).catch((err) => {
            console.error('Error while trying to get user: ', err);
        });
    }

    const [myPreferences, setMyPreferences] = useState([]);

    const getPreferences = () => {
        const userData = JSON.parse(Cookies.get('userData'));

        fetch(`${url}/users/userPreferences/${userData.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('accessToken'),
            }
        }).then((res) => {
            if(!res.ok) {
                throw new Error('Could not get user preferences');
            }
            
            return res.json();
        }).then((data) => {
            if(!data.sportLevels || data.sportLevels.length === 0) {
                setMyPreferences([]);
                return;
            } else {
                    const transformedPreferences = data.sportLevels.map(preference => {
                    let icon;
                    switch(preference.sport.name) {
                        case 'Football':
                            icon = <FootballIcon />
                            break;
                        case 'Soccer':
                            icon = <SoccerIcon />
                            break;
                        case 'Basketball':
                            icon = <BasketballIcon />
                            break;
                        case 'Tennis':
                            icon = <TennisIcon />
                            break;
                        case 'Volleyball':
                            icon = <VolleyballIcon />
                            break;
                        default: 
                            icon = null;
                    }

                    return {
                    name: preference.sport.name,
                    skillLevel: preference.level,
                    icon: icon
                    };
                })
                setMyPreferences(transformedPreferences);
            }

            
        }).catch((err) => {
            console.error('Error while trying to get user preferences: ', err);
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!emailValid || !passwordValid1 || !passwordValid2 || !confirmPwValid || !phoneValid || !genderValid) {
            return;
        }

        // create user credentials object, only include changed fields
        const userCredentials = {};
        if(nameChanged) {
            Object.defineProperty(userCredentials, 'name', {value: name, writable: true, enumerable: true});
        }
        if(usernameChanged) {
            Object.defineProperty(userCredentials, 'username', {value: username, writable: true, enumerable: true});
        }
        if(emailChanged) {
            Object.defineProperty(userCredentials, 'email', {value: email, writable: true, enumerable: true});
        }
        if(passwordChanged) {
            Object.defineProperty(userCredentials, 'password', {value: password, writable: true, enumerable: true});
        }
        if(phoneChanged) {
            Object.defineProperty(userCredentials, 'phone_number', {value: phone_number, writable: true, enumerable: true});
        }
        if(genderChanged) {
            Object.defineProperty(userCredentials, 'gender', {value: gender, writable: true, enumerable: true});
        }
        if(dobChanged) {
            Object.defineProperty(userCredentials, 'dob', {value: dob, writable: true, enumerable: true});
        }

        const userData = JSON.parse(Cookies.get('userData'));

        fetch(`${url}/users/${userData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('accessToken'),
            },
            body: JSON.stringify(userCredentials)
        }).then((res) => {
            if(!res.ok) {
                throw new Error('Could not update user');
            }
            
            return res.json();
        }).then((data) => {
            console.log("Data from update user: ", data);
            setImg();
            setChangesSaved(true);
            alert('User updated successfully');
        }).catch((err) => {
            console.error('Error while trying to update user: ', err);
        });

        const userBio = {
            bio: bio,
        }

        fetch(`${url}/users/userBio/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('accessToken'),
            },
            body: JSON.stringify(userBio)
        }).then((res) => {
            if(!res.ok) {
                throw new Error('Could not update user bio');
            }
            
            return res.json();
        }).then((data) => {
            console.log("Bio updated successfully: ", data);
        }).catch((err) => {
            console.error('Error while trying to update user bio: ', err);
        });
    }

    return (
        <div className="bg-white w-full h-full overflow-hidden" onLoad={getUser}>
            <header>
                <title>Profile</title>
                <link rel="icon" href="/images/TeamUp.ico" type="image/x-icon"/>
            </header>
        <NavigationBar/>

        <div className="flex flex-col justify-center items-center md:my-10 divide-y md:divide-y-0">
            <div className="md:card p-5 md:w-3/4 bg-base-100 md:shadow-xl justify-center content-center">
                <div className="grid grid-cols-1 divide-y-2 md:grid-cols-2 md:divide-x-2 md:divide-y-0">
                    <div className="flex flex-col justify-center md:flex-row items-center gap-5">
                        <div className='flex flex-col justify-center items-center align-center md:items-start'>
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-48">
                                    <img src={imgUrl} alt="Profile Picture" className="rounded-full w-48"/>
                                </div>
                            </div>
                        </div>
                        <div className="text align-middle">
                            <div className="flex flex-col justify-center text-center md:text-left">
                                <h1 className="text-4xl font-bold">{name}</h1>
                                <h2 className="text-xl mb-2 md:mb-0">@{username}</h2>
                                <textarea className="w-full h-32 p-2 mt-2" placeholder="Bio is empty." value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col mx-8 mb-5 justify-center items-center mx-3">
                        <h1 className="text-2xl font-bold">Edit Profile</h1>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text-alt">Upload Profile Picture</span>
                                </div>
                                <input type="file" className="file-input file-input-bordered w-full max-w-xs" 
                                    value={userImg} 
                                    onChange={(e) => {
                                        setImgUrl(URL.createObjectURL(e.target.files[0]));
                                        setUserImg(e.target.value);
                                    }
                                }/>
                            </label>
                            <div className="same-line">
                                <label className="input input-bordered input-primary flex items-center gap-2">
                                    <UserIcon />
                                    <input type="text" className="w-full grow" placeholder="Full Name" value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setNameChanged(true);
                                    }} />
                                </label>
                                <label className="input input-bordered input-primary flex items-center gap-2">
                                    <ProfileIcon />
                                    <input type="text" className="w-full grow" placeholder="Username" value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setUsernameChanged(true);
                                    }} />
                                </label>
                            </div>
                            {!usernameValid && <div style={{textAlign: 'right'}} className="label-text text-red-600 mt-2">That username is already taken</div>}
                            <label className={`input input-bordered input-primary w-full flex items-center gap-2 ${!emailValid && 'border-red-600'}`}>
                                <EmailIcon />
                                <input type="text" className="grow" placeholder="Email" value={email}
                                onChange={(e) => {
                                    validateEmail(e.target.value);
                                    setEmail(e.target.value);
                                    setEmailChanged(true);
                                }} />
                            </label>
                            {!emailValid && <div className="label-text text-red-600 mt-2">Please enter a valid email address in the format <span style={{fontWeight: 'bold'}}>example@mail.com</span></div>}
                            {!emailValid2 && <div className="label-text text-red-600 mt-2">Email or username is taken. Please try another one</div>}
                            <label className={`input input-bordered input-primary w-full flex items-center gap-2 ${!phoneValid && 'border-red-600'}`}>
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
                            {!phoneValid && <div className="label-text text-red-600 mt-2 ">Phone number must be in the format <span style={{fontWeight: 'bold'}}>(123) 456-7890</span></div>}
                            <div className="same-line flex-col md:flex-row">
                                <div className="md:w-1/2">
                                    <label id="dob" className="input input-bordered input-primary flex w-full items-center gap-2">
                                        <CalendarIcon />
                                        <DatePicker selected={dob} onChange={(value) => setDob(value)}/>
                                    </label>
                                </div>
                                <div className="md:w-1/2">
                                    <select id="gender" className="input select select-primary w-full" value={gender} 
                                    onChange={(e) => {
                                        validateGender(e.target.value);
                                        setGender(e.target.value);
                                    }} >
                                        <option disabled>Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Prefer not to say</option>
                                    </select>
                                </div>
                            </div>
                            <label className={`input input-bordered input-primary w-full flex items-center gap-2 ${(!passwordValid1 || !passwordValid2 || !confirmPwValid) && 'border-red-600'}`}>
                                <PasswordIcon />
                                <input type="password" className="grow" placeholder="New Password" value={password}
                                onChange={(e) => {
                                    validatePassword1(e.target.value);
                                    validatePassword2(e.target.value);
                                    validateConfirmPw(confirmPw);
                                    setPassword(e.target.value);
                                }} />
                            </label>
                            {!passwordValid1 && <div className="label-text text-red-600 mt-2">Password must be at least 8 characters long</div>}
                            {!passwordValid2 && <div className="label-text text-red-600 mt-2">Password must contain at least one letter and one number</div>}
                            <label className={`input input-bordered input-primary w-full flex items-center gap-2 ${(!confirmPwValid) && 'border-red-600'}`}>
                                <PasswordIcon />
                                <input type="password" className="grow" placeholder="Confirm New Password" value={confirmPw}
                                onChange={(e) => {
                                    validateConfirmPw(e.target.value);
                                    setConfirmPw(e.target.value);
                                }} />
                            </label>
                            {!confirmPwValid && <div className="label-text text-red-600 mt-2">Passwords must match</div>}
                            <button type="submit" style={{color: 'white'}} className="btn btn-active w-full btn-primary mb-2">Submit Changes</button>
                            {changesSaved && <div className="label-text mt-2">Changes have been saved!</div>}
                        </form>
                    </div>
                </div>
            </div>
            <div className='mt-5 -my-10'>
                <ProfilePreferences>
                    <ProfilePreferenceCards sports={myPreferences} />
                </ProfilePreferences>
            </div>
        </div>
        <VerifyEmail/>
        <Footer/>
        </div>
    );
}
