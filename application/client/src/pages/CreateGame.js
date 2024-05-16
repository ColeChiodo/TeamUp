/*********************************************************************
Page: Create Game Page
Contributors: Jaycee Lorenzo
Description: Page that contains a form for creating a game. The user is required to enter all
             the necessary information to create a game. The user can also
             cancel the creation of the game.
Components:
    - NavigationBar: Navigation bar for the application
    - LeftArrow: Icon for the back button
    - Footer: Footer for the application
********************************************************************/
import React, { useState, useEffect } from 'react';
import '../styles/CreateGame.css';
import { Link, useNavigate } from 'react-router-dom';
import { LeftArrow } from '../components/Icons';
import Cookies from 'js-cookie';
import LocationInput from '../components/create_game/LocationInput';
import SportInput from '../components/create_game/SportInput';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

function CreateGame(){
    const domain=process.env.REACT_APP_API_URL;
    const version=process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;

    const navigate = useNavigate();

    // switched from useLayoutEffect to useEffect
    useEffect(() => {
        const userData = Cookies.get('userData');
        if(!userData) {
            navigate('/login');
        }
    }, [navigate]);


    // STATE VARIABLES
    const [title, setTitle] = useState('');

    const [sport, setSport] = useState('');
    const updateSport = (s) => {
        setSport(s);
    }

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');

    const [location, setLocation] = useState('');
    const updateLocation = (loc) => {
        setLocation(loc);
    }
    const [numberOfPlayers, setNumberOfPlayers] = useState('');
    // END STATE VARIABLES

    // VALIDATION VARIABLES
    const [titleValid, setTitleValid] = useState(true);

    const [sportValid, setSportValid] = useState(true);
    const updateSportValid = (sValid) => {
        setSportValid(sValid);
    }

    const [dateValid, setDateValid] = useState(true);
    const [timeValid, setTimeValid] = useState(true);
    const [descriptionValid, setDescriptionValid] = useState(true);

    const [locationValid, setLocationValid] = useState(true);
    const updateLocationValid = (locValid) => {
        setLocationValid(locValid);
    }

    const [numberOfPlayersValid, setNumberOfPlayersValid] = useState(true);
    // END VALIDATION VARIABLES


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

        // set time to end of day
        selectedDate.setHours(23, 59, 59, 999);

        // when converting d to date, it is 1 day behind, so we add 1 day
        selectedDate.setDate(selectedDate.getDate() + 1);

        if(selectedDate < today) {
            setDateValid(false);
        }
        else {
            setDateValid(true);
        }

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
        if (loc === undefined || loc === ""){
            setLocationValid(false);
            return;
        } else setLocationValid(true);
    };

    const validateNumberOfPlayers = (num) => {
        // check if number is an integer
        const i = parseFloat(num);
        if (i === undefined || i === "" || !Number.isInteger(i) || i % 1 !== 0 || i < 2){
            setNumberOfPlayersValid(false);
            return;
        } else setNumberOfPlayersValid(true);
    };

    const handleCancel = () => {
        navigate('/home');
    }
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
        if (title === '' || sport === "DEFAULT" || date === '' || time === '' || description === '' || numberOfPlayers === ''){
            console.log("Some fields are empty");
            return;
        } else {
            console.log("All fields are filled");

            const [year, month, day] = date.split('-').map(Number);
            const [hour, minute] = time.split(':').map(Number);
            const date2 = new Date(year, month - 1, day, hour, minute);

            // Format date to ISO string
            const formattedDate = date2.toISOString();

            async function createGame() {
                const gameData = {
                    date_time: formattedDate,
                    number_of_players: parseInt(numberOfPlayers, 10),
                    name: title,
                    sport_id: sport.id,
                    game_location_id: location.id,
                    description: description
                };
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cookies.get('accessToken')
                    },
                    body: JSON.stringify(gameData)
                };
                try {
                    const response = await fetch(`${url}/game`, options);
                    const data = await response.json();
                    console.log('Game created: ', data);
                    navigate(`/detailed-game/${data.game.id}`);
                }
                catch (error) {
                    console.error('Failed to create game: ', error);
                }
            }
            createGame();
        }

    }
    

    return (
        <>
        <NavigationBar />
        <div className="flex flex-col min-h-screen">
            <header>
                <title>Create Game</title>
                <link rel="icon" href="/images/TeamUp.ico" type="image/x-icon"/>
            </header>
            <div className="flex justify-center items-center">
                <div className="justify-self-center mt-4 mb-1 w-3/4">
                    <Link to="/home" className="">
                            <button className="rounded-full bg-primary w-16 h-12 pl-5">
                                <LeftArrow />
                            </button>
                    </Link>
                    <div className="font-extralight text-slate-700">
                        Back to home
                    </div>
                </div>
            </div>
            
            <div className="grid grid-col-2 border rounded-lg py-4 my-3 w-3/4 mx-auto shadow">
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
                            className={`input input-bordered input-accent w-full 
                                ${!dateValid ? 'border-red-500' : ''}
                                ${date === '' ? 'text-gray-400' : 'text-black'}`}
                            value={date}
                            onChange={(e) => {
                                validateDate(e.target.value);
                                setDate(e.target.value);
                            }}
                            />
                        {!dateValid && <p className="text-red-500">Enter a valid date</p>}
                    </label>

                    <SportInput sport={sport} updateSport={updateSport} 
                        sportValid={sportValid} updateSportValid={updateSportValid} 
                    />

                    <label> {/* Time */}
                        <p className="font-bold text-md">Time</p>
                        <input 
                        type="Time" 
                        className={`input input-bordered input-accent w-full 
                            ${!timeValid ? 'border-red-500' : ''}
                            ${time === '' ? 'text-gray-400' : 'text-black'}
                            `}
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
                            const value = e.target.value;
                            if (value.length <= 1000){
                                validateDescription(e.target.value);
                                setDescription(e.target.value);
                            }
                        }}
                        />
                        <div className="flex justify-end">
                            <p className="text-gray-500">{description.length}/1000 characters</p>
                        </div>
                        {!descriptionValid && <p className="text-red-500">Description must be at least 10 characters long</p>}
                    </label>

                    <div className="flex flex-col">
                        <LocationInput location={location} updateLocation={updateLocation} 
                            locationValid={locationValid}
                            updateLocationValid={updateLocationValid}
                        />
                        
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
                            <button onClick={handleCancel} className="btn btn-outline btn-error mt-4 text-white">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
        <Footer />
        </>
    )
}

export default CreateGame;