'use client'

import '@/styles/SportCards.css'

const ProfilePreferenceCards = ({ sports }) => {


    return (
        <>
        {sports.map((sport, index) => (
            <div className="sport-card relative" key={index}>
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

export default ProfilePreferenceCards;