import React, {FC} from 'react';
import s from './City.module.css'
import close from '../../images/close.svg'
import {tempCalculation} from "../../helpers/tempCalculation";
import {WeatherResponseType} from "../../../features/weather/weather-api";

type CityPropsType = {
    city: string
    weather: WeatherResponseType
}

const City: FC<CityPropsType> = ({city, weather}) => {
    // const date = useAppSelector(dateSelector)
    const wind = weather.wind
    const temp = weather.main.temp
    const feelsLike = weather.main.feels_like
    const humidity = weather.main.humidity
    const pressure = weather.main.pressure
    const country = weather.sys.country

    const weatherDescription = weather.weather.description
    const weatherIcon = weather.weather.icon

    const onCloseHandler = () => {
    }

    const onChangeDegrees = () => {

    }

    return (
        <div className={s.wrapper}>
            <div className={s.cityBlock}>
                <div className={s.cityWrapper}>
                    <span> {city}</span>
                    <span>{country}</span>
                    {/*<div>{date}</div>*/}
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