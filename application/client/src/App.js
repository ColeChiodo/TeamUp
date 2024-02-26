import { Routes, Route } from "react-router-dom";
import "./Stylesheets/App.css";
import TeamMemberList from "./TeamMemberList";
import NavigationBar from "./NavigationBar";

// import *Image from ./images/MemberPics/*.png
import JayceeImage from "./images/MemberPics/Jaycee.png";
import MartinImage from "./images/MemberPics/Martin.png";
import ColeImage from "./images/MemberPics/Cole.png";
import KotaroImage from "./images/MemberPics/Kotaro.jpg";

import AboutJuan from "./AboutMembers/AboutJuan";
import AboutAreeb from "./AboutMembers/AboutAreeb";
import AboutMartin from "./AboutMembers/AboutMartin";
import AboutCole from "./AboutMembers/AboutCole";
import AboutJaycee from "./AboutMembers/AboutJaycee";
import AboutKotaro from "./AboutMembers/AboutKotaro";

const teamMembers = [
  { name: "Juan Estrada", imageUrl: "", role: "Team Lead" },
  { name: "Areeb Abbasi", imageUrl: "", role: "Backend Lead" },
  { name: "Martin Pham", imageUrl: MartinImage, role: "Github Master" },
  { name: "Cole Chiodo", imageUrl: ColeImage, role: "Docs Editor" },
  { name: "Kotaro Iwanaga", imageUrl: KotaroImage, role: "Database Admin" },
  { name: "Jaycee Lorenzo", imageUrl: JayceeImage, role: "Frontend Lead" },
];

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={<TeamMemberList teamMembers={teamMembers} />}
        />
        <Route
          path="/about/:name"
          element={<TeamMemberList teamMembers={teamMembers} />}
        />
        <Route
          path="about/juan"
          element={<h1>Juan</h1>}
          Component={AboutJuan}
        />
        <Route
          path="about/areeb"
          element={<h1>Areeb</h1>}
          Component={AboutAreeb}
        />
        <Route
          path="about/martin"
          element={<h1>Martin</h1>}
          Component={AboutMartin}
        />
        <Route
          path="about/cole"
          element={<h1>Cole</h1>}
          Component={AboutCole}
        />
        <Route
          path="about/kotaro"
          element={<h1>Kotaro</h1>}
          Component={AboutKotaro}
        />
        <Route
          path="about/jaycee"
          element={<h1>Jaycee</h1>}
          Component={AboutJaycee}
        />
      </Routes>
    </div>
  );
}

export default App;
