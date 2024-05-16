import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

function Team1 ({gameID, numPlayers}){
    const domain = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;
    const navigate = useNavigate();

    const [team2, setTeam2] = useState([]); 
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
        async function fetchTeam2() {
            try {
                const response = await fetch(`${url}/game/getTeamlists/${gameID}`);
                const data = await response.json();
                setTeam2(data[1]);
            }
            catch (error) {
                console.error('Failed to fetch team list:', error);
            }
        }
        fetchTeam2();
    }, [gameID, url ]);

    async function handleJoinTeam1(){
        if (user !== ''){ // check if user is logged in
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
                    // const data = await response.json();
                    window.location.reload();
                }
                catch (error){
                    console.error('Failed to join team 2:', error);
                }
            }
            catch (error) {
                console.error('Failed to join team 2:', error);
            }
        }
        else {
            console.log('User not logged in');
            document.getElementById('loginmodal').showModal();
        }
    }

    async function handleLeaveTeam1(){
        console.log('leaving team 2');
        try {
            const reqData = {
                gameId: parseInt(gameID),
                teamId: parseInt(team2.team_id),
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
                const response = await fetch(`${url}/game/detach/${user.id}`, options);
                if (response.status === 500){
                    console.log('Already left team 1');
                    setAlreadyJoined(false);
                }
                // const data = await response.json();
                window.location.reload();
            }
            catch (error){
                console.error('Failed to leave team 1:', error);
            }
        } catch (error) {
            console.error('Failed to leave team 1:', error);
        }
    }

    return (
    <div className="overflow-x-auto p-4 min-h-64"> {/* Team 2 */}

    <dialog id="loginmodal" className="modal"> {/* Login Modal that appears when user is not logged in */}
        <div className="modal-box bg-primary h-48 border-slate-600 border">
        <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
            <h3 className="font-bold text-2xl text-white">Cannot Join Game</h3>
            <p className="pt-2 text-white">Please login or create an account to join teams.</p>
            <div className="flex justify-end pt-4">
                <Link to="/login" className="btn btn-success text-white mr-2">Login / Register</Link>
                <Link to="/home" className="btn btn-neutral text-black">Back to Home</Link>
            </div>
            <div className="flex justify-end mt-2">
                <p className="text-xs font-semibold text-white">Press ESC key, click on 'x' button, or click outside to close</p>
            </div>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>

        <label className="text-4xl font-bold" htmlFor="team2">Team 2</label>
        {alreadyJoined ? (
                <button 
                onClick={handleLeaveTeam1}
                className="btn btn-sm btn-error mb-2 float-right text-white">
                    Leave Team 2
            </button>
        ) : (
            <button 
            onClick={handleJoinTeam1}
            className="btn btn-sm mb-2 float-right bg-primary text-white hover:bg-accent">
                Join Team 2
        </button>
        )}
        
        <table id="team1" className="table table-zebra border-2 border-slate-300">
            <thead>
                <tr>
                    <th className="text-xl text-black border-b-2 border-b-slate-300">Players</th>
                </tr>
            </thead>
            <tbody>
            {team2?.team?.teamLists.map((teamList, index) => {
        const isCurrentUser = teamList.user.id === user.id;
        if (isCurrentUser && !alreadyJoined) {
            setAlreadyJoined(true); // Update state when the current user is found in the list and not already joined
        }
        return (
            <tr key={index} className="border-b border-slate-300">
                <td className="flex items-center justify-between">
                    <div className="avatar mr-2">
                        {teamList.user.imageUrl ? (
                            <img src={teamList.user.imageUrl} alt="Profile" className="w-8 h-8 rounded-full" />
                        ) : (
                            <div className="w-9 h-9 rounded-full border border-black">
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="" />
                            </div>
                        )}
                    </div>
                    <div className="font-semibold text-lg mr-auto">
                        {teamList.user.username}
                    </div>
                    {isCurrentUser ? (
                        <span className="text-lg italic text-slate-700 font-medium mr-12">You</span>
                    ) : (
                        <button 
                            className="btn btn-sm btn-neutral text-slate-700"
                            onClick={() => navigate(`/view-profile/${teamList.user.id}`)}
                        >
                            Visit User Profile
                        </button>
                    )}
                </td>
            </tr>
        );
    })}
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