'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import '@/styles/NavigationBar.css';
import getLoggedIn from '@/hooks/GetLoggedIn';
import useLogout from '@/hooks/Logout';

const NavigationBar = () => {
  const loggedIn = getLoggedIn();

  const callLogout = useLogout();

  const logout = () => {
    callLogout();
  }

  return (
    <div className="navigation-bar navbar border-b">
      <div className="flex-1">
        <Link href="/home">
          <img className="h-10 pl-4" src="/images/Logo.png"/>
        </Link>
      </div>
      <div className="flex-none">
        {loggedIn ? (
            // user is logged in
            <ul className="menu menu-horizontal px-1 p-0">
              <li>
                <details>
                  <summary className="text-base">
                    Profile
                  </summary>
                  <ul className="p-2 bg-base-100 rounded-t-none w-48 text-base z-50">
                    <li><Link href="/profile">My Profile</Link></li>
                    <li onClick={logout}><a>Logout</a></li>

                  </ul>
                </details>
              </li>
              <li className="text-base"><Link href="/mygames">My Games</Link></li>
              <li className="create-game-button text-base rounded-md ml-3">
                <Link href="/create-game">
                  Create Game
                </Link>
              </li>
            </ul>
          ) : (
            // user is not logged in
            <ul className="menu menu-horizontal">
              <li className="login-button text-base rounded-md mr-5">
                <Link href="/authentication">
                  Login
                </Link>
              </li>
            </ul>
          )}
      </div>
    </div>
  )
}

export default NavigationBar;
