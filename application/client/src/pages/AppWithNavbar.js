import { Routes, Route } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Home from './Home';
import UnimplementedPage from './UnimplementedPage';

function AppWithNavbar() {
    return (
        <>
        <NavigationBar />

        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/unimplemented" element={<UnimplementedPage />} />

        </Routes>
        </>
    )
}

export default AppWithNavbar