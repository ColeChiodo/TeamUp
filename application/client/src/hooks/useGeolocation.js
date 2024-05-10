import { useState } from "react";

export const useGeolocation = () => {
    const [locationInfo, setLocationInfo] = useState(null);
    const [locationError, setLocationError] = useState(null);

    const { geolocation } = navigator;

    const onSuccess = (res) => {
        console.log(res);
        setLocationInfo(res.coords);
    }

    const onError = (res) => {
        console.log(res);
        setLocationError(res.message);
    }

    if(!locationError && !locationInfo) {
        geolocation.getCurrentPosition(onSuccess, onError);
    }

    return { locationInfo, locationError };
}