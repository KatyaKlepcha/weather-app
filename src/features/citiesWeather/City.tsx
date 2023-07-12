import React, { FC, memo, useEffect, useState } from 'react'
import { ReactComponent as CloseIcon } from 'assets/images/closeIcon.svg'
import s from './City.module.css'
import { citiesWeatherActions, citiesWeatherThunks, CityLocalType } from './citiesWeather.slice'
import { DegreesTempType } from '../weather/weather.api'
import { format } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import { useTranslation } from 'react-i18next'
import { Area, AreaChart, ResponsiveContainer, XAxis } from 'recharts'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { tempCalculation } from 'common/helpers/tempCalculation'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { ru, enUS } from 'date-fns/locale'

type CityPropsType = {
  city: CityLocalType
  degrees: DegreesTempType
}

const City: FC<CityPropsType> = memo(({ city, degrees }) => {
  const weather = useAppSelector((state) => state.citiesWeather.city[city.name])
  const dispatch = useAppDispatch()
  const celsius = degrees === 'metric'
  const { t, i18n } = useTranslation()

  const [dateForecast, setDateForecast] = useState([])

  useEffect(() => {
    dispatch(citiesWeatherThunks.getForecast(city.name))
      .unwrap()
      .then((res) => {
        if (res) {
          return setDateForecast(res)
        }
      })
  }, [])

  if (!weather) {
    return <h1>LOADING</h1>
  }

  const today1 = format(new Date(), 'EEE, MMM')
  const today = new Date()
  const timeZone = 'Europe/Minsk'
  //const timeZone = weather.timezone
  const timeInBrisbane = zonedTimeToUtc(today, timeZone)

  const date = format(timeInBrisbane, 'EEE, d MMMM, HH:mm')

  const wind = weather.wind.speed
  const temp = weather.main.temp
  const feelsLike = weather.main.feels_like
  const humidity = weather.main.humidity
  const pressure = weather.main.pressure
  const country = weather.sys.country

  const weatherDescription = weather.weather[0].main
  const weatherIcon = weather.weather[0].icon

  const onCloseHandler = () => {
    dispatch(citiesWeatherActions.deleteCity({ city: city.name }))
  }

  const onChangeTemp = (value: DegreesTempType) => {
    dispatch(citiesWeatherThunks.changeDegrees({ location: city.name, degrees: value }))
  }

  const renderLineChart = (
    <ResponsiveContainer width="100%" height="100%" className={s.rechartsContainer}>
      <AreaChart width={600} height={300} data={dateForecast}>
        <XAxis dataKey="date" className={s.chart} />
        <Area
          type="monotone"
          dataKey="temp"
          stroke="none"
          fill="#ffc0cb"
          className={s.area}
          // label={renderCustomBarLabel}
        />
      </AreaChart>
    </ResponsiveContainer>
  )

  return (
    <div className={s.wrapper}>
      <div className={s.iconClose}>
        <CloseIcon onClick={onCloseHandler} className={s.iconClose} fill={'#808080'} />
      </div>
      <div className={s.container}>
        <div className={s.cityBlock}>
          <div className={s.cityWrapper}>
            <span> {city.name}, </span>
            <span>{t('country', { country })}</span>
            <div>{String(date)}</div>
          </div>
          <div className={s.descriptionWrapper}>
            <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt={'weather'} className={s.icon} />
            <div className={s.description}>{weatherDescription}</div>
          </div>
        </div>
        {renderLineChart}
        <div className={s.temperatureBlock}>
          <div>
            <div className={s.tempWrapper}>
              <span className={s.temp}>{temp && tempCalculation(temp)}</span>
              <span className={s.degrees}>
                <button onClick={() => onChangeTemp('metric')} className={celsius ? s.selectButton : ''}>
                  °C
                </button>
                |{' '}
                <button onClick={() => onChangeTemp('imperial')} className={!celsius ? s.selectButton : ''}>
                  °F
                </button>
              </span>
            </div>
            <div className={s.feelsLike}>
              {t('FeelsLike')}: {feelsLike && tempCalculation(feelsLike)} {celsius ? '°C' : '°F'}
            </div>
          </div>
          <div className={s.information}>
            <div>
              {t('Wind')}: {wind}
              <span className={s.item}>m/s</span>
            </div>
            <div>
              {t('Humidity')}: {humidity}
              <span className={s.item}>%</span>
            </div>
            <div>
              {t('Pressure')}: {pressure}
              <span className={s.item}>Pa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default City
