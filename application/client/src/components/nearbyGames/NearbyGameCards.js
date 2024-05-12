/*********************************************************************
Component: NearbyGamesCards 
Contributors: Martin Pham 
Description: This component displays all of the nearby game info in a card.
             These cards display the game title, time, location, description,
             host, and sport.
********************************************************************/

import '../../styles/GameCards.css';
import { Link } from 'react-router-dom';

const NearbyGameCards = ({ games, location }) => {
    function formatDateTime(date_time){
        const date = new Date(date_time);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        return `${formattedDate} @ ${formattedTime}`;
    }

    if(!location) {
        return (
            <div className="card card-compact border-2 border-rounded-xl border-slate-300 w-60 shadow-xl transition-transform transform hover:scale-105">
                <div className="bg-primary rounded-xl border-b-4 border-slate-300 rounded-b-none pt-4">
                    <div className="my-auto">
                        <h2 className="font-medium text-white p-2 text-center text-2xl">Looking for games near you...</h2>
                        <img src="/spinner.svg" className="m-auto w-16 h-16" alt="Loading" />
                    </div>
                </div>
                <div className="card-body min-h-16">
                    <h2 className="text-md font-bold text-center mx-auto">Please ensure you have your location shared</h2>
                </div>
            </div>
        )
   }

    return (
        <>
            {games.length === 0 ? (
                <div className="card card-compact border-2 border-rounded-xl border-slate-300 w-60 shadow-xl transition-transform transform hover:scale-105">
                    <div className="bg-primary rounded-xl h-40 border-b-4 border-slate-300 rounded-b-none pt-4 flex flex-col">
                        <div className="mx-auto my-auto">
                            <h2 className="font-medium text-white p-2 text-2xl">Sorry, we can't find a game near you</h2>
                        </div>
                    </div>
                    <div className="card-body min-h-16">
                        <h2 className="text-md font-bold mx-auto">Try expanding your search radius!</h2>
                    </div>
                </div>
            ) : (
                games.map((game, index) => (
                    <Link to={`/detailed-game/${game.id}`}  key={index} className="">
                        <div className="card card-compact border-2 border-rounded-xl border-slate-300 w-60 shadow-xl transition-transform transform hover:scale-105">
                            <div className="bg-primary rounded-xl h-40 border-b-4 border-slate-300 rounded-b-none pl-2 flex flex-col justify-between">
                                <div className="my-auto">
                                <h2 className="font-medium text-white text-2xl">{game.name}</h2>
                                <h3 className="text-lg text-white font-medium pb-1">Sport*</h3>
                                <h3 className="text-lg text-white font-thin">{formatDateTime(game.date_time)}</h3>
                                </div>
                                
                            </div>
                            <div className="card-body">
                                <h2 className="text-lg">Location*</h2>
                                <p className="text-sm">Number of players: {game.number_of_players}</p>
                                <p>Game Description*</p>
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </>
    )
}

export default NearbyGameCards;