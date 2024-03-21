import { Link } from 'react-router-dom';
import '../Stylesheets/TitlePage.css';
import Logo from "../images/Logo.png";

function TitlePage() {
    return (
        <>
        <div className="title-page">
            <div className="title-body">
                <div className="title-body-content">
                    <img id="logo" alt="Logo" src={Logo}></img>
                    <div className="slogan">Unite your game</div>
                    <div className="slogan">Find your team</div>
                    <Link to="/about" className="about-link">About Us </Link>
                </div>
            </div>
            <div className="title-login">
                <div className="title-login-content">
                    <Link to="/home" className="link">Start Exploring</Link>
                    <Link to="/loginSignup" className="link">Login/Signup</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default TitlePage