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
import React, { useReducer, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { UserIcon, EmailIcon, PasswordIcon, PhoneIcon, CalendarIcon } from '../components/Icons'; 
import { FootballIcon, SoccerIcon, BasketballIcon, TennisIcon, VolleyballIcon } from '../components/Icons';
import ProfilePreferences from '../components/profile/ProfilePreferences';
import ProfilePreferenceCards from '../components/profile/ProfilePreferenceCards';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import VerifyEmail from '../components/VerifyEmail';

export default function Profile() {
    const domain=process.env.REACT_APP_API_URL;
    const version=process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;

    const navigate = useNavigate();

    var [nameVal, setNameVal] = useState("");
    var [initials, setInitials] = useState("");
    var [userNameVal, setUserNameVal] = useState("");
    var [emailVal, setEmailVal] = useState("");
    var [phoneVal, setPhoneVal] = useState("");
    var [genderVal, setGenderVal] = useState("");
    var [dobVal, setDobVal] = useState("");
    var [passVal, setPassVal] = useState("**********");

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
            setNameVal(data.name);
            setInitials(data.name.split(' ').map((n) => n[0]).join(''));
            setUserNameVal(data.username);
            setEmailVal(data.email);
            setPhoneVal(data.phone);
            setGenderVal(data.gender);
            setDobVal(data.dob);
            getPreferences();
            document.title = `${data.name} - TeamUp`;
        }).catch((err) => {
            console.error('Error while trying to get user: ', err);
        });
    }
        

    const [isEditing, setIsEditing] = useState(true);

    function toggleEdit() {
        setIsEditing(!isEditing);

        const editButton = document.querySelector(".EditButton");
        const passwordField = document.querySelector(".password");

        if(isEditing) {
            setPassVal("");
            editButton.innerHTML = "Save Changes";
        } else {
            setPassVal("**********");
            editButton.innerHTML = "Edit Profile";
        }
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
            console.log("data: ", data.sportLevels[0]);
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
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-48">
                                <span className="text-3xl">{initials}</span>
                            </div>
                        </div>
                        <div className="text align-middle">
                            <div className="flex flex-col justify-center text-center md:text-left">
                                <h1 className="text-4xl font-bold">{nameVal}</h1>
                                <h2 className="text-xl">@{userNameVal}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mx-8 mb-5 justify-center">
                        <div className="flex flex-row justify-center items-center gap-2 md:justify-normal md:mx-5">
                            <EmailIcon/>
                            <input type="text" value={emailVal} disabled={isEditing} placeholder='Enter New Email' className="text-2xl toggleField"
                            onChange={(e) => {
                                setEmailVal(e.target.value)
                            }}/>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-2 md:justify-normal md:mx-5">
                            <PhoneIcon/>
                            <input type="text" value={phoneVal} disabled={isEditing} placeholder='Enter New Phone Number' className="text-2xl toggleField"
                            onChange={(e) => {
                                setPhoneVal(e.target.value)
                            }}/>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-2 md:justify-normal md:mx-5">
                            <UserIcon/>
                            <input type="text" value={genderVal} disabled={isEditing} placeholder='Enter New Gender' className="text-2xl toggleField"
                            onChange={(e) => {
                                setGenderVal(e.target.value)
                            }}/>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-2 md:justify-normal md:mx-5">
                            <CalendarIcon/>
                            <input type="text" value={dobVal} disabled={isEditing} placeholder='Enter New Birthday' className="text-2xl toggleField"
                            onChange={(e) => {
                                setDobVal(e.target.value)
                            }}/>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-2 md:justify-normal md:mx-5">
                            <PasswordIcon/>
                            <input type="text" value={passVal} disabled={isEditing} placeholder='Enter New Password' className="text-2xl toggleField password"
                            onChange={(e) => {
                                setPassVal(e.target.value)
                            }}/>
                        </div>
                        <div className="flex flex-row justify-center md:justify-normal mb-5 md:mb-0">
                            <a className="btn btn-primary w-32 md:ml-5 text-white EditButton" onClick={toggleEdit}>Edit Profile</a>
                        </div>
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
