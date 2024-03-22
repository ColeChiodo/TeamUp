// about page for Jaycee

import React from 'react'
import '../Stylesheets/About.css'
import JayceeImage from '../images/MemberPics/Jaycee.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function AboutJaycee(){
    return (
        <div className="App"> 
            <div className="header">
                <Link to="/about">
                    <div className="back-icon-container">
                        <FontAwesomeIcon icon={faChevronLeft} className='back-icon' size="2xl"/>
                    </div>
                </Link>
            <h1 className='title'>About Jaycee Lorenzeo</h1>
            </div>
            <div className="about-me-description-container">
                <div className="about-me-image-container">
                    <img className="about-me-image"
                        src={JayceeImage} alt='placeholder' />
                    <p>Github: jclorenz0</p>
                </div>
                <p className="about-me-description">
                    Hey! I'm Jaycee, the team's Front-end Lead. I'm a senior Computer Science major at 
                    San Francisco State University. I love climbing and playing pool! I'm a also a huge fan of basketball and the  
                    New York Knicks.
                </p>
            </div>
        </div>
    )
}
export default AboutJaycee;