'use client'

import NavigationBar from '@/components/NavigationBar';
import Carousel from '@/components/Carousel';
import EditPreferenceCards from '@/components/profile/EditPreferenceCards';
import SportCards from '@/components/preferences/SportCards';
import '@/styles/Preferences.css'
import { SearchIcon, FootballIcon, SoccerIcon, BasketballIcon, TennisIcon, VolleyballIcon } from '@/components/Icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const EditPreferences = () => {
    const router = useRouter();
    
    const [myPreferences, setMyPreferences] = useState([
        { name: 'Football', icon: <FootballIcon />, skillLevel: 'New' },
        { name: 'Basketball', icon: <BasketballIcon />, skillLevel: 'New' },
    ]);

    const [sports, setSports] = useState([
        { name: 'Football', icon: <FootballIcon /> },
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

    const onSearch = (searchTerm) => {
        const searchedSports = sports.filter(sport =>
            sport.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSports(searchedSports);
    };

    return (
        <>
        <NavigationBar />
        <div className="preferences-container">
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
            <Carousel title="All Preferences & Interests">
                <SportCards sports={filteredSports} myPreferences={myPreferences} setMyPreferences={setMyPreferences} />
            </Carousel>
            <div className="preferences-divider" />
            <Carousel title="My Preferences & Interests">
                    <EditPreferenceCards sports={myPreferences} myPreferences={myPreferences} setMyPreferences={setMyPreferences} />
                </Carousel>
            <button onClick={() => router.push('/profile')} className="done-btn btn btn-active btn-neutral w-48">Done</button>
        </div>
        </>
    )
}

export default EditPreferences