/*********************************************************************
Component: NearbyFilter
Contributors: Martin Pham
Description: Filter games by sport in the home page. Users can select which sports
             they want to see games for.
********************************************************************/
import React, { useState } from 'react';

function NearbyFilter({ onChange }) {
    const [radiusOptions, setRadiusOptions] = useState([
        { id: 1, text: 'Within 5 Miles', radius: 5, checked: false },
        { id: 2, text: 'Within 10 Miles', radius: 10, checked: false },
        { id: 3, text: 'Within 25 Miles', radius: 25, checked: false },
        { id: 4, text: 'Within 50 Miles', radius: 50, checked: false },
        { id: 5, text: 'Within 100 Miles', radius: 100, checked: true }
    ]);

    const [showDropdown, setShowDropdown] = useState(false);

    const handleCheckboxChange = (id) => {
        const updatedOptions = radiusOptions.map(option =>
            option.id === id ? { ...option, checked: true } : { ...option, checked: false }
        );
        setRadiusOptions(updatedOptions);
        onChange(updatedOptions.find(option => option.checked).radius);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="relative">
            <div className="filter-icon cursor-pointer" onClick={toggleDropdown}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" 
                        d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" 
                        clipRule="evenodd" />
                </svg>
            </div>
            {showDropdown && (
                <div className="absolute left-0 mt-2 w-56 z-10 bg-white border border-gray-300 rounded-md shadow-md">
                    {radiusOptions.map(option => (
                        <div key={option.id} className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleCheckboxChange(option.id)}>
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox h-4 w-4" checked={option.checked} readOnly />
                                <span className="ml-2">{option.text}</span>
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NearbyFilter;
