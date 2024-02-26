// about page for Kotaro

import React from "react";
import "../Stylesheets/App.css";
import "../Stylesheets/About.css";
// import *Image from ./images/MemberPics/*.png
import KotaroImage from "../images/MemberPics/Kotaro.jpg";

function AboutKotaro() {
  return (
    <div className="App">
      <h1 className="title">About Kotaro Iwanaga</h1>
      <div className="about-me-description-container">
        <div className="about-me-image-container">
          <img className="about-me-image" src={KotaroImage} alt="placeholder" />
          <p>Github: iamkotaaax</p>
        </div>
        <p className="about-me-description">
          Hello! My name is Kotaro Iwanaga. I am the database admin for the
          team. I love to watch soccer and my favorite team is Real Madrid. What
          is your favorite team? If you like to play soccer, join us on TeamUp
          and let's play soccer together!
        </p>
      </div>
    </div>
  );
}

export default AboutKotaro;
