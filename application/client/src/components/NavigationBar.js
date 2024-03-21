// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Stylesheets/Navigation.css'

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li className='project-name'><Link to ="/">TeamUp</Link></li>
        <li><Link to="/">About</Link></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;