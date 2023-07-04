import React from 'react';
import s from './City.module.css'
import close from '../../images/close.svg'
import {useAppSelector} from "../../hooks/useAppSelector";
import {
    citySelector,
    countrySelector,
    dateSelector,
    feelsLikeSelector,
    humiditySelector,
    pressureSelector,
    tempSelector,
    weatherSelector,
    windSelector
} from "../../../features/weather/weather.selectors";
import {tempCalculation} from "../../helpers/tempCalculation";

const City = () => {
    const city = useAppSelector(citySelector)
    const date = useAppSelector(dateSelector)
    const wind = useAppSelector(windSelector)
    const temp = useAppSelector(tempSelector)
    const feelsLike = useAppSelector(feelsLikeSelector)
    const humidity = useAppSelector(humiditySelector)
    const pressure = useAppSelector(pressureSelector)
    const country = useAppSelector(countrySelector)
    const weather = useAppSelector(weatherSelector)

    const weatherDescription = weather.map(m => m.main)
    const weatherIcon = weather.map(m => m.icon)

    const onCloseHandler = () => {

    }

    const onChangeDegrees = () => {

    }

    return (
        <div className={s.wrapper}>
            <div className={s.cityBlock}>
                <div className={s.cityWrapper}>
                    <span>{city}, </span>
                    <span>{country}</span>
                    <div>{date}</div>
                </div>
                <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt={"weather"} className={s.icon}/>
                <div>
                    <div>{weatherDescription}</div>
                    <img src={close} alt={close} onClick={onCloseHandler}/>
                </div>
            </div>

            <div className={s.temperatureBlock}>
                <div>
                    <span>{tempCalculation(temp)}</span>
                    <span className={s.degrees} onClick={onChangeDegrees}>°C | °F</span>
                    <div>Feels like: {tempCalculation(feelsLike)} °C</div>
                </div>
                <div className={s.information}>
                    <div>Wind: {wind.speed}m/s</div>
                    <div>Humidity: {humidity}%</div>
                    <div>Pressure: {pressure}Pa</div>
                </div>
            </div>
        </div>
    );
};

export default City;