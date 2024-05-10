/*********************************************************************
Page: Detailed Game Page
Contributors: Jaycee Lorenzo
Description: Page that displayed the detailed information of a specific 
             game. The user can join a team that is available and view the 
             location of the game.
Components:
    - NavigationBar: Navigation bar for the application
    - LocationMap: Display the location of the game
    - LeftArrow: Icon for the back button
    - Footer: Footer for the application
********************************************************************/
import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import LocationMap from '../components/Location';
import { LeftArrow } from '../components/Icons';

function DetailedGame() {
    const { gameId } = useParams();
    const [gameDetails, setGameDetails] = useState(null);
    const domain = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;

    useEffect(() => {
        async function fetchGameDetails() {
            try {
                const response = await fetch(`${url}/game/${gameId}`);
                const data = await response.json();
                setGameDetails(data);
            } catch (error) {
                console.error('Failed to fetch game details:', error);
            }
        }
        fetchGameDetails();
    }, [gameId]);

    if (!gameDetails) return <div>Loading...</div>; // Or any other loading state representation

    const { name, game_location, organizer, description, date_time, imageUrl } = gameDetails;
    const gameDate = new Date(date_time).toLocaleString(); // Format the date time string to a readable format

    return (
        <div className="min-h-screen flex flex-wrap md:flex-row">
            <header>
                <title>{name}</title>
                <link rel="icon" href="/images/TeamUp.ico" type="image/x-icon" />
            </header>
            {/* Left Screen */}
            <div className="w-full md:w-5/12 border-r-4 border-slate-300">
                <div className="justify-left m-1 self-center">
                    <Link to="/home">
                        <button className="rounded-full bg-primary w-16 h-12 pl-5">
                            <LeftArrow />
                        </button>
                    </Link>
                </div>
                <div className="grid grid-rows-3 grid-flow-col gap-1 m-4 mt-0 pb-2 border-b-2 border-slate-300">
                    {/* Host Info */}
                    <div className="row-span-3 flex flex-col items-center">
                        <div className="avatar">
                            <div className="w-40 rounded-full border border-slate-300 bg-secondary flex items-center justify-center border-4">
                                <img src={organizer.imageUrl || 'https://i.pinimg.com/originals/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg'}  />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-bold">{organizer.name}</h3>
                            <p>{organizer.email}</p>
                        </div>
                    </div>

                    {/* Game Info */}
                    <div className="row-span-3">
                        <div className="text-center mt-8 mb-2 text-5xl font-bold">{name}</div>
                        <div className="text-center text-3xl">{game_location.name}</div>
                        <div className="text-center text-2xl italic">{gameDate}</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 grid-flow-col gap-2 m-4 pb-4">
                    {/* Description */}
                    <div className="row-span-3">
                        <label className="text-lg font-bold" htmlFor="desc-box">Description</label>
                        <div id="desc-box" className="w-full h-64 p-2 border rounded overflow-y-auto">
                            {description || 'No description provided.'}
                        </div>
                    </div>
                    {/* Location */}
                    <div className="row-span-3">
                        <label className="text-lg font-bold" htmlFor="loc-box">Location</label>
                        <div id="loc-box" className="w-full h-64 p-2 border rounded overflow-y-auto">
                            <LocationMap latitude={game_location.locationLatitude} longitude={game_location.locationLongitude}/>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Screen */}
            <div className="w-full md:w-7/12">
                <div className="overflow-x-auto p-4"> {/* Team 1 */}
                    <label className="text-4xl font-bold" htmlFor="team1">Team 1</label>
                    <Link href={'/mygames'}>
                    <button 
                        className="btn btn-sm mb-2 float-right bg-primary text-white hover:bg-accent">
                            Join Team 1</button>
                    </Link>
                    
                    <table id="team1" className="table table-zebra border border-2">
                        <thead>
                            <tr>
                                <th className="text-xl text-black">Players</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-300">
                                <td>Player 1</td>
                            </tr>
                            <tr className="border-b border-slate-300">
                                <td>Player 2</td>
                            </tr>
                            <tr className="border-b border-slate-300">
                                <td>Player 3</td>
                            </tr>
                            <tr className="border-b border-slate-300">
                                <td>Player 4</td>
                            </tr>
                            <tr className="border-b border-slate-300">
                                <td className="italic">Empty Slot</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="overflow-x-auto p-4"> {/* Team 2 */}
                    <label className="text-4xl font-bold" htmlFor="team2">Team 2</label>
                    <Link to='/mygames'>
                        <button 
                        className="btn btn-sm mb-2 float-right bg-primary text-white hover:bg-accent">
                            Join Team 2</button>
                    </Link>
                    
                    <table id="team1" className="table table-zebra border border-2">
                        <thead>
                            <tr>
                                <th className="text-xl text-black">Players</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-300">
                                <td>Player 5</td>
                            </tr>
                            <tr className="border-b border-slate-300">
                                <td>Player 6</td>
                            </tr>
                            <tr className="border-b border-slate-300">
                                <td>Player 7</td>
                            </tr>
                            <tr className="border-b border-slate-300">
                                <td className="italic">Empty Slot</td>
                            </tr>
                            <tr className="border-b border-slate-300">
                                <td className="italic">Empty Slot</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
)}

export default DetailedGame;