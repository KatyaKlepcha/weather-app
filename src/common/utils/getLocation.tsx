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

export const getLocation = async () => {
    debugger
    // if (!navigator.geolocation) {
    //     setStatusLocation && setStatusLocation('Geolocation is not supported by your browser');
    //     return null
    // } else {
    //     setStatusLocation && setStatusLocation('Locating...');
    await navigator.geolocation.getCurrentPosition((position) => {
        // setStatusLocation && setStatusLocation(null);
        return {lat: position.coords.latitude, lon: position.coords.longitude};
    })
}