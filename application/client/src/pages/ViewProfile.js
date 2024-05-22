// USED TO VIEW OTHER USERS PROFILE
import '../styles/globals.css';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import ReviewCards from '../components/view_profile/ReviewCards';
import CreateStarReview from '../components/view_profile/CreateStarReview';

function ViewProfile(){
    const domain = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;

    const {userId} = useParams();
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [reviews, setReviews] = useState([]);

    const [description, setDescription] = useState(''); // props for the review description
    const [stars, setStars] = useState(0); // props for the star rating
    const updateStars = (newStars) => {
        setStars(newStars);
        validateRating(newStars);
    }

    const [descriptionValid, setDescriptionValid] = useState(true);
    const [ratingValid, setRatingValid] = useState(true);

    const validateDescription = (d) => {
        if (d.length < 5){
            setDescriptionValid(false);
        }
        else{
            setDescriptionValid(true);
        }
    }

    const validateRating = (r) => {
        if (r < 1 || r > 5){
            setRatingValid(false);
        }
        else{
            setRatingValid(true);
        }
    }

    useEffect(() => {
        async function fetchUser(){ // gets the user's information
            try{
                const options = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                        'Content-Type': 'application/json',
                    }
                };
                const response = await fetch(`${url}/users/${userId}`, options);
                const data = await response.json();
                setUser(data);
                setUsername(data.username);
            }
            catch (error){
                console.error('Failed to fetch user:', error);
            }
        }
        fetchUser();
        
        async function fetchReviews(){ // gets the reviews of the user
            try{
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    
                    }
                };
                const response = await fetch(`${url}/review/${userId}`, options);
                const data = await response.json();
                setReviews(data.reviewsFor);
            }
            catch(error){
                console.error('Failed to fetch reviews:', error);
            }

        }

        async function getBio(){
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                        'Content-Type': 'application/json',
                    }
                };
                const response = await fetch(`${url}/users/userBio/${username}`, options);
                const data = await response.json();
                setBio(data.bio);

            } catch (error) {
                console.error('Failed to get bio:', error);
            }
        }
        fetchReviews();
        getBio();
    }, [userId, url, username]);

    async function handleSubmitReview(){
        validateDescription(description);
        validateRating(stars);


        if (description !== '' && stars !== 0){
            try {
                const reqData = {
                    description: description,
                    rating: stars,
                    recipientId: parseInt(userId)
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
                    const response = await fetch(`${url}/review/create`, options);
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

    if (!bio) return <div>Loading...</div>; // Or any other loading state representation
    return (
        <>
        <NavigationBar />
        <div className="min-h-screen flex flex-col items-center">
            <div className="flex flex-col justify-center items-center md:my-10 divide-y md:divide-y-0"></div>
                <div className="md:card p-5 md:w-2/4 bg-base-100 md:shadow-xl justify-center content-center">
                    <div className="grid grid-cols-1 divide-y-2 lg:grid-cols-1 md:divide-y-0">
                        <div className="flex flex-col justify-center md:flex-row items-center gap-5">
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-48">
                                    <span className="text-3xl"></span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col justify-center text-center md:text-left">
                                    <h1 className="text-4xl font-bold">{user.name}</h1>
                                    <h2 className="text-xl font-medium italic text-slate-700">@{user.username}</h2>
                                    <label className="text-sm font-semibold text-black" htmlFor="desc-box">Bio</label>
                                    <div id="desc-box" className="min-h-36 p-2 border-2 border-slate-400 rounded overflow-y-auto bg-white">
                                        {bio || 'No bio provided.'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="self-start">
                    <Carousel title={`Reviews of ${user.name}`}>
                        <ReviewCards reviews={reviews} />
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

export default ViewProfile;