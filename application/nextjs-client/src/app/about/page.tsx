/*********************************************************************
Page: About Page
Contributors: Jaycee Lorenzo, Martin Pham
Description: This page displays the team members of the project and their roles.
             Clicking on a team member will redirect the user to the team member's page.
Components:
********************************************************************/
import '@/styles/about.css';
import Link from 'next/link';

export default function MemberList() {
    return (
        <>
        <header>
            <title>About TeamUp</title>
            <link rel="icon" href="/images/TeamUp.ico" type="image/x-icon"/>
        </header>
        <div className="about-header">
            <Link href="/">
                <div className="back-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </Link>
            <h1 className='title'>About Page</h1>
        </div>
        <div className="avatar-container">
                <div className='member-container'>
                <Link href='/about/juan'>
                <img className='avatar'
                    src="/images/Juan.png" alt='placeholder' />
                </Link>
                <p><strong>Team Lead</strong></p>
                <p>Juan Estrada</p>
                </div>

                <div className='member-container'>
                <Link href='/about/areeb'>
                    <img className='avatar'
                        src="/images/areeb.png" alt='placeholder' />
                </Link>
                <p><strong>Backend Lead</strong></p>
                <p>Areeb Abbasi</p>
                </div>

                <div className='member-container'>
                <Link href='/about/martin'>
                    <img className='avatar'
                        src="/images/Martin.png" alt='placeholder' />
                </Link>
                <p><strong>Github Master</strong></p>
                <p>Martin Pham</p>
                </div>

                <div className='member-container'>
                <Link href='/about/cole'>
                    <img className='avatar'
                        src="/images/Cole.png" alt='placeholder' />
                </Link>
                <p><strong>Docs Editor</strong></p>
                <p>Cole Chiodo</p>
                </div>

                <div className='member-container'>
                <Link href='/about/kotaro'>
                    <img className='avatar'
                        src="/images/Kotaro.jpg" alt='placeholder' />
                </Link>
                <p><strong>Database Admin</strong></p>
                <p>Kotaro Iwanaga</p>
                </div>

                <div className='member-container'>
                <Link href='/about/jaycee'>
                    <img className='avatar'
                        src="/images/Jaycee.png" alt='placeholder' />
                </Link>
                <p><strong>Frontend Lead</strong></p>
                <p>Jaycee Lorenzo</p>
                </div>
        </div>
        </>
    )
}

