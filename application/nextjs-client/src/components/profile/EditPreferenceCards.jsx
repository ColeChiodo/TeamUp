/*********************************************************************
Component: EditPreferenceCards 
Contributors: Martin Pham
Description: These cards display a users preferences and contains an X to remove 
             the preference, the sport icon, the name, skill level, and also an 
             edit button at the bottom of the card that users can click on to display
             a modal. This modal will allow users to update their skill level. 
********************************************************************/
'use client'

import '@/styles/SportCards.css'
import { useState } from 'react';
import { SadIcon } from '../Icons';

const EditPreferenceCards = ({ sports, myPreferences, setMyPreferences }) => {
    const skillLevels = ['New', 'Beginner', 'Intermediate', 'Expert', 'Professional'];
    const [selectedSkillLevels, setSelectedSkillLevels] = useState({});

    const handleSkillLevelSelect = (sportName, level) => {
        setSelectedSkillLevels({
            ...selectedSkillLevels,
            [sportName]: level
        });
    };

    const removePreference = (sportName) => {
        setMyPreferences(prevPreferences => 
            prevPreferences.filter(preference => preference.name !== sportName)
        );
    }

    const handleUpdate = (sport) => {
        const newPreferences = myPreferences.map(preference => {
            if (preference.name === sport.name) {
                return { ...preference, skillLevel: selectedSkillLevels[sport.name] };
            }
            return preference;
        });
        setMyPreferences(newPreferences);
    };

    return (
        <>
        {sports.length !== 0 ? (sports.map((sport, index) => (
            <div className="sport-card relative" key={index}>
                <button className="btn btn-sm btn-circle btn-ghost absolute top-0 right-0" onClick={() => removePreference(sport.name)}>✕</button>
                <div className="sport-icon-container">
                    <div className="sport-icon">{sport.icon}</div>
                </div>
                <div className="sport-title">{sport.name}</div>
                <div className="sport-title">{sport.skillLevel}</div>
                <div style={{ color: "blue", textDecoration: "underline" }} onClick={()=>document.getElementById(`my_pref_modal_${index}`).showModal()}>Edit</div>
                <dialog id={`my_pref_modal_${index}`} className="modal">
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
                            <button className="btn btn-neutral w-32 save-btn" onClick={() => handleUpdate(sport)}>Save</button>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div> 
        ))) : (
            <div className="sport-card relative">
                <div className="sport-icon-container">
                    <div className="sport-icon"><SadIcon /></div>
                </div>
                <div className="sport-title">None added</div>
            </div>
        )}
        </>
    )
}

export default EditPreferenceCards;