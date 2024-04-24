'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const protectRoute = async () => {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const userData = Cookies.get('userData');
        console.log("userData in protectRoute: ", userData);
        if(!userData) {
            router.push('/authentication');
            return
        }
        setLoggedIn(true);
    }, [router]);

    return loggedIn;
};

export default protectRoute;