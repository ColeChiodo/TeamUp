/*********************************************************************
Component: GamesCards 
Contributors: Martin Pham, Jaycee Lorenzo
Description: This component displays all of the game info in a card.
             These cards display the game title, time, location, description,
             host, and sport.
********************************************************************/

import '../styles/GameCards.css';
import { Link } from 'react-router-dom';

const GameCards = ({ games }) => {
    // console.log(games);
    function formatDateTime(date_time){
        const date = new Date(date_time);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        return `${formattedDate} @ ${formattedTime}`;
    }
    return (
        <>
            {games.length === 0 ? (
                <Link to="/create-game">
                    <div className="card card-compact border-2 border-rounded-xl border-slate-300 w-60 shadow-xl transition-transform transform hover:scale-105">
                        <div className="bg-primary rounded-xl h-40 border-b-4 border-slate-300 rounded-b-none pt-4 flex flex-col">
                            <div className="mx-auto my-auto">
                            <h2 className="font-medium text-white text-2xl">No games found</h2>
                            
                            </div>
                            
                        </div>
                        <div className="card-body min-h-16">
                            <h2 className="text-md font-bold mx-auto">Click here to create a game</h2>
                            
                        </div>
                    </div>
                </Link>
            ) : (
                games.map((game, index) => (
                    <Link to={`/detailed-game/${game.id}`}  key={index} className="">
                        <div className="card card-compact border-2 border-rounded-xl border-slate-300 w-60 shadow-xl transition-transform transform hover:scale-105">
                            <div className="bg-primary rounded-xl h-40 border-b-4 border-slate-300 rounded-b-none pl-2 flex flex-col justify-between">
                                <div className="my-auto">
                                <h2 className="font-medium text-white text-2xl">{game.name}</h2>
                                <h3 className="text-lg text-white font-medium pb-1">
                                    {typeof game.sport === 'object' && game.sport.name ? game.sport.name : game.sport}
                                </h3>
                                <h3 className="text-lg text-white font-thin">{formatDateTime(game.date_time)}</h3>
                                </div>
                                
                            </div>
                            <div className="card-body overflow-y-scroll">
                                <h2 className="text-lg">
                                    {typeof game.game_location === 'object' ? `${game.game_location.address} @ ${game.game_location.name}` : `Location`}
                                </h2>
                                <p className="text-sm">Number of players: {game.number_of_players}</p>
                                <p>{game.description}</p>
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </>
    )
}

export default GameCards;