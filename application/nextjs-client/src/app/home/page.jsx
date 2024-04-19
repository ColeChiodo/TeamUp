'use client'

import '@/styles/Home.css';
import React, { useRef, useState, useEffect, useContext } from 'react';
import SportFilter from '@/components/SportFilter';
import { LeftArrow, RightArrow, SearchIcon } from '@/components/Icons';
import GameCards from '@/components/GameCards';
import UserContext from '@/components/UserContext';

function Home() {
    const containerRef = useRef(null);
    const [games, setGames] = useState([]);
    const [selectedSports, setSelectedSports] = useState([
        'Football',
        'Basketball',
        'Tennis'
    ]);

    const context = useContext(UserContext);

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

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth',
            });
        }
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
            <div className="search-container">
                <div className="search-bar">
                    <div className="search-input">
                        <input type="text" id="search" name="search" placeholder="Search for games" onKeyPress={(e) => e.key === 'Enter' && onSearch(e.target.value)}></input>
                        <div className="search-icon" onClick={() => onSearch(document.getElementById('search').value)}>
                            <SearchIcon />
                        </div>
                    </div>
                    <SportFilter onChange={handleSportFilterChange} />
                </div>
            </div>
            <div className="home-body-container">
                <div className="body-title">Games</div>
                <div className="game-container" ref={containerRef}>
                    <GameCards games={games} />
                </div>
                <button className="left-arrow" onClick={scrollLeft}>
                    <LeftArrow />
                </button>
                <button className="right-arrow" onClick={scrollRight}>
                    <RightArrow />
                </button>
            </div>
        </>
    );
}

export default Home;
