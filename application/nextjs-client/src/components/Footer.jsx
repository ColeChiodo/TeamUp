

import React from "react";
import Link from 'next/link';

export default function NavigationBar() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content bg-gray-800 text-white">
        <nav className="grid grid-flow-col gap-4">
            <Link href="/about">About us</Link>
            <Link href="/about">Survey</Link>
        </nav> 
        <nav>
            <Link href="/" className="-my-20">
                <img className="h-10 grayscale-0" src="/images/Logo.png"/>
            </Link>
        </nav> 
        <aside>
            <p>Copyright © 2024 - All right reserved by TeamUp Inc.</p>
        </aside>
        </footer>
  )
}
