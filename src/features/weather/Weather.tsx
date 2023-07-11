import React, {useEffect, useState} from 'react';
import City from '../citiesWeather/City';
import {useAppSelector} from "../../common/hooks/useAppSelector";
import s from './weather.module.css'
import {citiesWeatherThunks, CityLocalType} from "../citiesWeather/citiesWeather.slice";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";

const Weather = () => {
    const cities: CityLocalType[] = useAppSelector(state => state.citiesWeather.cityLocal)
    const dispatch = useAppDispatch()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            dispatch(citiesWeatherThunks.getCurrentGeolocation({
                lat: +position.coords.latitude.toFixed(4),
                lon: +position.coords.longitude.toFixed(4)
            }))
        })


        cities.forEach(city => dispatch(citiesWeatherThunks.getSummaryWeather({
            location: city.name,
            degrees: city.degrees
        })))
    }, [])


    return (
        <div className={s.wrapper}>
            <div className={s.citiesWrapper}>
                {cities.map((city) => <City key={city.name} city={city.name} degrees={city.degrees}/>)}
            </div>
        </div>
    );
};

export default Weather;