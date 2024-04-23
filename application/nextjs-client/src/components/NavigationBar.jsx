'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import '@/styles/NavigationBar.css';
import getLoggedIn from '@/hooks/GetLoggedIn';
import useLogout from '@/hooks/Logout';

const NavigationBar = () => {
  const loggedIn = getLoggedIn();
  console.log("navbar loggedIn: ", loggedIn);
  
  const callLogout = useLogout();
  const logout = () => {
    callLogout();
  }

  return (
    <div className="navbar border-b shadow bg-white">
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
                  <ul className="bg-base-100 rounded-t-none w-48 text-base z-50">
                    <li><Link href="/profile">My Profile</Link></li>
                    <li onClick={logout}><a>Logout</a></li>

                  </ul>
                </details>
              </li>
              <li className="text-base"><Link href="/mygames">My Games</Link></li>
              <div className="mt-1 ml-2 mr-2">
                <Link href="/create-game">
                  <button className="btn btn-sm text-base bg-accent text-white hover:bg-primary font-normal">
                    Create Game
                  </button>
                </Link>
              </div>
            </ul>
          ) : (
            // user is not logged in
            <div className="mr-5">
              <Link href="/authentication">
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
