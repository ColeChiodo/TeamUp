/*********************************************************************
Component: SportCards 
Contributors: Martin Pham
Description: This component displays all of the available sports that we offer
             at TeamUp. Users can click on the sport card to display a modal where
             they can select their self appointed skill level. Modal contains save 
             button that will save that sport and chosen skill level to their 
             preferences. 
********************************************************************/

import '../../styles/SportCards.css';
import { SadIcon } from '../Icons';
import { useState } from 'react';

const SportCard = ({ sports, myPreferences, setMyPreferences }) => {
    const skillLevels = ['New', 'Beginner', 'Intermediate', 'Expert', 'Professional'];
    const [selectedSkillLevels, setSelectedSkillLevels] = useState({});

    const handleSkillLevelSelect = (sportName, level) => {
        setSelectedSkillLevels({
            ...selectedSkillLevels,
            [sportName]: level
        });
    };

    const handleSave = (sport) => {
        if(myPreferences.find(preference => preference.name === sport.name)) {
            document.getElementById(`duplicate_sport_modal`).checked = true;
            return;
        }

        const newPreference = {
            name: sport.name,
            icon: sport.icon,
            skillLevel: selectedSkillLevels[sport.name]
        }
        setMyPreferences(prevPreferences => [...prevPreferences, newPreference])
    };

    return (
        <>
            {sports.length === 0 ? (
                <div className="sport-card">
                    <div className="sport-icon-container">
                        <div className="sport-icon"><SadIcon /></div>
                    </div>
                    <div className="sport-title">Sorry! We can't find that sport</div>
                </div> 
            ) : (
                sports.map((sport, index) => (
                    <div className="sport-card" key={index} onClick={()=>document.getElementById(`my_modal_${index}`).showModal()}>
                        <div className="sport-icon-container">
                            <div className="sport-icon">{sport.icon}</div>
                        </div>
                        <div className="sport-title">{sport.name}</div>
                        <dialog id={`my_modal_${index}`} className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>                            
                                <h3 className="font-bold text-lg">{sport.name} Skill Level</h3>
                                <div className="skill-level-buttons">
                                    {skillLevels.map((level, idx) => (
                                        <button 
                                            key={idx} 
                                            className={`skill-level-btn ${selectedSkillLevels[sport.name] === level ? 'skill-selected' : ''}`}
                                            onClick={() => handleSkillLevelSelect(sport.name, level)}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                                <form method="dialog">
                                    <button className="btn btn-neutral w-32 save-btn" onClick={() => handleSave(sport)}>Save</button>
                                </form>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div> 
                ))
            )}
            
            {/* Modal for duplicate sport */}
            <input defaultChecked={false} type="checkbox" id="duplicate_sport_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <form method="dialog">
                        <button onClick={() => {document.getElementById(`duplicate_sport_modal`).checked = false;}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>    
                    <h3 className="text-lg font-bold">Oops!</h3>
                    <p className="py-4">It looks like you've already added this sport.</p>
                </div>
                <label className="modal-backdrop" htmlFor="duplicate_sport_modal">Close</label>
            </div>
        </>
    )
}

export default SportCard;