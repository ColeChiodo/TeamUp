import React from 'react'
import {Link } from 'react-router-dom';
import './Stylesheets/App.css'

function teamMemberList({teamMembers}){
    return (
        <div className="App"> 
            <h1 className='title'>About Page</h1>
            <div className='avatar-container'>

                <div className='member-container'>
                    <Link to='/about/juan'>
                    <img className='avatar'
                        src={teamMembers[0].imageUrl} alt='placeholder' />
                    </Link>
                    <p><strong>{teamMembers[0].role}</strong></p>
                    <p>{teamMembers[0].name}</p>
                </div>

                <div className='member-container'>
                <Link to='/about/areeb'>
                    <img className='avatar'
                        src={teamMembers[1].imageUrl} alt='placeholder' />
                </Link>
                <p><strong>{teamMembers[1].role}</strong></p>
                <p>{teamMembers[1].name}</p>
                </div>

                <div className='member-container'>
                <Link to='/about/martin'>
                    <img className='avatar'
                        src={teamMembers[2].imageUrl} alt='placeholder' />
                </Link>
                <p><strong>{teamMembers[2].role}</strong></p>
                <p>{teamMembers[2].name}</p>
                </div>

                <div className='member-container'>
                <Link to='/about/cole'>
                    <img className='avatar'
                        src={teamMembers[3].imageUrl} alt='placeholder' />
                </Link>
                <p><strong>{teamMembers[3].role}</strong></p>
                <p>{teamMembers[3].name}</p>
                </div>

                <div className='member-container'>
                <Link to='/about/kotaro'>
                    <img className='avatar'
                        src={teamMembers[4].imageUrl} alt='placeholder' />
                </Link>
                <p><strong>{teamMembers[4].role}</strong></p>
                <p>{teamMembers[4].name}</p>
                </div>

                <div className='member-container'>
                <Link to='/about/jaycee'>
                    <img className='avatar'
                        src={teamMembers[5].imageUrl} alt='placeholder' />
                </Link>
                <p><strong>{teamMembers[5].role}</strong></p>
                <p>{teamMembers[5].name}</p>
                </div>
                
            </div>
        </div>
        
    )
}

export default teamMemberList;