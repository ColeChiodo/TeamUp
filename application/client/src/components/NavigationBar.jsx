'use client'
/*********************************************************************
Component: NavigationBar
Contributors: Jaycee Lorenzo, Martin Pham
Description: Navigation bar for the application that includes links to the
             user's profile, the user's games, and the create game page. If the
             user is not logged in, the navigation bar will display a login button.
********************************************************************/
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavigationBar.css';
import Cookies from 'js-cookie';

const NavigationBar = () => {  
  const url = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_VERSION}`
  const navigate = useNavigate();

  const logout = () => {
    fetch(`${url}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refreshToken: Cookies.get('refreshToken')
        })
    }).then(() => {
        // delete cookies
        Cookies.remove('userData');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        navigate('/');
    })
};

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
      const userData = Cookies.get('userData');
      setLoggedIn(!!userData); 
  }, []);


  return (
    <div className="navigation-bar navbar border-b">
      <div className="flex-1">
        <Link to="/home">
          <img className="h-10 pl-4" src="/images/Logo.png"/>
        </Link>
      </div>
      <div className="">
        {loggedIn ? (
            // user is logged in
            <ul className="menu menu-horizontal px-1 p-0 pt-4">
              <li>
                <details>
                  <summary className="text-base">
                    Profile
                  </summary>
                  <ul className="bg-base-100 rounded-t-none w-48 text-base z-50">
                    <li><Link to="/profile">My Profile</Link></li>
                    <li onClick={logout}><a>Logout</a></li>

                  </ul>
                </details>
              </li>
              <li className="text-base"><Link href="/mygames">My Games</Link></li>
              <div className="mt-1 ml-2 mr-2">
                <Link to="/create-game">
                  <button className="btn btn-sm text-base bg-accent text-white hover:bg-primary font-normal">
                    Create Game
                  </button>
                </Link>
              </div>
            </ul>
          ) : (
            // user is not logged in
            <div className="mr-5">
              <Link to="/login">
                <button className="btn btn-md w-28 text-lg font-normal bg-accent text-white hover:bg-primary">
                  Login
                </button>
              </Link>
            </div>
          )}
      </div>
    </div>
  )
}

export default NavigationBar;
