import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../Stylesheets/Navigation.css';
import Logo from '../images/Logo.png';
import UserIcon from '../components/UserIcon';
import CheckToken from './CheckToken';

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


// links to unimplemented pages
function unimplemented(){
  window.location.href = "/unimplemented";
}

const NavigationBar = ({isLoggedIn, onLogout, userInfo, setUserInfo, handleLogin}) => {

  useEffect(() => {
    if (CheckToken()){
      handleLogin();
      console.log("Token is valid");
    }
  }, [handleLogin]);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        name: storedName
      }));
      console.log("Name is set to: " + storedName);
    } else {
      localStorage.setItem('name', userInfo.name);
    }
  }, [setUserInfo, userInfo.name]);

  // function to switch the navigation bar based on if the user is logged in
  function switchNavigationBar(){
    if(isLoggedIn){
      return (
        <div>
          <div id="profile" onClick={activeDropdown}>Profile</div>
          <div id="profile-dropdown">
            <ul id="dropdown-content">
              <li className='dropdown-item-name'>
                <span id='user-icon-name'>
                  <span id='profile-icon'>
                    <UserIcon/>
                  </span>
                  {userInfo.name}
                </span>
              </li>
              <li className="dropdown-item" onClick={unimplemented}>Profile</li>
              <li className="dropdown-item" onClick={unimplemented}>Create Game</li>
              <li className="dropdown-item" onClick={unimplemented}>My Games</li>
              <li className="dropdown-item" onClick={unimplemented}>Settings</li>
              <li className="dropdown-item" onClick={onLogout}>Sign Out</li>
            </ul>
            
          </div>
        </div> // end of profile
      )
    } else{
      return (
        <Link to='/authentication' className='login-nav'>
          <div>
            Login/Sign Up
          </div>
        </Link>
      )
    }
  }

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