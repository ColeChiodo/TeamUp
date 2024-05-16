/*********************************************************************
Page: About Page
Contributors: Jaycee Lorenzo, Martin Pham
Description: This page displays the team members of the project and their roles.
             Clicking on a team member will redirect the user to the team member's page.
Components:
********************************************************************/

import '../styles/About.css';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <>
        <header>
            <title>About TeamUp</title>
            <link rel="icon" href="/images/TeamUp.ico" type="image/x-icon"/>
        </header>
        <div className="about-header">
            <Link to="/">
                <div className="back-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
            </Link>
            <h1 className='title'>About Page</h1>
        </div>
        <div className="avatar-container">
                <div className='member-container'>
                <Link to='/about/juan'>
                <img className='avatar-about'
                    src="/images/Juan.png" alt='placeholder' />
                </Link>
                <p><strong>Team Lead</strong></p>
                <p>Juan Estrada</p>
                </div>

                <div className='member-container'>
                <Link to='/about/areeb'>
                    <img className='avatar-about'
                        src="/images/areeb.png" alt='placeholder' />
                </Link>
                <p><strong>Backend Lead</strong></p>
                <p>Areeb Abbasi</p>
                </div>

                <div className='member-container'>
                <Link to='/about/martin'>
                    <img className='avatar-about'
                        src="/images/Martin.png" alt='placeholder' />
                </Link>
                <p><strong>Github Master</strong></p>
                <p>Martin Pham</p>
                </div>

                <div className='member-container'>
                <Link to='/about/cole'>
                    <img className='avatar-about'
                        src="/images/Cole.png" alt='placeholder' />
                </Link>
                <p><strong>Docs Editor</strong></p>
                <p>Cole Chiodo</p>
                </div>

                <div className='member-container'>
                <Link to='/about/kotaro'>
                    <img className='avatar-about'
                        src="/images/Kotaro.jpg" alt='placeholder' />
                </Link>
                <p><strong>Database Admin</strong></p>
                <p>Kotaro Iwanaga</p>
                </div>

                <div className='member-container'>
                <Link to='/about/jaycee'>
                    <img className='avatar-about'
                        src="/images/Jaycee.png" alt='placeholder' />
                </Link>
                <p><strong>Frontend Lead</strong></p>
                <p>Jaycee Lorenzo</p>
                </div>
        </div>
        </>
    )
}

