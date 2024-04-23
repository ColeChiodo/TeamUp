'use client'

import '@/styles/SportCards.css'

const MyPreferences = ({ sports, setMyPreferences }) => {

    const removePreference = (sportName) => {
        setMyPreferences(prevPreferences => 
            prevPreferences.filter(preference => preference.name !== sportName)
        );
    }

    return (
        <>
        {sports.map((sport, index) => (
            <div className="sport-card relative" key={index}>
                <button className="btn btn-sm btn-circle btn-ghost absolute top-0 right-0" onClick={() => removePreference(sport.name)}>✕</button>
                <div className="sport-icon-container">
                    <div className="sport-icon">{sport.icon}</div>
                </div>
                <div className="sport-title">{sport.name}</div>
                <div className="sport-title">{sport.skillLevel}</div>
            </div>
        ))}
        </>
    )
}

export default MyPreferences;