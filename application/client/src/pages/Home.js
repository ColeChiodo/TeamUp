import '../Stylesheets/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useRef } from 'react';

function Home() {
    const containerRef = useRef(null);

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

    return (
        <>
        <div className="search-bar">
            <label htmlFor="search">Search</label>
            <input type="text" id="search" name="search" placeholder="Search for games"></input>
        </div>
        <div className="home-body-container">
            <div className="body-title">Games</div>
            <div className="game-container" ref={containerRef}>
                <div className="game-card">
                    <div className="top-half">
                        Looks like there aren't any games right now
                    </div>
                    <div className="bottom-half">
                        Please check again soon!
                    </div>
                </div>             
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