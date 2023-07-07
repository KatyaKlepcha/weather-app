import React from 'react';
import City from '../citiesWeather/City';
import Search from "../../common/components/Search/Search";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {CitiesWeatherType} from '../citiesWeather/citiesWeather.slice';
import s from './weather.module.css'
import Select from "../../common/components/Select/Select";

const Weather = () => {
    const cities: CitiesWeatherType = useAppSelector(state => state.citiesWeather.citiesWeather)
    // // if (Object.keys(cities).length === 0) {
    // //     return <h1>LOADING</h1>
    // // }
    console.log('cities', cities)


    const onChangeLang = () => {

    }

    return (
        <div className={s.wrapper}>
            <Select onChange={onChangeLang}/>
            <Search/>
            <div className={s.citiesWrapper}>
                {Object.keys(cities).map(city => Object.keys(cities[city]).length !== 0 &&
                    <City key={cities[city].id} city={cities[city].name} weather={cities[city]}/>)}
            </div>
        </div>
    );
};

export default Weather;