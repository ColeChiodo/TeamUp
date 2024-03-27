import React from 'react';
import { Link } from 'react-router-dom';
import '../Stylesheets/Navigation.css';
import Logo from '../images/Logo.png';


// function to toggle the dropdown
function activeDropdown(){
  let profileButton = document.querySelector("#profile");
  let dropdown = document.querySelector("#profile-dropdown");
  // check if the dropdown is already active
  if(dropdown.classList.contains("active") || profileButton.classList.contains("active")){
    dropdown.classList.remove("active");
    profileButton.classList.remove("active");
    return;
  }

  dropdown.classList.add("active");
  profileButton.classList.add("active");
}

function goHome(){
  window.location.href = "/";
}
// function to switch the navigation bar based on if the user is logged in
let isLoggedIn = true;
function switchNavigationBar(){
  if(isLoggedIn){
    return (
      <div>
        <div id="profile" onClick={activeDropdown}>Profile</div>
        <div id="profile-dropdown">
          <ul id="dropdown-content">
            <li className="dropdown-item" onClick={goHome}>Profile</li>
            <li className="dropdown-item" onClick={goHome}>Create Game</li>
            <li className="dropdown-item" onClick={goHome}>My Games</li>
            <li className="dropdown-item" onClick={goHome}>Settings</li>
            <li className="dropdown-item" onClick={goHome}>Sign Out</li>
          </ul>
          
        </div>
      </div> // end of profile
    )
    
  } else{
    return <div className="login">Login/Sign up</div>
  }
}

function NavigationBar() {
  return (
    <nav>
      <span id="center-logo">
        <Link to="/"> <img src={Logo} className="nav-bar-logo" alt="logo"></img></Link>
      </span>
      {switchNavigationBar()}
    </nav>
  );
}

export default NavigationBar;