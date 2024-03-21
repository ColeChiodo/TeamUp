import { Routes, Route } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Home from './Home';

function AppWithNavbar() {
    return (
        <>
        <NavigationBar />

        <Routes>
            <Route path="/home" element={<Home />} />

        </Routes>
        </>
    )
}

export default AppWithNavbar