import React, {FC} from 'react';
import s from './City.module.css'
import close from '../../common/images/close.svg'
import {tempCalculation} from "../../common/helpers/tempCalculation";
import {WeatherResponseType} from "../weather/weather.api";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {format} from 'date-fns';

type CityPropsType = {
    city: string
    weather: WeatherResponseType & { degrees: string }
}

const City: FC<CityPropsType> = ({city, weather}) => {

    // const [citiesWeather, setCitiesWeather] = useState<{
    //     city: string,
    //     weather: WeatherResponseType,
    //     degrees: DegreesTempType
    // }>()

    const celsius =  'metric'

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

    // useEffect(() => {
    //     dispatch(citiesWeatherThunks.getSummaryWeather({
    //         location: name,
    //         degrees: 'metric'
    //     })).unwrap().then(res => setCitiesWeather(res))
    //
    // }, [])

    const onCloseHandler = () => {
        // dispatch(citiesWeatherActions.deleteCity({city}))
    }
    // const onChangeCelsius = () => {
    //     dispatch(citiesWeatherThunks.getSummaryWeather({
    //         location: city,
    //         degrees: 'metric'
    //     }))
    // }

    const onChangeFahrenheit = () => {
        // dispatch(citiesWeatherThunks.getSummaryWeather({location: city, degrees: 'imperial'}))
    }

    return (
        // <div>{name}</div>
        <div className={s.wrapper}>
            <img src={close} alt={close} onClick={onCloseHandler} className={s.iconClose}/>
            <div className={s.container}>
                <div className={s.cityBlock}>
                    <div className={s.cityWrapper}>
                        <span> {city}, </span>
                        <span>{country}</span>
                        {/*<div>{date}</div>*/}
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
                            <span className={s.degrees}><button
                                // onClick={onChangeCelsius}
                                className={celsius ? s.selectButton : ''}>°C</button> | <button
                                onClick={onChangeFahrenheit}
                                className={!celsius ? s.selectButton : ''}>°F</button></span>
                        </div>
                        <div className={s.feelsLike}>Feels
                            like: {feelsLike && tempCalculation(feelsLike)} {celsius ? '°C' : '°F'}</div>
                    </div>
                    <div className={s.information}>
                        {/*<div>Wind: {wind}<span className={s.item}>m/s</span></div>*/}
                        <div>Humidity: {humidity}<span className={s.item}>%</span></div>
                        <div>Pressure: {pressure}<span className={s.item}>Pa</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default City;