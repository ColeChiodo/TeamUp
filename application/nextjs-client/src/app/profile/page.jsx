'use client';

import '@/styles/globals.css';
import React, {useState} from "react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { useAppContext } from '@/context'
import { UserIcon, EmailIcon, PasswordIcon, PhoneIcon, CalendarIcon } from '@/components/Icons'; 
import { FootballIcon, SoccerIcon, BasketballIcon, TennisIcon, VolleyballIcon } from '@/components/Icons';
import Carousel from '@/components/Carousel';
import SportCards from '@/components/SportCards';

export default function Profile() {

    const { user } = useAppContext();

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

    var [nameVal, setNameVal] = useState(user.name);
    var [initials, setInitials] = useState(user.name.split(" ").map((n) => n[0]).join(""));
    var [userNameVal, setUserNameVal] = useState("NotRealUser123");
    var [emailVal, setEmailVal] = useState(user.email);
    var [phoneVal, setPhoneVal] = useState("(000)000-0000");
    var [genderVal, setGenderVal] = useState("Male");
    var [dobVal, setDobVal] = useState("04/15/2024");
    var [passVal, setPassVal] = useState("**********");

    const [sports, setSports] = useState([
        { name: 'Football', icon: <FootballIcon fontSize="large"/> },
        { name: 'Basketball', icon: <BasketballIcon /> },
        { name: 'Tennis', icon: <TennisIcon /> },
        { name: 'Soccer', icon: <SoccerIcon /> },
        { name: 'Volleyball', icon: <VolleyballIcon /> }
    ]);
    
    const [filteredSports, setFilteredSports] = useState([
        { name: 'Football', icon: <FootballIcon /> },
        { name: 'Basketball', icon: <BasketballIcon /> },
        { name: 'Tennis', icon: <TennisIcon /> },
        { name: 'Soccer', icon: <SoccerIcon /> },
        { name: 'Volleyball', icon: <VolleyballIcon /> }
    ]);

    return (
        <div className="bg-white w-full h-full overflow-hidden">
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
                            <a className="btn btn-primary w-32 md:ml-5 EditButton" onClick={toggleEdit}>Edit Profile</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='-my-10'>
                <Carousel title="My Preferences and Interests">
                    <SportCards sports={filteredSports} />
                </Carousel>
            </div>
        </div>
        <Footer/>
        </div>
    );
}
