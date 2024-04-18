'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import '@/styles/NavigationBar.css';
import { useRouter } from "next/navigation";
import { UserData } from '@/app/home/layout';

interface NavigationBarProps {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  setUser: (userData: UserData) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ loggedIn, setLoggedIn, logout, setUser }) => {
  const router = useRouter();

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

export default NavigationBar;
