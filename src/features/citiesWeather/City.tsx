import React, {FC, memo, useEffect} from 'react';
import s from './City.module.css'
import close from '../../common/images/close.svg'
import {tempCalculation} from "../../common/helpers/tempCalculation";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {citiesWeatherActions, citiesWeatherThunks} from "./citiesWeather.slice";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {DegreesTempType} from "../weather/weather.api";
import {format, parse} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import {formatInTimeZone, toDate, utcToZonedTime, zonedTimeToUtc} from 'date-fns-tz';
import {useTranslation} from "react-i18next";


type CityPropsType = {
    city: string
    degrees: DegreesTempType
}

const City: FC<CityPropsType> = memo(({city, degrees}) => {
    const weather = useAppSelector(state => state.citiesWeather.city[city])
    const dispatch = useAppDispatch()
    const celsius = degrees === 'metric'
    const {t} = useTranslation()

    if (!weather) {
        return <h1>LOADING</h1>
    }

    const today = new Date(); // Wed Sep 16 2020 13:25:16
    const timeZone = 'Europe/Minsk'; // Let's see what time it is Down Under
    //const timeZone = weather.timezone
    const timeInBrisbane = zonedTimeToUtc(today, timeZone);
    const date = format(timeInBrisbane, 'EEE, d MMMM, HH:mm')

    // const today = new Date(weather.dt)
    // const timeZone = toDate(weather.timezone)
    //
    // const timeInBrisbane = zonedTimeToUtc(today, timeZone);
    // const date = format(timeInBrisbane, 'EEE, d MMMM, HH:mm')
    // console.log('timeZone', timeZone)
    // formatInTimeZone(date, timeZone, 'EEE, d MMMM, HH:mm')

    const wind = weather.wind.speed
    const temp = weather.main.temp
    const feelsLike = weather.main.feels_like
    const humidity = weather.main.humidity
    const pressure = weather.main.pressure
    const country = weather.sys.country


    const weatherDescription = weather.weather[0].main
    const weatherIcon = weather.weather[0].icon


    const onCloseHandler = () => {
        dispatch(citiesWeatherActions.deleteCity({city}))
    }

    const onChangeTemp = (value: DegreesTempType) => {
        dispatch(citiesWeatherThunks.changeDegrees({location: city, degrees: value}))
    }


    return (
        <div className={s.wrapper}>
            <img src={close} alt={close} onClick={onCloseHandler} className={s.iconClose}/>
            <div className={s.container}>
                <div className={s.cityBlock}>
                    <div className={s.cityWrapper}>
                        <span> {t("city", {city})}, </span>
                        <span>{t("country", {country})}</span>
                        <div>{String(date)}</div>
                    </div>
                    <div className={s.descriptionWrapper}>
                        <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`}
                             alt={"weather"}
                             className={s.icon}/>
                        <div className={s.description}>{weatherDescription}</div>
                    </div>
                </div>

                <div className={s.temperatureBlock}>
                    <div>
                        <div className={s.tempWrapper}>
                            <span
                                className={s.temp}>{temp && tempCalculation(temp)}</span>
                            <span className={s.degrees}>
                                <button onClick={() => onChangeTemp('metric')}
                                        className={celsius ? s.selectButton : ''}>°C</button>
                                | <button onClick={() => onChangeTemp('imperial')}
                                          className={!celsius ? s.selectButton : ''}>°F</button>
                            </span>
                        </div>
                        <div className={s.feelsLike}>{t("FeelsLike")}: {feelsLike && tempCalculation(feelsLike)} {celsius ? '°C' : '°F'}</div>
                    </div>
                    <div className={s.information}>
                        <div>{t("Wind")}: {wind}<span className={s.item}>m/s</span></div>
                        <div>{t("Humidity")}: {humidity}<span className={s.item}>%</span></div>
                        <div>{t("Pressure")}: {pressure}<span className={s.item}>Pa</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default City;