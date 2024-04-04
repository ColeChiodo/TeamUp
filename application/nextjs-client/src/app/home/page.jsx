import '../Stylesheets/Home.css';
import React, { useRef, useState, useEffect, useClient } from 'react';
import { SportFilter, RightArrow, LeftArrow } from "@/components/SportFilter";
import Link from 'next/link';


function Home() {
    useClient(); 
    
    const containerRef = useRef(null);
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
                    <input type="text" id="search" name="search" placeholder="Search for games" onKeyPress={(e) => e.key === 'Enter' && onSearch(e.target.value)}></input>
                    <div className="search-icon" onClick={() => onSearch(document.getElementById('search').value)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <SportFilter onChange={handleSportFilterChange} />
            </div>
            <div className="home-body-container">
                <div className="body-title">Games</div>
                <div className="game-container" ref={containerRef}>
                    {games.length === 0 ? (
                        <Link href="/home/unimplemented" className="game-card">
                            <div className="top-half">
                                No games found
                            </div>
                            <div className="bottom-half">
                                Please check again soon!
                            </div>
                        </Link>
                    ) : (
                        games.map((game, index) => (
                            <Link href="/home/unimplemented" key={index} className="game-card">
                                <div className="top-half">
                                    {game.name}
                                </div>
                                <div className="bottom-half">
                                    <div>Number of players: {game.number_of_players}</div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
                <button className="left-arrow" onClick={scrollLeft}>
                    <RightArrow />
                </button>
                <button className="right-arrow" onClick={scrollRight}>
                    <LeftArrow />
                </button>
            </div>
        </>
    );
}

export default Home;