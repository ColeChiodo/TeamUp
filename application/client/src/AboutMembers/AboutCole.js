// about page for Cole

import React from 'react'
import '../Stylesheets/App.css'
import '../Stylesheets/About.css'
import ColeImage from '../images/MemberPics/Cole.png'

function AboutCole(){
    return (
        <div className="App"> 
            <h1 className='title'>About Cole Chiodo</h1>
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