/*********************************************************************
Component: AllGameCarousel
Contributors: Martin Pham
Description: This component takes in children that specifically maps out 
all of the games in the database
********************************************************************/

import '../../styles/Carousel.css';
import React, { useRef } from 'react';
import { LeftArrow, RightArrow } from '../Icons';
import SportFilter from './SportFilter';

const AllGameCarousel = ({ children, title, onChange }) => {
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
        <div className="carousel-container">
            <div className="flex items-center gap-4">
                <div className="carousel-title">{title}</div>
                <SportFilter onChange={onChange} />
            </div>
            <div className="carousel-content" ref={containerRef}>
                {children}
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

export default AllGameCarousel;