/*********************************************************************
Component: Footer
Contributors: Cole Chiodo
Description: Footer for the application that includes links to the about us 
             page and the survey page.
********************************************************************/
import React from "react";
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content bg-gray-800 text-white">
        <nav className="grid grid-flow-col gap-4">
            <Link to="/about">About us</Link>
            <Link to="/about">Survey</Link>
        </nav> 
        <nav>
            <Link to="/" className="-my-20">
                <img className="h-10 grayscale-0" src="/images/Logo.png"/>
            </Link>
        </nav> 
        <aside>
            <p className="text-center">Copyright © 2024 - All right reserved by TeamUp Inc.</p>
        </aside>
        </footer>
  )
}
