import React from 'react';
import City from '../City/City';
import Search from "../../common/components/Search/Search";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {CitiesWeatherType} from '../CitiesWeather/citiesWeather.slice';
import s from './weather.module.css'

const Weather = () => {
    const cities: CitiesWeatherType = useAppSelector(state => state.citiesWeather.citiesWeather)
    if (Object.keys(cities).length === 0){
        return <h1>LOADING</h1>
    }
        return (
            <div>
                <Search/>
                <div className={s.citiesWrapper}>
                    {Object.keys(cities).map(city => Object.keys(cities[city]).length !== 0 &&
                        <City key={cities[city].id} city={city} weather={cities[city]}/>)}
                </div>
            </div>
        );
};

export default Weather;