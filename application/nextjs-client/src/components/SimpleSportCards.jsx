'use client'

import '@/styles/SportCards.css'

const SimpleSportCards = ({ sports }) => {

    return (
        <>
        {sports.map((sport, index) => (
            <div className="sport-card" key={index}>
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

export default SimpleSportCards;