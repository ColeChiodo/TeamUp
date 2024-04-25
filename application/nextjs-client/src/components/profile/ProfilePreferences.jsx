/*********************************************************************
Component: ProfilePreferences
Contributors: Martin Pham
Description: This is a variation of Carousel component that includes the edit
             button right next to the title. This will lead users to go the 
             edit preferences page.
********************************************************************/

import '@/styles/Carousel.css';
import React, { useRef } from 'react';
import { LeftArrow, RightArrow } from '@/components/Icons';
import Link from 'next/link';

const ProfilePreferences = ({ children }) => {
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
            <div className="carousel-title">
                Preferences and Interests{' '}
                <Link 
                    style={{ color: "blue", textDecoration: "underline", fontSize: "0.8em", marginLeft: "0.5em" }} 
                    href="/profile/editPreferences">
                      edit
                </Link>
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

export default ProfilePreferences;