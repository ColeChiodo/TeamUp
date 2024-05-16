import React from 'react';
import {useState} from 'react';
import Rating from '@mui/material/Rating';

function CreateStarReview({stars, updateStars}){

    return (
        <div className="ml-2">
            <Rating
            name='simple-controlled'
            value={stars}
            onChange={(event, newValue) => {
                updateStars(newValue);
                }
            }
            size="large"
            />
        </div>
    );
}

export default CreateStarReview;