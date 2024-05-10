/*********************************************************************
Page: Preferences Page
Contributors: Martin Pham
Description: Preference page that users are directed to immediately after 
             sign up. They will create a list of their favorite sports and 
             respective skill level and store these preferences in the 
             database. 
Components:
    - Carousel: used to display list of available sports 
    - SportCards: used as children of Carousel to display all sports
    - Icons: sport icons and a search icon for better ui
********************************************************************/

import Carousel from '../components/Carousel';
import SportCards from '../components/preferences/SportCards';
import '../styles/Preferences.css';
import { SearchIcon } from '../components/Icons';
import { useState } from 'react';
import { FootballIcon, SoccerIcon, BasketballIcon, TennisIcon, VolleyballIcon } from '../components/Icons';
import { useNavigate } from 'react-router-dom';
import MyPreferences from '../components/preferences/MyPreferences';

const Preferences = () => {
    const navigate = useNavigate();
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

    const [myPreferences, setMyPreferences] = useState([]);

    const onSearch = (searchTerm) => {
        const searchedSports = sports.filter(sport =>
            sport.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSports(searchedSports);
    };

    return (
        <>
        <header>
            <title>Preferences</title>
            <link rel="icon" href="/images/TeamUp.ico" type="image/x-icon"/>
        </header>
        <div className="navigation-bar navbar bg-base-100">
            <div className="navbar-start">
                { /* filler for navbar to be structured correctly */}
            </div>
            <div className="navbar-center">
                <img className="nav-logo" src="/images/Logo.png" />
            </div>
            <div className="navbar-end">
                { /* filler for navbar to be structured correctly */}
            </div>
        </div>
        <div className="preferences-container">
            <div className="preferences-title">Before getting started, please select the sports you're most interested in</div>
            <div className="preferences-search-container">
                <div className="preferences-search-bar">
                    <div className="preferences-search-input">
                        <input type="text" id="search" name="search" placeholder="Search for sport" onKeyPress={(e) => e.key === 'Enter' && onSearch(e.target.value)}></input>
                        <div className="preferences-search-icon" onClick={() => onSearch(document.getElementById('search').value)}>
                            <SearchIcon />
                        </div>
                    </div>
                </div>
            </div>
            <div className="preferences-divider" />
            <Carousel title="Sports">
                <SportCards sports={filteredSports} myPreferences={myPreferences} setMyPreferences={setMyPreferences} />
            </Carousel>
            <div className="preferences-divider" />
            {myPreferences.length !== 0 && (
                <>
                <Carousel title="My Sports">
                    <MyPreferences sports={myPreferences} setMyPreferences={setMyPreferences} />
                </Carousel>
                <div className="preferences-divider" />                
                </>
            )}
            <button onClick={() => navigate('/home')} className="done-btn btn btn-active btn-neutral w-48">Done</button>
            <div onClick={() => navigate('/home')}className="skip-btn">Skip for now</div>
        </div>
        </>
    )
}

export default Preferences;