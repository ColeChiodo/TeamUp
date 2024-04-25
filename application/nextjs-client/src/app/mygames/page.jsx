'use client'
/*********************************************************************
Page: My Games Page
Contributors: Cole Chiodo
Description: User's games page that displays the games the user has joined
             and the games the user has created. If no games are joined or 
             hosted, the game card will prompt the user to create a game.
Components:
    - GameCards: Display game cards
    - Carousel: Display a carousel of game cards
    - NavigationBar: Navigation bar for the application
    - Footer: Footer for the application
********************************************************************/
import React, { useState, useEffect, useLayoutEffect } from 'react';
import GameCards from '@/components/GameCards';
import Carousel from '@/components/Carousel';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function MyGames(){
    // protecting the route so users not signed in can't access
    const router = useRouter();
    const [user, setUser] = useState('');

    useLayoutEffect(() => {
        const userData = Cookies.get('userData');
        if(!userData) {
            router.replace('/authentication');
            return
        }
        
        setUser(userData);
    }, [router])

    const [games, setGames] = useState([]);
    const [selectedSports, setSelectedSports] = useState([
        'Football',
        'Basketball',
        'Tennis'
    ]);


    return (
        <div>
            <header>
                <title>My Games</title>
            </header>
        <NavigationBar/>
        <div className='flex flex-col items-center'>
            <div className='-mb-10'>
                <Carousel title="Joined Games">
                    {/* TEMP: CHANGE THIS AND GameCards COMPONENT ONCE  */}
                    <Link href="/create-game">
                        <GameCards games={games} />
                    </Link>
                    
                </Carousel>
            </div>
            <div className='-mt-10'>
                <Carousel title="Hosted Games">
                    {/* TEMP: CHANGE THIS AND GameCards COMPONENT ONCE  */}
                    <Link href="/create-game">
                        <GameCards games={games} />
                    </Link>
                    
                </Carousel>
            </div>
        </div>
        <Footer/>
        </div>
    );
}