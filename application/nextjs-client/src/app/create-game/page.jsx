'use client'

import React, { useState, useEffect, useContext } from 'react';
import '@/styles/CreateGame.css';
import GameCards from '@/components/GameCards';
import Link from 'next/link';
import { useRouter} from 'next/navigation';
import { LeftArrow } from '@/components/Icons';

function CreateGame(){
    const router = useRouter();

    const sports = [
        {value:"DEFAULT", label:"Select A Sport"},
        {value:"basketball", label:"Basketball"},
        {value:"soccer", label:"Soccer"},
        {value:"football", label:"Football"},
        {value:"baseball", label:"Baseball"},
        {value:"tennis", label:"Tennis"},
        {value:"volleyball", label:"Volleyball"}
    ]

    const [title, setTitle] = useState('');
    const [sport, setSport] = useState("DEFAULT");
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [numberOfPlayers, setNumberOfPlayers] = useState('');


    const [titleValid, setTitleValid] = useState(true);
    const [sportValid, setSportValid] = useState(true);
    const [dateValid, setDateValid] = useState(true);
    const [timeValid, setTimeValid] = useState(true);
    const [descriptionValid, setDescriptionValid] = useState(true);
    const [locationValid, setLocationValid] = useState(true);
    const [numberOfPlayersValid, setNumberOfPlayersValid] = useState(true);

    // reset all state variables
    useEffect(() => {
        setTitle('');
        setSport('DEFAULT');
        setDate('');
        setTime('');
        setDescription('');
        setLocation('');
        setNumberOfPlayers('');
    }, []);

    const validateTitle = (t) => {
        if ((t === undefined || t === '' || t.trim().length < 5)){
            setTitleValid(false);
            return;
        }
        setTitleValid(true);
    };

    const validateSport = (s) => {
        if (s === undefined || s === ""){
            setSportValid(false);
            return;
        }
        setSportValid(s !== "DEFAULT");
    };

    const validateDate = (d) => {
        if (d === '' || d === undefined){
            setDateValid(false);
            return;
        }
        const today = new Date();
        const selectedDate = new Date(d);
        if(selectedDate < today) setDateValid(false);
        else setDateValid(true);

    };

    const validateTime = (x) => {
        if (x === '' || x === undefined){
            setTimeValid(false);
            return;
        }
        const selectedTime = new Date(`${date}T${x}`);
        const currentTime = new Date();
        if (selectedTime < currentTime) setTimeValid(false);
        else setTimeValid(true);

    };

    const validateDescription = (desc) => {
        if(desc === undefined || desc === "") {
            setDescriptionValid(false);
            return;
        }
        else setDescriptionValid(desc.trim().length >= 10);

    };

    const validateLocation = (loc) => {
        if (loc === undefined || loc === "" || loc.trim().length < 5){
            setLocationValid(false);
            return;
        } else setLocationValid(true);
    };

    const validateNumberOfPlayers = (num) => {
        // check if number is an integer
        const i = parseFloat(num);
        if (i === undefined || i === "" || !Number.isInteger(i) || i % 1 !== 0){
            setNumberOfPlayersValid(false);
            return;
        } else setNumberOfPlayersValid(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        validateTitle(title);
        validateSport(sport);
        validateDate(date);
        validateTime(time);
        validateDescription(description);
        validateLocation(location);
        validateNumberOfPlayers(numberOfPlayers);

        // TEMP: waiting for APIs
        if (title === '' || sport === "DEFAULT" || date === '' || time === '' || description === '' || location === '' || numberOfPlayers === ''){
            console.log("Some fields are empty");
            return;
        } else {
            console.log("All fields are filled");
            router.push('/detailed-game');
        }
        


    }
    

    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-5/6 flex justify-left my-1 self-center">
                <Link href="/home" className="">
                        <button className="rounded-full bg-primary w-16 h-12 pl-5">
                            <LeftArrow />
                        </button>
                </Link>
            </div>
            <div className="grid grid-col-2 border rounded-lg py-4 w-5/6 mx-auto shadow">
                <h2 className="font-bold text-4xl place-self-center">Create Game</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 mx-auto w-5/6">
                    <label> {/* Game Title */}
                        <p className="font-bold text-md">Title</p>
                        <input type="text" 
                            className={`input input-bordered input-accent w-full ${!titleValid ? 'border-red-500' : ''}`}
                            placeholder="Game Title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                validateTitle(e.target.value);
                            }}
                        />
                        {!titleValid && <p className="text-red-500">Title must be at least 5 characters long</p>}
                    </label>

                    <label> {/* Date */}
                        <p className="font-bold text-md">Date</p>
                        <input 
                            type="date" 
                            className={`input input-bordered input-accent w-full ${!dateValid ? 'border-red-500' : ''}`}
                            value={date}
                            onChange={(e) => {
                                validateDate(e.target.value);
                                setDate(e.target.value);
                            }}
                            />
                        {!dateValid && <p className="text-red-500">Enter a valid date</p>}
                    </label>

                    <label> {/* Sport */}
                        <p className="font-bold text-md">Sport</p>
                        {/* <input type="text" className="input input-bordered input-accent w-full" placeholder="Sport"></input> */}
                        <select 
                        className={`select select-bordered select-accent w-full ${!sportValid ? 'border-red-500' : ''}`}
                        value={sport}
                        onChange={(e) => {
                            validateSport(e.target.value);
                            setSport(e.target.value);
                        }}
                        >
                            {sports.map((sport) => (
                                <option key={sport.value} value={sport.value}>{sport.label}</option>
                            ))}
                        </select>
                        {!sportValid && <p className="text-red-500">Sport is required</p>}
                    </label>

                    <label> {/* Time */}
                        <p className="font-bold text-md">Time</p>
                        <input 
                        type="Time" 
                        className={`input input-bordered input-accent w-full ${!timeValid ? 'border-red-500' : ''}`}
                        value={time}
                        onChange={(e) => {
                            validateTime(e.target.value);
                            setTime(e.target.value);
                        }}
                        />
                        {!timeValid && <p className="text-red-500">Enter a valid time</p>}
                    </label>

                    <label> {/* Description */}
                        <p className="font-bold text-md">Description</p>
                        <textarea 
                        className={`textarea textarea-bordered textarea-accent h-56 w-full ${!descriptionValid ? 'border-red-500' : ''}`} 
                        placeholder="Game Description"
                        value={description}
                        onChange={(e) => {
                            validateDescription(e.target.value);
                            setDescription(e.target.value);
                        }}
                        />
                        {!descriptionValid && <p className="text-red-500">Description must be at least 10 characters long</p>}
                    </label>

                    <div className="flex flex-col">
                        <div className="mb-2">
                            <label> {/* Location */}
                                <p className="font-bold text-md">Location</p>
                                <input 
                                type="text" 
                                className={`input input-bordered input-accent w-full ${!locationValid ? 'border-red-500' : ''}`}
                                placeholder="123 Main St. Building B"
                                value={location}
                                onChange={(e) => {
                                    validateLocation(e.target.value);
                                    setLocation(e.target.value);
                                }}
                                />
                                {!locationValid && <p className="text-red-500">Enter a valid location</p>}
                            </label>
                        </div>
                        
                        <label> {/* Number of Players */}
                            <p className="font-bold text-md">Number of Players</p>
                            <input 
                            type="number" 
                            className={`input input-bordered input-accent w-full ${!numberOfPlayersValid ? 'border-red-500' : ''}`} 
                            placeholder="10"
                            value={numberOfPlayers}
                            onChange={(e) => {
                                validateNumberOfPlayers(e.target.value);
                                setNumberOfPlayers(e.target.value);
                            }}
                            />
                            {!numberOfPlayersValid && <p className="text-red-500">Enter a valid number of players</p>}
                        </label>
                        
                        <div className="flex justify-center"> {/* Buttons */}
                            <button type="submit" className="btn btn-primary mt-4 text-white mr-4">Create Game</button>
                            <button className="btn btn-outline btn-error mt-4 text-white">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateGame;