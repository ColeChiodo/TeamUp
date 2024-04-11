import React from "react";
import Link from 'next/link';
import '@/styles/NavigationBar.css';

export default function SimpleNavbar() {
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
        { /* filler for navbar to be structured correctly */}
      </div>
    </div>
  )
}
