import React, {FC, useState} from 'react';
import s from './City.module.css'
import close from '../../common/images/close.svg'
import {tempCalculation} from "../../common/helpers/tempCalculation";
import {WeatherResponseType} from "../weather/weather.api";
import {citiesWeatherActions, citiesWeatherThunks} from "../citiesWeather/citiesWeather.slice";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import { format } from 'date-fns';

type CityPropsType = {
    city: string
    weather: WeatherResponseType
}

const City: FC<CityPropsType> = ({city, weather}) => {
    const [isCelsius, setIsCelsius] = useState(false)
    const [isFahrenheit, setIsFahrenheit] = useState(false)
    const date = format(weather.dt, 'EEE, d MMMM, HH:mm')
    const wind = weather.wind
    const temp = weather.main.temp
    const feelsLike = weather.main.feels_like
    const humidity = weather.main.humidity
    const pressure = weather.main.pressure
    const country = weather.sys.country


    const weatherDescription = weather.weather[0].main
    const weatherIcon = weather.weather[0].icon

    const dispatch = useAppDispatch()

    const onCloseHandler = () => {
        dispatch(citiesWeatherActions.deleteCity({city}))
    }
    const onChangeCelsius = () => {
        setIsCelsius(true)
        setIsFahrenheit(false)
        dispatch(citiesWeatherThunks.getSummaryWeather({
            location: city,
            degrees: 'metric'
        })).then(() => setIsCelsius(true))
    }

    const onChangeFahrenheit = () => {
        setIsFahrenheit(true)
        setIsCelsius(false)
        dispatch(citiesWeatherThunks.getSummaryWeather({location: city, degrees: 'imperial'}))
    }

    return (
        <div className={s.wrapper}>
            <img src={close} alt={close} onClick={onCloseHandler} className={s.iconClose}/>
            <div className={s.container}>
                <div className={s.cityBlock}>
                    <div className={s.cityWrapper}>
                        <span> {city}, </span>
                        <span>{country}</span>
                        <div>{date}</div>
                    </div>
                    <div className={s.descriptionWrapper}>
                        <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt={"weather"}
                             className={s.icon}/>
                        <div className={s.description}>{weatherDescription}</div>
                    </div>
                </div>

                <div className={s.temperatureBlock}>
                    <div>
                        <div className={s.tempWrapper}>
                            <span className={s.temp}>{tempCalculation(temp)}</span>
                            <span className={s.degrees}><button
                                onClick={onChangeCelsius}
                                className={isCelsius ? s.selectButton : ''}>°C</button> | <button
                                onClick={onChangeFahrenheit}
                                className={isFahrenheit ? s.selectButton : ''}>°F</button></span>
                        </div>
                        <div className={s.feelsLike}>Feels like: {tempCalculation(feelsLike)} °C</div>
                    </div>
                    <div className={s.information}>
                        <div>Wind: {wind.speed}<span className={s.item}>m/s</span></div>
                        <div>Humidity: {humidity}<span className={s.item}>%</span></div>
                        <div>Pressure: {pressure}<span className={s.item}>Pa</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default City;