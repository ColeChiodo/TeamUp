import React, {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

function Team1 ({gameID, numPlayers}){
    const domain = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;
    const navigate = useNavigate();

    const [team2, setTeam2] = useState([]); 
    const [alreadyJoined, setAlreadyJoined] = useState(false);

    // fetch the team list
    useEffect(() => {
        async function fetchTeam1() {
            try {
                const response = await fetch(`${url}/game/getTeamlists/${gameID}`);
                const data = await response.json();
                setTeam2(data[1]);
            }
            catch (error) {
                console.error('Failed to fetch team list:', error);
            }
        }
        fetchTeam1();
    }, [gameID, url]);

    async function handleJoinTeam2(){
        try {
            const reqData = {
                gameId: parseInt(gameID),
                teamId: 2,
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
                body: JSON.stringify(reqData)
            };
            try {
                const response = await fetch(`${url}/game/join-team/`, options);
                if (response.status === 500){
                    console.log('Already joined team 2');
                    setAlreadyJoined(true);
                }
                const data = await response.json();
                navigate(`mygames`);
            }
            catch (error){
                console.error('Failed to join team 2:', error);
            }
        }
        catch (error) {
            console.error('Failed to join team 2:', error);
        }
    }

    return (
    <div className="overflow-x-auto p-4 min-h-64"> {/* Team 2 */}
        <label className="text-4xl font-bold" htmlFor="team2">Team 2</label>
        <button 
            onClick={handleJoinTeam2}
            className="btn btn-sm mb-2 float-right bg-primary text-white hover:bg-accent">
                Join Team 2</button>
        
        <table id="team1" className="table table-zebra border-2">
            <thead>
                <tr>
                    <th className="text-xl text-black">Players</th>
                </tr>
            </thead>
            <tbody>
                {team2?.team?.teamLists.map((teamList, index) => (
                        <tr key={index} className="border-b border-slate-300">
                            <td className="flex items-center justify-between">
                                <div className="avatar mr-2">
                                    {teamList.user.imageUrl ? (
                                        <img src={teamList.user.imageUrl} alt="Profile" className="w-8 h-8 rounded-full" />
                                    ):
                                    (
                                        <div className="w-9 h-9 rounded-full border border-black">
                                            <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" 
                                            alt=""
                                            />
                                        </div>
                                    )
                                    }
                                </div>
                                <div className="font-semibold text-lg mr-auto">
                                    {teamList.user.username}
                                </div>

                                <button className="btn btn-sm bg-slate-200 border text-slate-700 hover:bg-slate-400 hover:text-slate-50">
                                    Visit User Profile
                                </button>
                            </td>
                        </tr>
                    ))}
                {team2?.team?.teamLists.length < numPlayers / 2 && (
                    Array.from({ length: numPlayers / 2 - team2?.team?.teamLists.length }).map((_, index) => (
                        <tr key={`empty-${index}`} className="border-b border-slate-300">
                            <td className="font-semibold text-lg text-slate-400">EMPTY SLOT</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
    )
}

export default Team1;