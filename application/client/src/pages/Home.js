/*********************************************************************
Page: Home Page
Contributors: Martin Pham
Description: Home page for the application. Displays all games that are
             available for the selected sports. The user can search for games 
             using the search bar and filter games by sport.
Components:
    - GameCards: Display game cards
    - AllGameCarousel: Display a carousel of game cards
    - NearbyCarousel: Displays games nearby to user 
    - NavigationBar: Navigation bar for the application
    - Footer: footer below that is placed in the layout file
********************************************************************/

import '../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { SearchIcon } from '../components/Icons';
import GameCards from '../components/GameCards';
import AllGameCarousel from '../components/home/AllGameCarousel';
import NearbyCarousel from '../components/nearbyGames/NearbyCarousel';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useGeolocation } from '../hooks/useGeolocation';

function Home() {
    const domain=process.env.REACT_APP_API_URL;
    const version=process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;
    const [games, setGames] = useState([]);
    const [selectedSports, setSelectedSports] = useState([]);

    const { locationInfo } = useGeolocation();
    
    useEffect(() => {
        fetch(`${url}/game/sports`)
            .then((res) => {
                if(!res.ok) {
                    throw new Error("Failed to fetch sports");
                }
                return res.json();
            }).then((sportsData) => {
                const sportsNames = sportsData.map(sport => sport.name);
                setSelectedSports(sportsNames);
            }).catch((err) => {
                console.error("Error fetching sports: ", err);
            })
    }, [url])

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const gameData = [];
                for (const sport of selectedSports) {
                    const response = await fetch(`${url}/game/search`, {
                        method: 'POST',
                        body: JSON.stringify({ sport }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to fetch games for ${sport}`);
                    }
                    const sportGames = await response.json();
                    gameData.push(...sportGames);
                }
                setGames(gameData);
               
            } catch (error) {
                console.error('Error fetching games: ', error);
            }
        };

        fetchGames();
    }, [selectedSports, url]);

    const handleSportFilterChange = (selectedSports) => {
        setSelectedSports(selectedSports);
    };

    const onSearch = async (searchTerm) => {
        try {
            const searchResults = [];
            for (const sport of selectedSports) {
                const response = await fetch(`${url}/game/search`, {
                    method: 'POST',
                    body: JSON.stringify({ sport, gameName: searchTerm }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to search games');
                }
                const searchData = await response.json();
                searchResults.push(...searchData);
            }
            setGames(searchResults);
        } catch (error) {
            console.error('Error searching games: ', error);
        }
    };

    return (
        <>
            <header>
                <title>Home</title>
                <link rel="icon" href="/images/TeamUp.ico" type="image/x-icon"/>
            </header>
            <NavigationBar />
            <div className="home-container">
                <div className="search-container bg-secondary">
                    <div className="search-bar">
                        <div className="search-input">
                            <input 
                                type="text" 
                                id="search"
                                className="input input-bordered input-md w-full border-2 pl-2"
                                name="search"
                                placeholder="Search for games" 
                                onKeyPress={(e) => e.key === 'Enter' && onSearch(e.target.value)}/>
                            <div className="search-icon" onClick={() => onSearch(document.getElementById('search').value)}>
                                <SearchIcon />
                            </div>
                        </div>
                    </div>
                </div>
                <AllGameCarousel title="All Games" onChange={handleSportFilterChange}>
                    <GameCards games={games} />
                </AllGameCarousel>
                <div className="border-t-2 border-gray-300 w-5/6 m-auto" />
                {/* If the user has location shared, show them the nearby games */}
                {locationInfo && (
                    <NearbyCarousel title="Games Near You" />
                )}
            </div>
            <Footer />
        </>
    );
}

export default Home;
