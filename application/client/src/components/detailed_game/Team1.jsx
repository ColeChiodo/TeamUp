import React, {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

function Team1 ({gameID, numPlayers}){
    const domain = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;
    const navigate = useNavigate();

    const [team1, setTeam1] = useState([]); 
    const [user, setUser] = useState('');
    const [alreadyJoined, setAlreadyJoined] = useState(false);

    useEffect(() => {
        const userData = Cookies.get('userData');
        if(!userData) {
            return
        }
        setUser(JSON.parse(userData));
    }, [navigate]);


    // fetch the team list
    useEffect(() => {
        async function fetchTeam1() {
            try {
                const response = await fetch(`${url}/game/getTeamlists/${gameID}`);
                const data = await response.json();
                setTeam1(data[0]);
                console.log(team1);
            }
            catch (error) {
                console.error('Failed to fetch team list:', error);
            }
        }
        fetchTeam1();
    }, [gameID, url]);

    async function handleJoinTeam1(){
        try {
            const reqData = {
                gameId: parseInt(gameID),
                teamId: 1,
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
                    console.log('Already joined team 1');
                    setAlreadyJoined(true);
                }
                const data = await response.json();
                navigate(`/mygames`);
            }
            catch (error){
                console.error('Failed to join team 1:', error);
            }
        }
        catch (error) {
            console.error('Failed to join team 1:', error);
        }
    }

    return (
    <div className="overflow-x-auto p-4 min-h-64"> {/* Team 1 */}
        <label className="text-4xl font-bold" htmlFor="team1">Team 1</label>
        <button 
            onClick={handleJoinTeam1}
            className="btn btn-sm mb-2 float-right bg-primary text-white hover:bg-accent">
                Join Team 1</button>
        
        <table id="team1" className="table table-zebra border-2 border-slate-300">
            <thead>
                <tr>
                    <th className="text-xl text-black border-b-2 border-b-slate-300">Players</th>
                </tr>
            </thead>
            <tbody>
                {team1?.team?.teamLists.map((teamList, index) => (
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
                                {teamList.user.id === user.id ? (
                                    <span className="text-lg italic text-slate-700 font-medium mr-12">You</span>
                                ) : (
                                    <button 
                                        className="btn btn-sm bg-slate-200 border-primary text-slate-700 hover:bg-slate-400 hover:text-slate-50"
                                        onClick={() => navigate(`/view-profile/${teamList.user.id}`)}
                                        >
                                        Visit User Profile
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                {team1?.team?.teamLists.length < numPlayers / 2 && (
                    Array.from({ length: numPlayers / 2 - team1?.team?.teamLists.length }).map((_, index) => (
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