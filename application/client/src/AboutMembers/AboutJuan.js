// about page for Juan

import React from 'react'
import '../components/TeamMember/about.css'
import JuanImage from '../images/MemberPics/Juan.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function AboutJuan(){
    return (
        <div className="App"> 
            <div className="header">
                <Link to="/about">
                    <div className="back-icon-container">
                        <FontAwesomeIcon icon={faChevronLeft} className='back-icon' size="2xl"/>
                    </div>
                </Link>
            <h1 className='title'>About Juan Estrada</h1>
            </div>
            <div className="about-me-description-container">
                <div className="about-me-image-container">
                    <img className="about-me-image"
                        src={JuanImage} alt='placeholder' />
                    <p>Github: jjestrada2</p>
                </div>
                <p className="about-me-description">
                Hey there! I am the Team Lead, My name is Juan Estrada, but most folks just call me Juanito. I'm a computer science student from Colombia 🇨🇴, currently studying at San Francisco State University. Go Gators!🐊
                You'll often find me at hackathons, meetups, and conferences, geeking out with fellow tech enthusiasts and keeping up with the latest trends.

                </p>
            </div>
        </div>
    )
}

export default AboutJuan;

