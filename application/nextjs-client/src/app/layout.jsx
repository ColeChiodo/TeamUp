'use client'

import { Rubik } from 'next/font/google';
import "../styles/globals.css";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import UserContext from '@/components/UserContext';

const rubik_init = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-rubik'
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(''); 

  const logout = () => {
    fetch("http://localhost:3000/v1/auth/logout", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
    }).then(() => {
      // Clear data from localStorage
      localStorage.removeItem('userData');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken')
      
      setLoggedIn(false);
      setUser(null);
      router.push('/');
    })
  }

  return (
    <html lang="en">
      <body className={`${rubik_init.variable} rubik`}>
        <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser, logout }}>
          {children}
        </UserContext.Provider>
      </body>
    </html>
  );
}