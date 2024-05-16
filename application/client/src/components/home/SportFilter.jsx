/*********************************************************************
Component: SportFilter
Contributors: Martin Pham
Description: Filter games by sport in the home page. Users can select which sports
             they want to see games for.
********************************************************************/
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

function SportFilter({ onChange, onDateTimeFilter }) {
    const [sports, setSports] = useState([
        { id: 1, name: 'Football', checked: true },
        { id: 2, name: 'Basketball', checked: true },
        { id: 3, name: 'Tennis', checked: true },
        { id: 4, name: 'Soccer', checked: true },
        { id: 5, name: 'Volleyball', checked: true }
    ]);

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [date, setDate] = useState(null);

    const [startTimeValid, setStartTimeValid] = useState(true);
    const [endTimeValid, setEndTimeValid] = useState(true);
    const [dateValid, setDateValid] = useState(true);

    const [showFilterResult, setShowFilterResult] = useState(false);
    const [resultTime, setResultTime] = useState('');
    const [resultDate, setResultDate] = useState('');

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

    const validateDate = (dateValue) => {
        // check that the date is not before today's date (in the past)
        if(dateValue && dateValue.isBefore(dayjs(), 'day')) {
            setDateValid(false);
            return;
        }

        // it's not in the past 
        setDateValid(true);
        setDate(dateValue);
    }

    const validateEndTime = (endTimeValue) => {
        // check that there is a startTime
        if(!startTime) {
            setStartTimeValid(false);
            return;
        }

        // check that the end time is after the start time 
        if(endTimeValue && endTimeValue.isBefore(startTime)) {
            setEndTimeValid(false);
            return;
        }

        // it's after the startTime
        setEndTimeValid(true);
        setEndTime(endTimeValue);
    }

    const onFilter = () => {
        // if any of the validation variables are false or if the state variables are still null, do not filter
        if(!startTimeValid || !endTimeValid || !dateValid || !startTime || !endTime || !date) {
            return;
        }

        // set the filter results here
        const formattedStartTime = startTime.format('hh:mm A');
        const formattedEndTime = endTime.format('hh:mm A');
        const formattedDate = date.format('MM-DD-YYYY');
        setResultTime(`${formattedStartTime} to ${formattedEndTime}`);
        setResultDate(formattedDate);
        setShowFilterResult(true);

        // make the call to filter in the actual home page with the function passed down in props
        onDateTimeFilter(startTime, endTime, date);
    }  

    const clearFilter = () => {
        checkAll();
        setShowFilterResult(false);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex gap-4">
                <div className="relative">
                    <div className="filter-icon" onClick={toggleDropdown}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {showDropdown && (
                        <div className="grid grid-flow-col auto-cols-max p-4 gap-10 absolute left-0 mt-2 z-10 bg-white border border-gray-300 rounded-md shadow-md">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col text-blue-500 hover:cursor-pointer">
                                    <button className="underline" onClick={checkAll}>Check All</button>
                                    <button className="underline" onClick={uncheckAll}>Uncheck All</button>
                                </div>
                                {sports.map(sport => (
                                    <div key={sport.id} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                                        <label className="inline-flex items-center gap-2">
                                            <input 
                                                className="form-checkbox h-4 w-4"
                                                type="checkbox" 
                                                checked={sport.checked} 
                                                onChange={() => handleCheckboxChange(sport.id)}
                                            />
                                            <span>{sport.name}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="text-center">Filter by time and date</div>
                                <TimePicker label="Start Time" onChange={(newValue) => {
                                    setStartTime(newValue)
                                    setStartTimeValid(true);
                                }} />
                                {!startTimeValid && <div className="label-text text-red-500">Please select start time</div>}
                                <TimePicker label="End Time" onChange={(newValue) => validateEndTime(newValue)} />
                                {!endTimeValid && <div className="label-text text-red-500">End time can't be before start time</div>}
                                <DatePicker onChange={(newValue) => validateDate(newValue)} />
                                {!dateValid && <div className="label-text text-red-500">Date can't be in the past</div>}
                                <button onClick={() => onFilter()} className="btn btn-neutral">Filter</button>
                            </div>
                        </div>
                    )}
                </div>     
                {showFilterResult && (
                    <div className="mt-1 flex gap-2">
                        <div className="underline">
                            Showing results for games between <span style={{fontWeight: 'bold'}}>{resultTime}</span> on <span style={{fontWeight: 'bold'}}>{resultDate}</span>.
                        </div>
                        <div className="underline text-blue-500 cursor-pointer" onClick={() => clearFilter()}> 
                        Clear Filter
                        </div>
                    </div>
                )}          
            </div>
        </LocalizationProvider>
    );
}

export default SportFilter;
