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
import GameCards from '../components/GameCards';
import Carousel from '../components/Carousel';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function MyGames(){
    // protecting the route so users not signed in can't access
    const navigate = useNavigate();
    const [user, setUser] = useState('');

    useLayoutEffect(() => {
        const userData = Cookies.get('userData');
        if(!userData) {
            navigate('/authentication');
            return
        }
        
        setUser(userData);
    }, [navigate])

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
                <link rel="icon" to="/images/TeamUp.ico" type="image/x-icon"/>
            </header>
        <NavigationBar/>
        <div className='flex flex-col gap-8 items-center'>
            <div className='-mb-10'>
                <Carousel title="Joined Games">
                    {/* TEMP: CHANGE THIS AND GameCards COMPONENT ONCE  */}
                    <Link to="/create-game">
                        <GameCards games={games} />
                    </Link>
                    
                </Carousel>
            </div>
            <div className="border-t-2 border-gray-300 w-5/6 m-auto" />
            <div className='-mt-10'>
                <Carousel title="Hosted Games">
                    {/* TEMP: CHANGE THIS AND GameCards COMPONENT ONCE  */}
                    <Link to="/create-game">
                        <GameCards games={games} />
                    </Link>
                    
                </Carousel>
            </div>
        </div>
        <Footer/>
        </div>
    );
}