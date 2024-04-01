import React from "react";
import Link from 'next/link';
import '@/styles/NavigationBar.css';

export default function NavigationBar() {
  return (
    <div className="navigation-bar navbar bg-base-100">
      <div className="navbar-start">
        { /* filler for navbar to be structured correctly */}
      </div>
      <div className="navbar-center">
        <Link href="/">
          <img className="nav-logo" src="/images/Logo.png" />
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="nav-profile btn btn-ghost">
            Profile
          </div>
          <ul tabIndex={0} className="nav-dropdown menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Profile</a></li>
            <li><a>Create Game</a></li>
            <li><a>My Games</a></li>
            <li><a>Settings</a></li>
            <li><a>Sign Out</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
