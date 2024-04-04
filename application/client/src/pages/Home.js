import '../Stylesheets/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState, useEffect } from 'react';
import SportFilter from '../components/SportFilter';
import { Link } from 'react-router-dom'; 

function Home() {
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
                        <FontAwesomeIcon icon={faSearch} size="lg" />
                    </div>
                </div>
                <SportFilter onChange={handleSportFilterChange} />
            </div>
            <div className="home-body-container">
                <div className="body-title">Games</div>
                <div className="game-container" ref={containerRef}>
                    {games.length === 0 ? (
                        <Link to="/unimplemented" className="game-card">
                            <div className="top-half">
                                No games found
                            </div>
                            <div className="bottom-half">
                                Please check again soon!
                            </div>
                        </Link>
                    ) : (
                        games.map((game, index) => (
                            <Link to="/unimplemented" key={index} className="game-card">
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
                    <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
                </button>
                <button className="right-arrow" onClick={scrollRight}>
                    <FontAwesomeIcon icon={faArrowRight} size="2xl" />
                </button>
            </div>
        </>
    );
}

export default Home;
