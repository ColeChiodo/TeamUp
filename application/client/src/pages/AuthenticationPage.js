import '../Stylesheets/AuthenticationPage.css';
import NavigationBarSimple from '../components/NavigationBarSimple';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function AuthenticationPage() {
    return (
        <>
        {NavigationBarSimple()}
        <div className='bg'></div>
        <div className="container">
        <div className="back-header">
            <Link to="/">
                <div className="back-icon-container">
                    <FontAwesomeIcon icon={faChevronLeft} className='back-icon' size="2xl"/>
                </div>
            </Link>
            <p className="title">Back to home</p>
        </div>
        <div className="authentication-page">
            <div className="login-left">
                <div className="login-left-content">
                    <h1>Login</h1>
                    <hr/>
                    <form action='/validateLogin'>
                        <input type="email" placeholder="Email" name="email" required></input>
                        <br/>
                        <input type="password" placeholder="Password" name="password" required></input>
                        <br/>
                        <a href="." className="forgot-password">Forgot Password?</a>
                        <br/>
                        <button type="submit" className='login'>Login</button>
                    </form>
                </div>
            </div>
            <div className="signup-right">
                <div className="signup-right-content">
                    <a href="/signup"><button className='signup'>Sign Up</button></a>
                    <h2>Why?</h2>
                    <p>
                        - Find Games in Your Area
                        <br/>
                        - Join Tournaments
                        <br/>
                        - Connect with others
                    </p>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default AuthenticationPage