/*********************************************************************
Component: Carousel
Contributors: Martin Pham
Description: This component takes in children that will map out info such as 
             games, sports, or a user's preferences. It contains the ability to 
             scroll left and right as needed. Takes in a title as a prop to be 
             displayed at the top.
********************************************************************/

import '@/styles/Carousel.css';
import React, { useRef } from 'react';
import { LeftArrow, RightArrow } from '@/components/Icons';

const Carousel = ({ children, title }) => {
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
            <div className="carousel-title">{title}</div>
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

export default Carousel;