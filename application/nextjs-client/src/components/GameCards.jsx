import Link from 'next/link';
import '@/styles/Home.css';

const GameCards = ({ games }) => {
    return (
        <>
            {games.length === 0 ? (
                <Link href="/unimplemented" className="game-card">
                    <div className="top-half">
                        No games found
                    </div>
                    <div className="bottom-half">
                        Please check again soon!
                    </div>
                </Link>
            ) : (
                games.map((game, index) => (
                    <Link href="/unimplemented" key={index} className="game-card">
                        <div className="top-half">
                            {game.name}
                        </div>
                        <div className="bottom-half">
                            <div>Number of players: {game.number_of_players}</div>
                        </div>
                    </Link>
                ))
            )}
        </>
        
    )
}

export default GameCards;