/*********************************************************************
Page: Edit Preferences Page
Contributors: Martin Pham
Description: This is where a user can edit their preferences by adding 
             new sports, removing existing ones in their preferences, or 
             editing them. 
Components:
    - Carousel: to display all sports available and the ones selected as user's preference 
    - Navbar: the navbar that is displayed at the top 
    - EditPreferenceCards: used to display the existing user's preferences 
    - SportCards: used to display all of the sport cards
    - Icons: used to display pictures of the sports in the cards
********************************************************************/

import NavigationBar from '../components/NavigationBar';
import Carousel from '../components/Carousel';
import EditPreferenceCards from '../components/profile/EditPreferenceCards';
import SportCards from '../components/preferences/SportCards';
import '../styles/Preferences.css'
import { SearchIcon, FootballIcon, SoccerIcon, BasketballIcon, TennisIcon, VolleyballIcon } from '../components/Icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const EditPreferences = () => {
    const domain=process.env.REACT_APP_API_URL;
    const version=process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;
    const navigate = useNavigate();

    const [myPreferences, setMyPreferences] = useState([]);

    useEffect(() => {
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
    }, [url])

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

    const savePreferences = () => {
        const updateUserPreferences = myPreferences.map(preference => ({
            sport: preference.name,
            level: preference.skillLevel
        }));

        const reqBody = {
            updateUserPreferences
        };
        
        const userData = JSON.parse(Cookies.get('userData'));

        const userId = userData.id;

        fetch(`${url}/users/userPreferences/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('accessToken')
            },
            body: JSON.stringify(reqBody)
        }).then((res) => {
            if(!res.ok) {
                throw new Error('Failed to save preferences');
            }

            navigate('/profile');
        }).catch((err) => {
            console.error("Error saving preferences: ", err);
        })
    }

    return (
        <>
        <header>
            <title>Edit Preferences</title>
            <link rel="icon" href="/images/TeamUp.ico" type="image/x-icon"/>
        </header>
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
            <button onClick={() => savePreferences()} className="done-btn btn btn-active btn-neutral w-48">Done</button>
        </div>
        </>
    )
}

export default EditPreferences