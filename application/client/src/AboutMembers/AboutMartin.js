// about page for Martin

import React from 'react'
import '../components/TeamMember/about.css'
import MartinImage from '../images/MemberPics/Martin.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function AboutMartin(){
    return (
        <div className="App"> 
            <div className="header">
                <Link to="/about">
                    <div className="back-icon-container">
                        <FontAwesomeIcon icon={faChevronLeft} className='back-icon' size="2xl"/>
                    </div>
                </Link>
                <h1 className='title'>About Martin Pham</h1>
            </div>
            <div className="about-me-description-container">
                <div className="about-me-image-container">
                    <img className="about-me-image"
                        src={MartinImage} alt='placeholder' />
                    <p>Github: mar10fam</p>
                </div>
                <p className="about-me-description">
                    Hello everyone! I'm Martin, the Github Master for the team. I love playing sports and I'm translating that love into our incredible app TeamUp!
                    If I'm not working, you can find me in the mountains, either out on a hike or camping. On more laid back days, I'll be cozied up at home watching 
                    shows. 
                </p>
            </div>
        </div>
    )
}

export default AboutMartin;