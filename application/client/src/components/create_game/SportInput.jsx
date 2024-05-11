import React, {useState, useEffect, useRef} from 'react';
import {BiChevronDown} from 'react-icons/bi';
import {AiOutlineSearch} from 'react-icons/ai';

function SportInput ({sport, updateSport, sportValid, updateSportValid}) {
    const domain = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;

    const [sportInput, setSportInput] = useState(''); 
    const [sportList, setSportList] = useState(null);
    const [open, setOpen] = useState(false);
    const [chevronRotate, setChevronRotate] = useState(0);

    const dropdownRef = useRef(null);

    // close dropdown when clicking outside or on input div
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                event.target.id !== 'sportDropdownToggle'
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
        const fetchSports = async () => {
            try {
                const response = await fetch(`${url}/game/sports`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch sports');
                }
                const sports = await response.json();
                setSportList(sports);
            } catch (error) {
                console.error('Error fetching sports: ', error);
            }
        }
        fetchSports();
    }, []);

    return (
        <>
        <div className="mb-2">
            <label> {/* Sport */}
                <p className="font-bold text-md">Sport</p>
                <div 
                    id="sportDropdownToggle"
                    className={`bg-white w-full p-3 flex justify-between rounded-lg border border-accent
                    ${!sportValid ? 'border-red-500' : ''}
                    ${sport ? 'text-black' : 'text-gray-400'}
                    `}
                    onClick={handleDropdownToggle}    
                >
                    {sport ? `${sport.name}`: "Select a sport"}
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
                            value={sportInput}
                            onChange={(e) =>{
                                setSportInput(e.target.value);
                                
                            }}
                            placeholder='Search for sports' 
                            className="placeholder:text-gray-400 p-2 outline-none w-full"
                            />
                    </div>
                    
                    {
        sportList?.some(s => s.name.toLowerCase().includes(sportInput.toLowerCase()) ) ? (
            sportList.map(s => (
                <li
                    key={s.name}
                    className={`p-2 cursor-pointer text-md hover:bg-primary hover:text-white
                        ${sport?.name === s.name ? "bg-primary text-white" : "text-black"}
                        ${s.name.toLowerCase().startsWith(sportInput.toLowerCase())
                            ? "block" : "hidden"
                        }
                    `}
                    onClick={() => {
                        if (s !== sport) {
                            updateSport(s);
                            updateSportValid(true);
                            handleDropdownToggle();
                        }
                    }}
                >
                    {`${s.name}`}
                </li>
            ))
        ) : (
            <li className="p-2 rounded-lg text-md text-gray-500">No sports found</li>
        )
    }
                </ul>
                {!sportValid && <p className="text-red-500">Enter a valid sport</p>}
            </label>
        </div>
        </>
    )
}

export default SportInput;