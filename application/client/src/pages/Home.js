import '../Stylesheets/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useRef } from 'react';

function Home() {
    const containerRef = useRef(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: -200,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: 200,
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
        <div className="search-bar">
            <label htmlFor="search">Search</label>
            <input type="text" id="search" name="search" placeholder="Search for games"></input>
        </div>
        <div className="home-body-container">
            <div className="body-title">Games</div>
            <div className="game-container" ref={containerRef}>
                <div className="game-card">Game 1</div>
                <div className="game-card">Game 2</div>
                <div className="game-card">Game 3</div>
                <div className="game-card">Game 3</div>
                <div className="game-card">Game 3</div>
                <div className="game-card">Game 3</div>
                <div className="game-card">Game 3</div>

            </div>
            <button className="left-arrow" onClick={scrollLeft}>
                <FontAwesomeIcon icon={faArrowLeft} size="2x" />
            </button>
            <button className="right-arrow" onClick={scrollRight}>
                <FontAwesomeIcon icon={faArrowRight} size="2x" />
            </button>
        </div>
        </>
    )
}

export default Home