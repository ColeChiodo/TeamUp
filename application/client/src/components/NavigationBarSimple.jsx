import React from 'react';
import { Link } from 'react-router-dom';
import '../Stylesheets/Navigation.css';
import Logo from '../images/Logo.png';

// for the simple navigation bar with no profile dropdown
function NavigationBarSimple() {
  return (
    <nav>
      <span id="center-logo-simple">
        <Link to="/"> <img src={Logo} className="nav-bar-logo" alt="logo"></img></Link>
      </span>
    </nav>
  );
}

export default NavigationBarSimple;