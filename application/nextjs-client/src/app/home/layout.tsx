'use client'

import NavigationBar from "@/components/NavigationBar"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
}

type LogoutFunction = () => void;

type SetUserFunction = (userData: UserData) => void;

export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<UserData | null>(null); 

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
        <section>
            <NavigationBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} logout={logout} setUser={setUser} />
            {children}
        </section>
    )
}