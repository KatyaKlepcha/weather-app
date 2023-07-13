import React, { useEffect } from 'react'
import City from '../citiesWeather/City'
import { useAppSelector } from 'common/hooks/useAppSelector'
import s from './weather.module.css'
import { citiesWeatherThunks, CityLocalType } from '../citiesWeather/citiesWeather.slice'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { selectCityLocal } from 'features/citiesWeather/cities.selector'
import { useTranslation } from 'react-i18next'

const Weather = () => {
  const cities: CityLocalType[] = useAppSelector(selectCityLocal)
  const dispatch = useAppDispatch()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(
        citiesWeatherThunks.getCurrentGeolocation({
          lat: +position.coords.latitude.toFixed(4),
          lon: +position.coords.longitude.toFixed(4),
        }),
      )
    })

    cities.forEach((city) =>
      dispatch(
        citiesWeatherThunks.getSummaryWeather({
          location: city.name,
          degrees: city.degrees,
          lang: i18n.language,
        }),
      ),
    )
  }, [])

  return (
    <div className={s.wrapper}>
      <div className={s.citiesWrapper}>
        {cities.map((city) => {
          return <City key={city.id} city={city} degrees={city.degrees} />
        })}
      </div>
    </div>
  )
}

export default Weather
