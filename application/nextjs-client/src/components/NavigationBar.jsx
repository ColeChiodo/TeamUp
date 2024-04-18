'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import '@/styles/NavigationBar.css';
import { useRouter } from "next/navigation";
import { useContext } from 'react';
import UserContext from '@/components/UserContext';

const NavigationBar = () => {
  const router = useRouter();
  const context = useContext(UserContext);

  useEffect(() => {
    if(typeof window !== 'undefined' && window.localStorage) {
      const userDataString = localStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : null;

      if(userData && userData.name) {
        context.setUser(userData);
        context.setLoggedIn(true);
      }
    }
  }, []);


  return (
    <div className="navigation-bar navbar">
      <div className="flex-1">
        <Link href="/">
          <img className="h-10 pl-4" src="/images/Logo.png"/>
        </Link>
      </div>
      <div className="flex-none">
        {context.loggedIn ? (
            // user is logged in
            <ul className="menu menu-horizontal px-1 p-0">
              <li>
                <details>
                  <summary className="text-base">
                    Profile
                  </summary>
                  <ul className="p-2 bg-base-100 rounded-t-none w-48 text-base">
                    <li><a>Profile Settings</a></li>
                    <li onClick={context.logout}><a>Logout</a></li>
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
            // <Link href="/authentication">
            //   <div role="button" className="nav-profile text-lg btn btn-ghost">
            //     Login
            //   </div>
            // </Link>
          )}
      </div>
    </div>
  )
}

export default NavigationBar;
