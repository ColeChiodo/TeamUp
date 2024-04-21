'use client'

import '@/styles/SportCards.css';
import { SadIcon } from '@/components/Icons';

const SportCard = ({ sports }) => {
    return (
        <>
            {sports.length === 0 ? (
                <div className="sport-card">
                    <div className="sport-icon-container">
                        <div className="sport-icon"><SadIcon/></div>
                    </div>
                    <div className="sport-title">Sorry! We can't find that sport</div>
                </div> 
            ) : (
                sports.map((sport, index) => (
                    <div className="sport-card" key={index} onClick={()=>document.getElementById('my_modal_3').showModal()}>
                        <div className="sport-icon-container">
                            <div className="sport-icon">{sport.icon}</div>
                        </div>
                        <div className="sport-title">{sport.name}</div>
                    </div> 
                ))
            )}
        </>
        
    )
}

export default SportCard;

/*
<button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click on ✕ button to close</p>
  </div>
</dialog>
*/