/*********************************************************************
Component: Simple Navigation Bar
Contributors: Martin Pham, Jaycee Lorenzo
Description: Simple navigation bar for the application that includes the logo
********************************************************************/
import React from "react";
import '../styles/NavigationBar.css';
import { useNavigate } from "react-router-dom";

export default function SimpleNavbar() {
  const navigate = useNavigate();

  return (
    <div className="navigation-bar navbar">
      <div className="navbar-start">
        { /* filler for navbar to be structured correctly */}
      </div>
      <div className="navbar-center">
        <img className="nav-logo" src="/images/Logo.png" style={{cursor: 'pointer'} }onClick={() => navigate('/')}/>
      </div>
      <div className="navbar-end">
        { /* filler for navbar to be structured correctly */}
      </div>
    </div>
  )
}
