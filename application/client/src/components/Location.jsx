/*********************************************************************
Component: Location
Contributors: Jaycee Lorenzo
Description: Display the location of the game using Google Maps API
********************************************************************/
import React, { useEffect } from "react";

const LocationMap = ({latitude,longitude}) => {
    const location = { lat: latitude, lng: longitude};
    useEffect(() => {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAdNmdB4OWTE7weDqqCjSmdI1shlxYzzyE`;
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load', () => {
            const map = new window.google.maps.Map(document.getElementById('google-map'), {
                center: { lat: latitude, lng: longitude },
                zoom: 15,
            });

            new window.google.maps.Marker({
                position: location,
                map: map,
            });
        });
    }, []);

    return <div id="google-map" style={{ width: '100%', height: '100%' }}></div>;
};

export default LocationMap;

