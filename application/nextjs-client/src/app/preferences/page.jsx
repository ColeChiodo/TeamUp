'use client'

import Carousel from '@/components/Carousel';
import SportCards from '@/components/SportCards';
import '@/styles/Preferences.css';
import { SearchIcon } from '@/components/Icons';
import { useState } from 'react';
import { FootballIcon, SoccerIcon, BasketballIcon, TennisIcon, VolleyballIcon } from '@/components/Icons';
import { useRouter } from 'next/navigation';
import SimpleSportCards from '@/components/SimpleSportCards';

const Preferences = () => {
    const router = useRouter();
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
            <div className="preferences-title">Please select the sports you're most interested in</div>
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
                    <SimpleSportCards sports={myPreferences} />
                </Carousel>
                <div className="preferences-divider" />                
                </>
            )}
            <button onClick={() => router.push('/home')} className="done-btn btn btn-active btn-neutral w-48">Done</button>
            <div onClick={() => router.push('/home')}className="skip-btn">Skip for now</div>
        </div>
        </>
    )
}

export default Preferences;