import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const getUser = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const userData = Cookies.get('userData');
        setUser(userData);
    }, []);

    return user; 
}

export default getUser;