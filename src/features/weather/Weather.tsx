import React, {useEffect, useState} from 'react';
import City from '../citiesWeather/City';
import {useAppSelector} from "../../common/hooks/useAppSelector";
import s from './weather.module.css'
import Select from "../../common/components/Select/Select";
import {citiesWeatherThunks, CityLocalType} from "../citiesWeather/citiesWeather.slice";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {getLocation} from "../../common/utils/getLocation";

const Weather = () => {
    // const [lat, setLat] = useState<number>(0);
    // const [lon, setLon] = useState<number>(0);
    const [statusLocation, setStatusLocation] = useState<string | null>(null);


    const cities: CityLocalType[] = useAppSelector(state => state.citiesWeather.cityLocal)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!navigator.geolocation) {
            setStatusLocation && setStatusLocation('Geolocation is not supported by your browser');
        } else {
            setStatusLocation && setStatusLocation('Locating...');
            getLocation()
                .then((res) => console.log('res', res))
        }


        cities.forEach(city => dispatch(citiesWeatherThunks.getSummaryWeather({
            location: city.name,
            degrees: city.degrees,
        })))
    }, [])


    const onChangeLang = () => {
    }

    return (
        <div className={s.wrapper}>
            <Select onChange={onChangeLang}/>
            <div className={s.citiesWrapper}>
                {cities.map((city) => <City key={city.name} city={city.name} degrees={city.degrees}/>)}
            </div>
        </div>
    );
};

export default Weather;