'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import '@/styles/NavigationBar.css';
import { useRouter } from "next/navigation";

export default function NavigationBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const router = useRouter();

  const logout = () => {
    fetch("http://localhost:3000/v1/auth/logout")
    .then(() => {
      // Clear data from localStorage
      localStorage.removeItem('userData');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken')
      
      setLoggedIn(false);
      router.push('/home');
    })
  }

  useEffect(() => {
    if(typeof window !== 'undefined' && window.localStorage) {
      const userDataString = localStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : null;

      if(userData && userData.name) {
        setUser(userData);
        setLoggedIn(true);
      }
    }
  }, []);

  return (
    <div className="navigation-bar navbar bg-base-100">
      <div className="navbar-start">
        {loggedIn ? (
          // user is logged in
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="nav-profile text-lg btn btn-ghost">
              Profile
            </div>
            <ul tabIndex={0} className="nav-dropdown menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Profile</a></li>
              <li><a>Create Game</a></li>
              <li><a>My Games</a></li>
              <li><a>Settings</a></li>
              <li onClick={logout}><a>Sign Out</a></li>
            </ul>
          </div>
        ) : (
          // user is not logged in
          <Link href="/authentication">Login</Link>
        )}
      </div>
      <div className="navbar-center">
        <Link href="/">
          <img className="nav-logo" src="/images/Logo.png" />
        </Link>
      </div>
      <div className="navbar-end">
        { /* filler for navbar to be structured correctly */}
      </div>
    </div>
  )
}
