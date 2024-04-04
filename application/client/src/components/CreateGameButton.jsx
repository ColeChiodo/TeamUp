import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Stylesheets/CreateGameButton.css';

const CreateGameButton = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/unimplemented');
    }
    return (
        <button className="create-game-button" onClick={handleClick}>
            Create Game
        </button>
    );
}

export default CreateGameButton;