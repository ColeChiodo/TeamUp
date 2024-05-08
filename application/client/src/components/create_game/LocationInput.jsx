import React, {useState, useEffect, useRef} from 'react';
import {BiChevronDown} from 'react-icons/bi';
import {AiOutlineSearch} from 'react-icons/ai';

function LocationInput ({location, updateLocation, locationValid}) {
    const domain = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;

    // const [locationValid, setLocationValid] = useState(true);
    const [locationInput, setLocationInput] = useState(''); 
    const [locationList, setLocationList] = useState(null);
    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);

    // const validateLocation = (loc) => {
    //     console.log(loc);
    //     if (loc === undefined || loc === "" || loc.trim().length < 5){
    //         setLocationValid(false);
    //         return;
    //     } else setLocationValid(true);
    // };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                event.target.id !== 'locationDropdownToggle'
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
    }, []);
    /*
    <input 
                type="text" 
                className={`input input-bordered input-accent w-full ${!locationValid ? 'border-red-500' : ''}`}
                placeholder="123 Main St. Building B"
                value={location}
                onChange={handleLocationChange}
                />
                {!locationValid && <p className="text-red-500">Enter a valid location</p>}
    */
    return (
        <>
        <div className="mb-2">
            <label> {/* Location */}
                <p className="font-bold text-md">Location</p>
                <div 
                    id="locationDropdownToggle"
                    className="bg-white w-full p-3 flex justify-between rounded-lg border border-accent"
                    onClick={() => setOpen(!open)}    
                >
                    {location ? `${location.address} @ ${location.name}`: "Enter a location"}
                    <BiChevronDown size={20}/>
                </div>
                <ul ref={dropdownRef}
                    className={`bg-white mt-2 w-96 rounded-lg overflow-y-auto absolute z-10
                    ${open ? 'max-h-52 border border-slate-300' : 'max-h-0 hidden'}`} >
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
                    
                    {/* {
                        locationList?.map(loc => (
                            <li 
                                key={loc.address}
                                className={`p-2 rounded-lg text-md hover:bg-primary hover:text-white
                                ${location?.address === loc.address && location?.name === loc.name ? "bg-primary text-white" : "text-black"}
                                ${loc?.address?.toLowerCase().startsWith(locationInput) || 
                                    loc?.name?.toLowerCase().startsWith(locationInput)
                                    ? "block" : "hidden"
                                }
                                `}
                                onClick={() => {
                                    if(loc !== location){
                                        updateLocation(loc);
                                    }
                                }}
                            >
                                {`${loc.address} @ ${loc.name}`}
                                
                            </li>
                        ))
                    } */}
                    {
        locationList?.some(loc => loc.address.toLowerCase().startsWith(locationInput.toLowerCase()) ||
                                    loc.name.toLowerCase().startsWith(locationInput.toLowerCase())) ? (
            locationList.map(loc => (
                <li
                    key={loc.address}
                    className={`p-2 rounded-lg text-md hover:bg-primary hover:text-white
                        ${location?.address === loc.address && location?.name === loc.name ? "bg-primary text-white" : "text-black"}
                        ${loc.address.toLowerCase().startsWith(locationInput.toLowerCase()) ||
                            loc.name.toLowerCase().startsWith(locationInput.toLowerCase())
                            ? "block" : "hidden"
                        }
                    `}
                    onClick={() => {
                        if (loc !== location) {
                            updateLocation(loc);
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
                {/* {!locationValid && <p className="text-red-500">Enter a valid location</p>} */}
            </label>
        </div>
        </>
    )
}

export default LocationInput;