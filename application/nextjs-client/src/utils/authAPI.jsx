import { parseCookies } from 'nookies';


const getHeaders = () => {
  const cookies = parseCookies();
  const accessToken = cookies.accessToken;

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
};

export const register = async (userData) => {
  try {
    const response = await fetch('http://localhost:3000/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch('http://localhost:3000/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await fetch('http://localhost:3000/v1/auth/logout', {
      method: 'POST',
      headers: getHeaders(),
    });
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
