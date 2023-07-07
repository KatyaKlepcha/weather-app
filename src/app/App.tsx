import React, {useEffect, useState} from 'react';
import './App.css';
import {Outlet} from 'react-router-dom'
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectAppStatus} from "./app.selector";
import {getLocation} from "../common/utils/getLocation";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {citiesWeatherThunks} from "../features/citiesWeather/citiesWeather.slice";
import { getFromLocalStorage } from '../common/utils/getFromLocalStorage';
import { appActions } from './app.slice';


function App() {

    const status = useAppSelector(selectAppStatus)

    const [lat, setLat] = useState<number>(0);
    const [lon, setLon] = useState<number>(0);
    const [statusLocation, setStatusLocation] = useState<string| null>(null);

    const dispatch = useAppDispatch()

    useEffect(() => {
        const citiesArray: string[] = getFromLocalStorage('current-city')
        console.log('citiesArray', citiesArray)

        if (citiesArray) {
            dispatch(citiesWeatherThunks.firstLoading(citiesArray)).then(()=>{
                dispatch(appActions.setInitialized({initializeStatus: true}))
            })
        }
    }, [])

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatusLocation('Geolocation is not supported by your browser');
        } else {
            setStatusLocation('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatusLocation(null);
                setLat(position.coords.latitude);
                setLon(position.coords.longitude);
            }, () => {
                setStatusLocation('Unable to retrieve your location');
            });
        }
    }

    // console.log('lat', lat)
    // console.log('lon', lon)
    // console.log('statusLocation', statusLocation)

    // useEffect(()=>{
    //     getLocation()
    //     dispatch(citiesWeatherThunks.getCurrentGeolocation({lat, lon}))
    // })

    return (
        <div className="App">
            {status === 'loading' && <div>Loading</div>}
            <Outlet/>
        </div>
    );
}

export default App;
