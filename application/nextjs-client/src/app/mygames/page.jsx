'use client'

import React, { useState, useEffect } from 'react';
import SportFilter from '@/components/SportFilter';
import GameCards from '@/components/GameCards';
import Carousel from '@/components/Carousel';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import Link from 'next/link'; 

export default function MyGames(){
    const [games, setGames] = useState([]);
    const [selectedSports, setSelectedSports] = useState([
        'Football',
        'Basketball',
        'Tennis'
    ]);

    return (
        <div>
        <NavigationBar/>
        <div className='flex flex-col items-center'>
            <div className='-mb-10'>
                <Carousel title="Joined Games">
                    {/* TEMP: CHANGE THIS AND GameCards COMPONENT ONCE  */}
                    <Link href="/detailed-game">
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