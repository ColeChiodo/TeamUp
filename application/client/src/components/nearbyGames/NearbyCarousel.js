/*********************************************************************
Component: NearbyCarousel
Contributors: Martin Pham
Description: This component takes in children that will map out info such as 
             games, sports, or a user's preferences. It contains the ability to 
             scroll left and right as needed. Takes in a title as a prop to be 
             displayed at the top.
********************************************************************/

import '../../styles/Carousel.css';
import React, { useRef } from 'react';
import { LeftArrow, RightArrow } from '../Icons';
import NearbyGameCards from './NearbyGameCards';
import NearbyFilter from './NearbyFilter';
import { useState, useEffect } from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';

const NearbyCarousel = ({ title }) => {
    const domain=process.env.REACT_APP_API_URL;
    const version=process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;

    const { locationInfo } = useGeolocation();

    useEffect(() => {
        if(locationInfo) {
            const lat = locationInfo.latitude;
            const long = locationInfo.longitude;
            fetch(`${url}/game/nearby?lat=${lat}&lng=${long}&radius=100`)
                .then((res) => {
                    if(!res.ok) {
                        throw new Error("Failed to fetch nearby games");
                    }
                    return res.json();
                }).then((res) => {
                    setNearbyGames(res.games);
                }).catch((err) => {
                    console.error("Error fetching nearby games: ", err);
                });
        }
    }, [url, locationInfo]);
    
    const [nearbyGames, setNearbyGames] = useState([]);

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

    const handleRadiusChange = (radius) => {
        const lat = locationInfo.latitude;
        const long = locationInfo.longitude;
        fetch(`${url}/game/nearby?lat=${lat}&lng=${long}&radius=${radius}`)
            .then((res) => {
                if(!res.ok) {
                    throw new Error("Failed to fetch nearby games");
                }
                return res.json();
            }).then((res) => {
                setNearbyGames(res.games);
            }).catch((err) => {
                console.error("Error fetching nearby games: ", err);
            });
    }
    
    return (
        <div className="carousel-container">
            <div className="flex items-center gap-4">
                <div className="carousel-title">{title}</div>
                <NearbyFilter onChange={handleRadiusChange} />
            </div>
            <div className="carousel-content" ref={containerRef}>
                <NearbyGameCards games={nearbyGames} location={locationInfo} />
            </div>
            <button className="left-arrow" onClick={scrollLeft}>
                <LeftArrow />
            </button>
            <button className="right-arrow" onClick={scrollRight}>
                <RightArrow />
            </button>
        </div>
    )
   
}

export default NearbyCarousel;