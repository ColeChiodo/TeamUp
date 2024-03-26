// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Stylesheets/Navigation.css'
import Logo from '../images/Logo.png';

function NavigationBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="right-content">
        <Link to="/authentication">Sign In</Link>
      </div>
    </nav>
  );
}

export default NavigationBar;