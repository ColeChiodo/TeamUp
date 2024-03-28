// about page for Cole

import React from 'react'
import '../Stylesheets/About.css'
import ColeImage from '../images/MemberPics/Cole.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function AboutCole(){
    return (
        <div className="App"> 
            <div className="header">
                <Link to="/about">
                    <div className="back-icon-container">
                        <FontAwesomeIcon icon={faChevronLeft} className='back-icon' size="2xl"/>
                    </div>
                </Link>
            <h1 className='title'>About Cole Chiodo</h1>
            </div>
            <div className="about-me-description-container">
                <div className="about-me-image-container">
                    <img className="about-me-image"
                        src={ColeImage} alt='placeholder' />
                    <p>Github: colechiodo</p>
                </div>
                <p className="about-me-description">
                    Hi! I'm Cole. I am a senior Computer Science Major at San Francisco State University. I like to play video games,
                    play my bass guitar, and follow the Giants during the baseball season. I am the Docs Editor for the team.
                </p>
            </div>
        </div>
    )
}

export default AboutCole;