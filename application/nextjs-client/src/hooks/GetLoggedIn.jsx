import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const getLoggedIn = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const userData = Cookies.get('userData');
        setLoggedIn(!!userData); // convert userData to a boolean
        console.log("userData: ", userData, "boolean userData: ", !!userData);
    }, []);

    return loggedIn; 
}

export default getLoggedIn;
