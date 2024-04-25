/*********************************************************************
Page: Home Page
Contributors: Martin Pham
Description: Home page for the application. Displays all games that are
             available for the selected sports. The user can search for games 
             using the search bar and filter games by sport.
Components:
    - SportFilter: Filter games by sport
    - GameCards: Display game cards
    - Carousel: Display a carousel of game cards
    - NavigationBar: Navigation bar for the application
    - Footer: footer below that is placed in the layout file
********************************************************************/

'use client'

import '@/styles/Home.css';
import React, { useState, useEffect } from 'react';
import SportFilter from '@/components/SportFilter';
import { SearchIcon } from '@/components/Icons';
import GameCards from '@/components/GameCards';
import Carousel from '@/components/Carousel';

function Home() {
    const [games, setGames] = useState([]);
    const [selectedSports, setSelectedSports] = useState([
        'Football',
        'Basketball',
        'Tennis'
    ]);
    
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const gameData = [];
                for (const sport of selectedSports) {
                    const response = await fetch('http://localhost:3000/v1/game/search', {
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
    }, [selectedSports]);

    const handleSportFilterChange = (selectedSports) => {
        setSelectedSports(selectedSports);
    };


    const onSearch = async (searchTerm) => {
        try {
            const searchResults = [];
            for (const sport of selectedSports) {
                const response = await fetch('http://localhost:3000/v1/game/search', {
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
            </header>
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
                        <SportFilter onChange={handleSportFilterChange} />
                    </div>
                </div>
                <Carousel title="Games">
                    <GameCards games={games} />
                </Carousel>
            </div>
        </>
    );
}

export default Home;
