import '../Stylesheets/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState, useEffect } from 'react';
import SportFilter from '../components/SportFilter';

function Home() {
    const containerRef = useRef(null);
    const [games, setGames] = useState([]);
    const [selectedSports, setSelectedSports] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:3000/v1/game/search', {
                    method: 'POST',
                    body: JSON.stringify({ sports: selectedSports }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }
                const gameData = await response.json();
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

    const onSearch = () => {
        // to be implemented at a future point in time 
    };

    return (
        <>
            <div className="search-container">
                <div className="search-bar">
                    <input type="text" id="search" name="search" placeholder="Search for games"></input>
                    <div className="search-icon" onClick={onSearch}>
                        <FontAwesomeIcon icon={faSearch} size="lg" />
                    </div>
                </div>
                <SportFilter onChange={handleSportFilterChange} />
            </div>
            <div className="home-body-container">
                <div className="body-title">Games</div>
                <div className="game-container" ref={containerRef}>
                    {games.map((game, index) => (
                        <div className="game-card" key={index}>
                            <div className="top-half">
                                {game.name}
                            </div>
                            <div className="bottom-half">
                                <div>Sport: {game.sportName}</div>
                                <div>Number of players: {game.number_of_players}</div>
                            </div>
                        </div>
                    ))}
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
