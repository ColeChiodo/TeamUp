// about page for Martin

import React from 'react'
import '../Stylesheets/About.css'
import MartinImage from '../images/MemberPics/Martin.png'

function AboutMartin(){
    return (
        <div className="App"> 
            <h1 className='title'>About Martin Pham</h1>
            <div className="about-me-description-container">
                <div className="about-me-image-container">
                    <img className="about-me-image"
                        src={MartinImage} alt='placeholder' />
                    <p>Github: mar10fam</p>
                </div>
                <p className="about-me-description">
                    Hello everyone! I'm Martin, the Github Master for the team. I love playing sports and I'm translating that love into our incredible app TeamUp!
                    If I'm not working, you can find me in the mountains, either out on a hike or camping. On more laid back days, I'll be cozied at at home watching 
                    shows. 
                </p>
            </div>
        </div>
    )
}

export default AboutMartin;