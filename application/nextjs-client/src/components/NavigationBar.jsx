'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import '@/styles/NavigationBar.css';
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";

const NavigationBar = () => {
  const router = useRouter();
  const { user, loggedIn, setLoggedIn, setUser, logout } = useAppContext();

  /*useEffect(() => {
    if(typeof window !== 'undefined' && window.localStorage) {
      const userDataString = localStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : null;

      if(userData && userData.name) {
        console.log("Setting login as true because: userData and userData.name exist: ");
        console.log("userData: ", userData, "userData.name: ", userData.name);
        setUser(userData);
        console.log("user.name: ", user.name);
        setLoggedIn(true);
      }
    }
  }, []);
*/

  return (
    <div className="navigation-bar navbar">
      <div className="flex-1">
        <Link href="/">
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
                  <ul className="p-2 bg-base-100 rounded-t-none w-48 text-base">
                    <li><a>Profile Settings</a></li>
                    <li onClick={logout}><a>Logout</a></li>
                  </ul>
                </details>
              </li>
              <li className="text-base"><a>My Games</a></li>
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
