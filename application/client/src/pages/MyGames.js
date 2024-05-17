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
    const domain = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;
    // protecting the route so users not signed in can't access
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    

    useEffect(() => {
        const userData = Cookies.get('userData');
        if(!userData) {
            navigate('/authentication');
            return
        }
        
        setUser(JSON.parse(userData));
        console.log(user);
    }, [navigate]);

    const [joinedGameList, setJoinedGameList] = useState([]);
    const [hostedGames, setHostedGames] = useState([]);
    const [selectedSports, setSelectedSports] = useState([
        'Football',
        'Basketball',
        'Tennis'
    ]);

    useEffect(() => {
        async function fetchJoinedGames(){  // fetches the games the user has joined
            try {
                if (!user || !user.id){return;}
                const options = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                        'Content-Type': 'application/json',
                    }
                }
                const response = await fetch(`${url}/users/getJoinedGames/${user.id}`, options);
                const data = await response.json();
                const games = [];
                for (let i = 0; i < data[0].teamLists.length; i++){
                    games.push(data[0].teamLists[i].team.games[0].game);
                }
                setJoinedGameList(games);
            } catch (error){
                console.error('Failed to fetch my games:', error);
            }
        }
        async function fetchHostedGames(){  // fetches the games the user has joined
            try {
                if (!user || !user.id){return;}
                const options = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                        'Content-Type': 'application/json',
                    }
                }
                const response = await fetch(`${url}/users/getJoinedGames/${user.id}`, options);
                const data = await response.json();

                const games = [];
                for (let i = 0; i < data[0].teamLists.length; i++){
                    games.push(data[0].teamLists[i].team.games[0].game);
                }
                setHostedGames(games);
            } catch (error){
                console.error('Failed to fetch my games:', error);
            }
        }
        /*
        async function fetchHostedGames(){ // fetches the games the user has hosted
            try {
                if (!user || !user.id){return;}
                const options = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                        'Content-Type': 'application/json',
                    }
                }
                const response = await fetch(`${url}/users/getHostedGames/${user.id}`, options);
                const data = await response.json();
                const hostedGames = [];
                for (let i = 0; i < data[0].organizedGames.length; i++){
                    hostedGames.push(data[0].teamLists[i].team.games[0].game);
                    console.log(data[0].teamLists[i].team.games[0].game);
                }
                setHostedGames(hostedGames);
            } catch (error){
                console.error('Failed to fetch my hosted games:', error);
            }
        }*/

        fetchJoinedGames();
        fetchHostedGames();
    }, [url, user]);

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
                    <GameCards games={joinedGameList} />
                </Carousel>
            </div>
            <div className="border-t-2 border-gray-300 w-5/6 m-auto" />
            <div className='-mt-10'>
                <Carousel title="Hosted Games">
                    {/* TEMP: CHANGE THIS AND GameCards COMPONENT ONCE  */}
                    <GameCards games={hostedGames} />
                </Carousel>
            </div>
        </div>
        <Footer/>
        </div>
    );
}