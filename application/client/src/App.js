import { Routes, Route, useNavigate } from "react-router-dom";
import "./Stylesheets/App.css";
import TeamMemberList from "./pages/TeamMemberList";
import React, {useState} from "react";

// import *Image from ./images/MemberPics/*.png
import JayceeImage from "./images/MemberPics/Jaycee.png";
import MartinImage from "./images/MemberPics/Martin.png";
import ColeImage from "./images/MemberPics/Cole.png";
import KotaroImage from "./images/MemberPics/Kotaro.jpg";
import JuanImage from "./images/MemberPics/Juan.png"
import AreebImage from "./images/MemberPics/areeb.png"

import AboutJuan from "./AboutMembers/AboutJuan";
import AboutAreeb from "./AboutMembers/AboutAreeb";
import AboutMartin from "./AboutMembers/AboutMartin";
import AboutCole from "./AboutMembers/AboutCole";
import AboutJaycee from "./AboutMembers/AboutJaycee";
import AboutKotaro from "./AboutMembers/AboutKotaro";

import TitlePage from "./pages/TitlePage";
import AppWithNavbar from "./pages/AppWithNavbar";
import AuthenticationPage from "./pages/AuthenticationPage";
import SignupPage from "./pages/SignupPage";


const teamMembers = [
  { name: "Juan Estrada", imageUrl: JuanImage , role: "Team Lead" },
  { name: "Areeb Abbasi", imageUrl: AreebImage, role: "Backend Lead" },
  { name: "Martin Pham", imageUrl: MartinImage, role: "Github Master" },
  { name: "Cole Chiodo", imageUrl: ColeImage, role: "Docs Editor" },
  { name: "Kotaro Iwanaga", imageUrl: KotaroImage, role: "Database Admin" },
  { name: "Jaycee Lorenzo", imageUrl: JayceeImage, role: "Frontend Lead" },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: ''
  }); // store name for now
  const navigate = useNavigate();

  // handlers to change the state of isLoggedIn
  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    // delete access and refresh tokens
    document.cookie="accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie="refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem('name');
    setUserInfo({
      name: ''
    });
    setIsLoggedIn(false);

    // navigate to the title page
    navigate('/');
  }


  return (
    <div className="App">
      <Routes>
        { /* Routes for the title page that should not include the navbar */ }
        <Route path="/" element={<TitlePage handleLogout={handleLogout}/>} />
        <Route path="/about" element={<TeamMemberList teamMembers={teamMembers} />}/>
        <Route path="/about/:name" element={<TeamMemberList teamMembers={teamMembers} />} />
        <Route path="about/juan" element={<h1>Juan</h1>} Component={AboutJuan} />
        <Route path="about/areeb" element={<h1>Areeb</h1>} Component={AboutAreeb} />
        <Route path="about/martin" element={<h1>Martin</h1>} Component={AboutMartin} />
        <Route path="about/cole" element={<h1>Cole</h1>} Component={AboutCole} />
        <Route path="about/kotaro" element={<h1>Kotaro</h1>} Component={AboutKotaro} />
        <Route path="about/jaycee" element={<h1>Jaycee</h1>} Component={AboutJaycee} />
        <Route path="authentication" element={<AuthenticationPage onLogin={handleLogin} setUserInfo={setUserInfo}/>} />
        <Route path="signup" element={<SignupPage onLogin={handleLogin}/>} />

        { /* Routes for all the pages that should include the navbar */ }
        { /* Must include the route in AppWithNavbar.js */ }
        <Route path="/*" element={<AppWithNavbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userInfo={userInfo} setUserInfo={setUserInfo} handleLogin={handleLogin}/>} />
      </Routes>
    </div>
  );
}

export default App;
