// export const getLocation = (setStatus?: (value: string | null) => void) => {
//
//     if (!navigator.geolocation) {
//
//         setStatus && setStatus('Geolocation is not supported by your browser');
//         return null
//     } else {
//         setStatus && setStatus('Locating...');
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 setStatus && setStatus('');
//                 return {lat: position.coords.latitude, lon: position.coords.longitude}
//             },
//             () => {
//                 setStatus && setStatus!('Unable to retrieve your location');
//                 return null
//             }
//         );
//     }
// }

import {citiesWeatherThunks} from "../../features/citiesWeather/citiesWeather.slice";
import {useAppDispatch} from "../hooks/useAppDispatch";


export const getLocation = () => {
    const dispatch = useAppDispatch();
    navigator.geolocation.getCurrentPosition((position) => {
        debugger
        dispatch(citiesWeatherThunks.getCurrentGeolocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
        }))
    })
}