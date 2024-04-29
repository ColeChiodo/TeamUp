/*********************************************************************
Component: Location
Contributors: Jaycee Lorenzo
Description: Display the location of the game using Google Maps API
********************************************************************/
import React, { useEffect } from "react";

const LocationMap = () => {
    const location = { lat: 37.723941, lng: -122.479447 };
    useEffect(() => {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAdNmdB4OWTE7weDqqCjSmdI1shlxYzzyE`;
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load', () => {
            const map = new window.google.maps.Map(document.getElementById('google-map'), {
                center: { lat: 37.723941, lng: -122.479447 },
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