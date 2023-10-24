import React, { FC, memo, useEffect, useState } from 'react'
import { ReactComponent as CloseIcon } from 'assets/images/closeIcon.svg'
import s from './City.module.css'
import { citiesWeatherActions, citiesWeatherThunks, CityLocalType, PartListType } from './citiesWeather.slice'
import { DegreesTempType } from '../weather/weather.api'
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { tempCalculation } from 'common/helpers/tempCalculation'
import { useAppSelector } from 'common/hooks/useAppSelector'
import ForecastAriaChart from 'common/components/ForecastAreaChart/ForecastAreaChart'
import { getIsAbove, getLocaleDate } from 'common/utils/data-utils'
import { LangsType } from 'features/citiesWeather/cities.selector'
import { useNameTranslate } from 'common/hooks/useNameTranslate'

type CityPropsType = {
  city: CityLocalType
  degrees: DegreesTempType
}

const City: FC<CityPropsType> = memo(({ city, degrees }) => {
  const weather = useAppSelector((state) => state.citiesWeather.city[city.name])
  const dispatch = useAppDispatch()
  const celsius = degrees === 'metric'
  const { t, i18n } = useTranslation()
  const cityName = useNameTranslate(city, i18n.languages[0])
  // console.log('i18n.languages[0]', i18n.languages[0])

  const [dateForecast, setDateForecast] = useState<PartListType[]>([])

  useEffect(() => {
    dispatch(citiesWeatherThunks.getForecast(city.name))
      .unwrap()
      .then((res) => {
        if (res) {
          return setDateForecast(res)
        }
      })
  }, [])
  if (!weather) return null

  const today = new Date()
  const timeZone = 'Europe/Minsk'
  const timeInBrisbane = utcToZonedTime(today, timeZone)

  const date = format(timeInBrisbane, 'EEE, d MMMM, HH:mm')

  const wind = weather.wind.speed
  const temp = tempCalculation(weather.main.temp)
  const feelsLike = weather.main.feels_like
  const humidity = weather.main.humidity
  const pressure = weather.main.pressure
  const country = weather.sys.country

  const weatherDescription = weather.weather[0].description
  const weatherIcon = weather.weather[0].icon
  const isAbove = getIsAbove(temp, city.degrees)

  const onCloseHandler = () => {
    dispatch(citiesWeatherActions.deleteCity({ city: city.name }))
  }

  const onChangeTemp = (value: DegreesTempType) => {
    dispatch(citiesWeatherThunks.changeDegrees({ location: city.name, degrees: value }))
  }

  const uniqueDataForecast = dateForecast.reduce((acc: { date: string; temp: number }[], cur) => {
    if (!acc.some((item) => item.temp === cur.temp)) {
      acc.push(cur)
    }
    return acc
  }, [])

  return (
    <div className={temp > 0 ? s.wrapper : s.wrapper + ' ' + s.wrapperNeg}>
      <CloseIcon onClick={onCloseHandler} className={s.iconClose} fill={'#808080'} />
      <div className={s.container}>
        <div className={s.cityBlock}>
          <div className={s.cityWrapper}>
            <span> {cityName}, </span>
            <span>{country}</span>
            <div>{getLocaleDate(weather.dt, i18n.languages[0])}</div>
          </div>
          <div className={s.descriptionWrapper}>
            <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt={'weather'} className={s.icon} />
            <div className={s.description}>{weatherDescription}</div>
          </div>
        </div>
        <ForecastAriaChart chartData={uniqueDataForecast} isAbove={isAbove} />
        <div className={s.temperatureBlock}>
          <div>
            <div className={s.tempWrapper}>
              <span className={s.temp}>{temp}</span>
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
              <span className={temp > 0 ? s.item : s.itemNeg}>m/s</span>
            </div>
            <div>
              {t('Humidity')}: {humidity}
              <span className={temp > 0 ? s.item : s.itemNeg}>%</span>
            </div>
            <div>
              {t('Pressure')}: {pressure}
              <span className={temp > 0 ? s.item : s.itemNeg}>Pa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default City
