import React, {useEffect} from 'react';
import City from '../citiesWeather/City';
import Search from "../../common/components/Search/Search";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import s from './weather.module.css'
import Select from "../../common/components/Select/Select";
import {citiesWeatherThunks, CityLocalType} from "../citiesWeather/citiesWeather.slice";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {selectDegrees} from "../citiesWeather/cities.selector";

const Weather = () => {
    const dispatch = useAppDispatch()
    const cities: CityLocalType[] = useAppSelector(state => state.citiesWeather.cityLocal)

    useEffect(() => {
        cities.forEach(city => dispatch(citiesWeatherThunks.getSummaryWeather({
            location: city.name,
            degrees: city.degrees,
            show: false
        })))
    }, [])
    const onChangeLang = () => {
    }

    return (
        <div className={s.wrapper}>
            <Select onChange={onChangeLang}/>
            <div className={s.citiesWrapper}>
                {cities.map((city) => <City city={city.name} degrees={city.degrees}/>)}
            </div>
        </div>
    );
};

export default Weather;