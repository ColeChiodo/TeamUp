import React, {useState, useEffect, useRef} from 'react';
import {BiChevronDown} from 'react-icons/bi';
import {AiOutlineSearch} from 'react-icons/ai';

function LocationInput ({location, updateLocation, locationValid, updateLocationValid}) {
    const domain = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;

    const [locationInput, setLocationInput] = useState(''); 
    const [locationList, setLocationList] = useState(null);
    const [open, setOpen] = useState(false);
    const [chevronRotate, setChevronRotate] = useState(0);

    const dropdownRef = useRef(null);

    // close dropdown when clicking outside or on input div
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                event.target.id !== 'locationDropdownToggle'
            ) {
                setOpen(false);
                setChevronRotate(0);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // toggle dropdown and rotate chevron
    const handleDropdownToggle = () => {
        setOpen(!open);
        setChevronRotate(open ? 0 : 180);
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch(`${url}/gameLocations`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch locations');
                }
                const locations = await response.json();
                setLocationList(locations);
            } catch (error) {
                console.error('Error fetching locations: ', error);
            }
        }
        fetchLocations();
    }, [url]);

    return (
        <>
        <div className="mb-2">
            <label> {/* Location */}
                <p className="font-bold text-md">Location</p>
                <div 
                    id="locationDropdownToggle"
                    className={`bg-white w-full p-3 flex justify-between rounded-lg border border-accent
                    ${!locationValid ? 'border-red-500' : 'text-black'}
                    ${location ? 'text-black' : 'text-gray-400'}
                    `}
                    onClick={handleDropdownToggle}    
                >
                    {location ? `${location.address} @ ${location.name}`: "Enter a location"}
                    <BiChevronDown 
                        size={20} 
                        style={{ 
                            transform: `rotate(${chevronRotate}deg)`,
                            transition: 'transform 0.3s ease-in-out'
                        }}/>
                </div>
                <ul ref={dropdownRef}
                    className={`bg-white mt-2 w-96 rounded-lg overflow-y-auto absolute z-10
                    ${open ? 'max-h-52 border border-slate-400 shadow-2xl' : 'max-h-0 hidden'}`} >
                    <div className="flex items-center px-2 sticky top-0 bg-white border-b">
                        <AiOutlineSearch size={18} className="text-gray-400"/>
                        <input 
                            type="text" 
                            value={locationInput}
                            onChange={(e) =>{
                                setLocationInput(e.target.value);
                                
                            }}
                            placeholder='Enter a location' 
                            className="placeholder:text-gray-400 p-2 outline-none w-full"
                            />
                    </div>
                    
                    {
        locationList?.some(loc => loc.address.toLowerCase().startsWith(locationInput.toLowerCase()) ||
                                    loc.name.toLowerCase().startsWith(locationInput.toLowerCase())) ? (
            locationList.map(loc => (
                <li
                    key={loc.address}
                    className={`p-2 cursor-pointer text-md hover:bg-primary hover:text-white
                        ${location?.address === loc.address && location?.name === loc.name ? "bg-primary text-white" : "text-black"}
                        ${loc.address.toLowerCase().startsWith(locationInput.toLowerCase()) ||
                            loc.name.toLowerCase().startsWith(locationInput.toLowerCase())
                            ? "block" : "hidden"
                        }
                    `}
                    onClick={() => {
                        if (loc !== location) {
                            updateLocation(loc);
                            updateLocationValid(true);
                            handleDropdownToggle();
                        }
                    }}
                >
                    {`${loc.address} @ ${loc.name}`}
                </li>
            ))
        ) : (
            <li className="p-2 rounded-lg text-md text-gray-500">No locations found</li>
        )
    }
                </ul>
                {!locationValid && <p className="text-red-500">Enter a valid location</p>}
            </label>
        </div>
        </>
    )
}

export default LocationInput;