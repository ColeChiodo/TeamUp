// USED TO VIEW OTHER USERS PROFILE
import '../styles/globals.css';
import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import ReviewCards from '../components/ReviewCards';

function ViewProfile(){
    const domain = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_API_VERSION;
    const url = `${domain}${version}`;

    const {userId} = useParams();
    const [user, setUser] = useState('');
    const [reviews, setReviews] = useState([]);

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
            }
            catch (error){
                console.error('Failed to fetch user:', error);
            }
        }

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
        fetchUser();
        fetchReviews();
    }, [userId, url]);

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
                            <div className="text align-middle">
                                <div className="flex flex-col justify-center text-center md:text-left">
                                    <h1 className="text-4xl font-bold">{user.name}</h1>
                                    <h2 className="text-xl">@username</h2>
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

                <div className="self-start">
                    <h1 className="text-4xl pl-8">Create a review</h1>
                </div>
            </div>
        <Footer />
        </>
    )
}

export default ViewProfile;