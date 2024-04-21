import React from "react";
import '@/styles/NavigationBar.css';
import { useRouter } from 'next/navigation';

export default function SimpleNavbar() {
  const router = useRouter();

  return (
    <div className="navigation-bar navbar bg-base-100">
      <div className="navbar-start">
        { /* filler for navbar to be structured correctly */}
      </div>
      <div className="navbar-center">
        <img className="nav-logo" src="/images/Logo.png" style={{cursor: 'pointer'} }onClick={() => router.push('/')}/>
      </div>
      <div className="navbar-end">
        { /* filler for navbar to be structured correctly */}
      </div>
    </div>
  )
}
