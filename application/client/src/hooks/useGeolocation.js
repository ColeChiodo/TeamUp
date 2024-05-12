import { useState, useEffect } from "react";

export const useGeolocation = () => {
    const [locationInfo, setLocationInfo] = useState(null);
    const [locationError, setLocationError] = useState(null);

    useEffect(() => {
        const { geolocation } = navigator;

        const onSuccess = (res) => {
            console.log("Response from useGeolocation hook onSuccess: ", res);
            setLocationInfo(res.coords);
        }

        const onError = (res) => {
            console.log("Response from useGeolocation hook onError: ", res);
            setLocationError(res.message);
        }

        if (!locationError && !locationInfo) {
            geolocation.getCurrentPosition(onSuccess, onError);
        }
        
    }, []); 

    return { locationInfo, locationError };
}
