'use client'

import { useContext, createContext, useState } from "react";
import { useRouter } from 'next/navigation';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const router = useRouter();
  let [loggedIn, setLoggedIn] = useState(false);
  let [user, setUser] = useState('');
  
  const logout = () => {
      fetch("http://localhost:3000/v1/auth/logout", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem('refreshToken')
        }) 
      }).then(() => {
        // Clear data from localStorage
        localStorage.removeItem('userData');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken')
        
        setLoggedIn(false);
        setUser('');
        router.push('/');
      })
  }

  return (
      <AppContext.Provider value={{
          loggedIn,
          setLoggedIn,
          user,
          setUser,
          logout
      }}>
          {children}
      </AppContext.Provider>
  )
}

export function useAppContext() {
    return useContext(AppContext);
}