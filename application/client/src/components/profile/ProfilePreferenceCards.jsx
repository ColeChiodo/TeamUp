/*********************************************************************
Component: ProfilePreferenceCards
Contributors: Martin Pham
Description: These are cards shown in profile that will not display a modal
             when clicked on. It is only for viewing purposes for the user
             to see their preferences.
********************************************************************/

import '../../styles/SportCards.css'

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