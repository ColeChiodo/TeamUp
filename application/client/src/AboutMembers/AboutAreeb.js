// about page for Areeb

import React from 'react'
import '../Stylesheets/App.css'
import '../Stylesheets/About.css'
import Image from "../images/MemberPics/areeb.png"

function AboutAreeb(){
    return (
        <div className="App"> 
            <h1 className='title'>Areeb Abbasi</h1>
            <div className="about-me-description-container">
                <div className="about-me-image-container">
                    <img className="about-me-image"
                        src={Image} alt='placeholder' />
                    <p>Github: areeeeb</p>
                </div>
                <p className="about-me-description">
                    Hello. I'm Areeb. I'm a grad student at San Francisco State University. I'm passionate about software development and I'm excited to be working on the backend of the project. I'm also a big soccer fan (Visca Barca!) and I love to play FIFA in my free time.
                </p>
            </div>
        </div>
    )
}

export default AboutAreeb;