import React from "react";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';

function ReviewCards({reviews}){
    return (
        <>
        {reviews.length === 0 ? (
                <Link to="/create-game">
                    <div className="card card-compact border-2 border-rounded-xl border-slate-300 w-60 shadow-xl">
                        <div className="bg-primary rounded-xl h-40 border-b-4 border-slate-300 rounded-b-none pt-4 flex flex-col">
                            <div className="mx-auto my-auto">
                            <h2 className="font-medium text-white text-2xl">No reviews for this user yet...</h2>
                            
                            </div>
                            
                        </div>
                        <div className="card-body min-h-16">
                            <h2 className="text-md font-bold mx-auto">Scroll down to write one!</h2>
                            
                        </div>
                    </div>
                </Link>
            ) : (
                reviews.map((review, index) => (
                        <div className="card card-compact border-2 border-rounded-xl border-slate-300 w-60 shadow-xl min-w-60">
                            <div className="bg-secondary rounded-xl h-28 max-h-28 border-b-4 border-slate-300 rounded-b-none flex flex-col">
                                <div className="mt-2 self-center">
                                    <div>
                                        <Rating 
                                            name="read-only"
                                            value={parseInt(review.rating)}
                                            size="large"
                                            readOnly
                                        />
                                    </div>
                                    <h2 className="font-medium text-white text-2xl text-center">{review.reviewer.name}</h2>
                                </div>
                                
                            </div>
                            <div className="card-body overflow-y-scroll min-h-28 max-h-28">
                                <h2 className="text-lg">
                                    {review.description}
                                </h2>
                                
                            </div>
                        </div>
                ))
            )}
        </>
    );
}

export default ReviewCards;