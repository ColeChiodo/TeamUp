// about page for Areeb

import React from 'react'
import '../Stylesheets/App.css'
import '../Stylesheets/About.css'
// import *Image from ./images/MemberPics/*.png

function AboutAreeb(){
    return (
        <div className="App"> 
            <h1 className='title'>About FIRSTNAME LASTNAME</h1>
            <div className="about-me-description-container">
                <div className="about-me-image-container">
                    <img className="about-me-image"
                        src={'x'} alt='placeholder' />
                    <p>Github: x</p>
                </div>
                <p className="about-me-description">
                    DESCRIPTION HERE lorem ipsum dolor sit amet, consectetur adipiscing elit.DESCRIPTION HERE lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    DESCRIPTION HERE lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>
        </div>
    )
}

export default AboutAreeb;