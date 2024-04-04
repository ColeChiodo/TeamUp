import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

function SportFilter({ onChange }) {
    const [sports, setSports] = useState([
        { id: 1, name: 'Football', checked: true },
        { id: 2, name: 'Basketball', checked: true },
        { id: 3, name: 'Tennis', checked: true },
        { id: 4, name: 'Volleyball', checked: true },
        { id: 5, name: 'Soccer', checked: true }
    ]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleCheckboxChange = (id) => {
        const updatedSports = sports.map(sport =>
            sport.id === id ? { ...sport, checked: !sport.checked } : sport
        );
        setSports(updatedSports);
        onChange(updatedSports.filter(sport => sport.checked).map(sport => sport.name));
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const checkAll = () => {
        const updatedSports = sports.map(sport => ({ ...sport, checked: true }));
        setSports(updatedSports);
        onChange(updatedSports.map(sport => sport.name));
    };

    const uncheckAll = () => {
        const updatedSports = sports.map(sport => ({ ...sport, checked: false }));
        setSports(updatedSports);
        onChange([]);
    };

    return (
        <div className="search-filter">
            <div className="filter-icon" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faFilter} size="xl" />
            </div>
            {showDropdown && (
                <div className="dropdown-menu">
                    <div className="filter-options">
                        <button onClick={checkAll}>Check All</button>
                        <button onClick={uncheckAll}>Uncheck All</button>
                    </div>
                    {sports.map(sport => (
                        <div key={sport.id} className="filter-entry">
                            <input 
                                type="checkbox" 
                                checked={sport.checked} 
                                onChange={() => handleCheckboxChange(sport.id)} 
                            />
                            <span> {sport.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SportFilter;
