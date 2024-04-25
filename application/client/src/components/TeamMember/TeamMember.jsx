// components/TeamMember.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './about.css';

const TeamMember = ({ name, image, bio, githubUsername }) => (
  <div className="App">
    <div className="header">
      <Link to="/about">
        <div className="back-icon-container">
          <FontAwesomeIcon icon={faChevronLeft} className="back-icon" size="2xl"/>
        </div>
      </Link>
      <h1 className="title">About {name}</h1>
    </div>
    <div className="about-me-description-container">
      <div className="about-me-image-container">
        <img className="about-me-image" src={image} alt={name} />
        <p>Github: {githubUsername}</p>
      </div>
      <p className="about-me-description">{bio}</p>
    </div>
  </div>
);

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  githubUsername: PropTypes.string.isRequired,
};

export default TeamMember;
