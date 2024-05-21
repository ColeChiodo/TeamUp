import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import LocationReviewCards from '../components//LocationReviewCards';
import CreateStarReview from '../components/view_profile/CreateStarReview';
import LocationMap from '../components/Location';

function ViewLocation(){
    const domain = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;

    
    const  {locationId} = useParams();
    const [location, setLocation] = useState('');
    const [stars, setStars] = useState(0);
    const [description, setDescription] = useState('');
    const [reviews, setReviews] = useState([]); // props for the reviews
    const validateRating = (r) => {
        if (r < 1 || r > 5){
            setRatingValid(false);
        }
        else{
            setRatingValid(true);
        }
    }
    const validateDescription = (d) => {
        if (d.length < 5){
            setDescriptionValid(false);
        }
        else{
            setDescriptionValid(true);
        }
    }
    const updateStars = (newStars) => {
        setStars(newStars);
    }
    const [ratingValid, setRatingValid] = useState(true);
    const [descriptionValid, setDescriptionValid] = useState(true);

    useEffect(() => {
        async function fetchLocation(){
            try{
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };
                const response = await fetch(`${url}/gameLocations/${locationId}`, options);
                const data = await response.json();
                console.log(data);
                setLocation(data);
            } catch (error){
                console.error('Failed to fetch location:', error);
            }
        }
        async function getLocationReviews(){
            try{
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };
                const response = await fetch(`${url}/review/location/${locationId}`, options);
                const data = await response.json();
                setReviews(data);
            } catch (error){
                console.error('Failed to fetch location reviews:', error);
            }
        }
        fetchLocation();
        getLocationReviews();
    },[locationId, url]);

    if (!location) return <div>Loading...</div>; // Or any other loading state representation
    async function handleSubmitReview(){
        validateDescription(description);
        validateRating(stars);


        if (description !== '' && stars !== 0){
            try {
                const reqData = {
                    description: description,
                    rating: stars,
                };
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('accessToken')}`
                    },
                    body: JSON.stringify(reqData)
                };
                try {
                    const response = await fetch(`${url}/review/location/${locationId}`, options);
                    const data = await response.json();
                    console.log(data);
                    window.location.reload();
                }
                catch (error){
                    console.error('Failed to submit review:', error);
                }
            }
            catch (error) {
                console.error('Failed to submit review:', error);
            }
        }
    }

    const lat = location.locationLatitude;
    const long = location.locationLongitude;
    console.log(lat);
    console.log(long);
    return (
        <>
        <NavigationBar />
        <div className="min-h-screen flex flex-col items-center">
            <div className="flex flex-col justify-center items-center md:my-10 divide-y md:divide-y-0"></div>
                <div className="md:card p-5 md:w-9/12 bg-base-100 md:shadow-xl justify-center content-center">
                    <div className="grid grid-cols-1 divide-y-2 lg:grid-cols-1 md:divide-y-0">
                        <div className="flex flex-col justify-center md:flex-row items-center gap-5">
                            {/* <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-48">
                                    <span className="text-3xl"></span>
                                </div>
                            </div> */}
                            
                            <div id="loc-box" className="w-4/6 h-72 p-2 border border-slate-400 shadow-xl rounded overflow-y-auto bg-white">
                                <LocationMap latitude={lat} longitude={long}/>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col justify-center text-center md:text-left">
                                    <h1 className="text-4xl font-bold">{location.name}</h1>
                                    <h2 className="text-xl font-medium text-slate-700">{location.address}</h2>
                                    <label className="text-sm font-semibold text-black" htmlFor="desc-box">Description</label>
                                    <div id="desc-box" className="min-h-36 p-2 border-2 border-slate-400 rounded overflow-y-auto bg-white">
                                        {location.description || 'No desc provided.'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="self-start">
                    <Carousel title={`Reviews of ${location.name}`}>
                        <LocationReviewCards reviews={reviews} />
                    </Carousel>
                </div>

                <div className="w-full border-t-2 border-slate-400 pt-2">
                    <div className="w-full self-center">
                        <h1 className="text-4xl text-center">Create a review</h1>
                        <div className="my-3 mt-2 mb-5 border border-slate-300 rounded-xl w-1/2 mx-auto shadow-xl"> {/* Review Form */}
                            <div className="font-semibold text-center py-2 bg-secondary rounded-t-xl border-b-4 border-secondary">
                                <label className="text-xl text-white">Rating:</label>
                                <div className="bg-white pt-1 w-fit mx-auto rounded-xl px-2 border-2 border-slate-800">
                                    <CreateStarReview stars={stars} updateStars={updateStars}/>
                                </div>
                                {!ratingValid ? <p className="text-red-400">Rating must be between 1 and 5</p> : null}
                            </div>
                            <div className="text-center mt-1 flex flex-col items-center"> {/* Description */}
                                <label className="text-xl font-semibold">Description:</label>
                                <textarea 
                                    className="textarea textarea-secondary w-5/6 mt-1 pl-2 pt-1 min-h-40 border-2 rounded-xl" 
                                    placeholder="Write a review..." 
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                        validateDescription(e.target.value);
                                    }}
                                />
                                {!descriptionValid ? <p className="text-red-400 pb-2">Description must be at least 5 characters</p> : null}
                            </div>
                            <div className="text-center mb-2"> {/* Submit Button */}
                                <button 
                                    className="btn btn-secondary mt-3 w-24 text-white"
                                    onClick={handleSubmitReview}
                                    >
                                        Submit
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        <Footer />
        </>
    )
}

export default ViewLocation;