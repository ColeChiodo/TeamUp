import { Routes, Route } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Home from './Home';
import UnimplementedPage from './UnimplementedPage';

// function AppWithNavbar() {
const AppWithNavbar = ({isLoggedIn, onLogout, userInfo, setUserInfo, handleLogin}) => {
    return (
        <>
        <NavigationBar isLoggedIn={isLoggedIn} onLogout={onLogout} userInfo={userInfo} setUserInfo={setUserInfo} handleLogin={handleLogin}/>

        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/unimplemented" element={<UnimplementedPage />} />

        </Routes>
        </>
    )
}

export default AppWithNavbar