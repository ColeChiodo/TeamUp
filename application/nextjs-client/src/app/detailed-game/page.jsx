'use client'

import React, { useRef, useState, useEffect, useContext } from 'react';
import GameCards from '@/components/GameCards';
import Link from 'next/link';
import LocationMap from '@/components/Location';

function DetailedGame(){
    return (
        <div className="flex flex-wrap md:flex-row">
            {/* Left Screen */}
            <div className="w-full md:w-5/12 border-r-4 border-slate-300"> 
                <div className="grid grid-rows-3 grid-flow-col gap-1 m-4 pb-2 border-b-2 border-slate-300"> {/* Game Header */}
                    {/* Host Info */}
                    <div className="row-span-3 flex flex-col items-center">
                        <div className="avatar">
                            <div className="w-40 rounded-full border border-slate-300 bg-primary flex items-center justify-center border-4">
                                <img src=""/>
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-bold">Host Username</h3>
                            <p>Host Email/Contact</p>
                        </div>
                    </div>

                    {/* Game Info */}
                    <div className="row-span-3">
                        <div className="text-center mt-8 mb-2 text-5xl font-bold">Game Title</div>
                        <div className="text-center text-3xl">Example Sport</div>
                        <div className="text-center text-2xl italic">March 20, 2025 @ 00:00 PST</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 grid-flow-col gap-2 m-4 pb-4"> {/* Game Desc & Loc */}
                    {/* Description */}
                    <div className="row-span-3">
                        <label className="text-lg font-bold" htmlFor="desc-box">Description</label>
                        <div id="desc-box" className="w-full h-64 p-2 border rounded overflow-y-auto">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                    {/* Location */}
                    <div className="row-span-3">
                        <label className="text-lg font-bold" htmlFor="desc-box">Location</label>
                        <div id="desc-box" className="w-full h-64 p-2 border rounded overflow-y-auto">
                            <LocationMap />
                        </div>
                    </div>
                    
                </div>
            </div>
            {/* Right Screen */}
            <div className="w-full md:w-7/12">
                <div className="overflow-x-auto p-4"> {/* Team 1 */}
                    <label className="text-4xl font-bold" htmlFor="team1">Team 1</label>
                    <button 
                        className="btn btn-sm mb-2 float-right bg-primary text-white hover:bg-accent">
                            Join Team 1</button>
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
                    <button 
                        className="btn btn-sm mb-2 float-right bg-primary text-white hover:bg-accent">
                            Join Team 2</button>
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