// about page for Jaycee

import React from 'react'
import '../Stylesheets/About.css'
import JayceeImage from '../images/MemberPics/Jaycee.png'

function AboutJaycee(){
    return (
        <div className="App"> 
            <h1 className='title'>About Jaycee Lorenzo</h1>
            <div className="about-me-description-container">
                <div className="about-me-image-container">
                    <img className="about-me-image"
                        src={JayceeImage} alt='placeholder' />
                    <p>Github: jclorenz0</p>
                </div>
                <p className="about-me-description">
                    DESCRIPTION HERE lorem ipsum dolor sit amet, consectetur adipiscing elit.DESCRIPTION HERE lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    DESCRIPTION HERE lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>
        </div>
    )
}
export default AboutJaycee;