'use client'

import '@/styles/Home.css';
import React, { useRef, useState, useEffect, useContext } from 'react';
import '@/styles/CreateGame.css';
import GameCards from '@/components/GameCards';
import Link from 'next/link';

function CreateGame(){
    return (
        <div className="w-2/3 p-6 mx-auto bg-white rounded-lg shadow-md border flex flex-col mt-3">
        <p className="text-4xl font-bold mb-4 place-self-center">Create Game</p>
        <form class="place-self-center w-5/6">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-game-title">
                        Title
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-game-title" type="text" placeholder="Game Title"/>
                    {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-time">
                        Time
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-time" type="text" placeholder="MM/DD/YYYY"/>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-sport">
                        Sport
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-sport" type="text" placeholder="Sport"/>
                    {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-location">
                        Location / Address
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-location" type="text" placeholder="123 Main St."/>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-description">
                        Description
                    </label>
                    <textarea class="appearance none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-56" id="grid-description" type="text" placeholder="Enter game details here"/>
                </div>
                
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-number-of-players">
                        Number Of Players
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-number-of-players" type="text" placeholder="10"/>
                    <div className="flex justify-center mt-6 ">
                        <button className="publish-button btn mr-4 text-lg text-white" type="button">Publish</button>
                        <button className="btn btn-error text-lg" type="button">
                            <Link href="/home" className="text-white">Cancel</Link>
                        </button>
                    </div>
                </div>
            </div>
            </form>
        </div>
    )
}

export default CreateGame;