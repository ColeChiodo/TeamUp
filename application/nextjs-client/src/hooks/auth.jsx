import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import Cookies from 'js-cookie';
import { login, logout } from '@/utils/authAPI';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const loginHandler = async (credentials) => {
    try {
      const data = await login(credentials);
      setUser(data.user);
      // Store tokens in cookies
      setCookie(null, 'accessToken', data.tokens.access.token);
      setCookie(null, 'refreshToken', data.tokens.refresh.token);
      // Redirect to dashboard or other page
      router.push('/home');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logoutHandler = async () => {
    try {
      await logout();
      setUser(null);
      // Remove tokens from cookies
      destroyCookie(null, 'accessToken');
      destroyCookie(null, 'refreshToken');
      // Redirect to login page
      router.push('/home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    // Check if user is logged in on initial load
    const cookies = parseCookies();
    const accessToken = cookies.accessToken;
    if (accessToken) {
      // You may want to validate the access token here
      setUser(JSON.parse(Cookies.get('user')));
    }
  }, []);

  return { user, login: loginHandler, logout: logoutHandler };
};
