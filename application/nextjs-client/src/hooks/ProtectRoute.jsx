'use client'

import { useEffect } from 'react';
import getLoggedIn from '@/hooks/GetLoggedIn'; 
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const protectRoute = async () => {
    const router = useRouter();
    
    useEffect(() => {
        const userData = Cookies.get('userData');

        if(!userData) {
            router.push('/authentication');
            return
        }
    }, [router]);
};

export default protectRoute;