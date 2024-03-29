import '../Stylesheets/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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

    const onSearch = () => {
        // to be implemented at a future point in time 
    }

    return (
        <>
        <div className="search-bar">
            <input type="text" id="search" name="search" placeholder="Search for games"></input>
            <div className="search-icon" onClick={onSearch}>
                <FontAwesomeIcon icon={faSearch} size="lg" />
            </div>
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
                <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
            </button>
            <button className="right-arrow" onClick={scrollRight}>
                <FontAwesomeIcon icon={faArrowRight} size="2xl" />
            </button>
        </div>
        </>
    )
}

export default Home