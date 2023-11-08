import React, { useEffect } from 'react'
import City from '../citiesWeather/City'
import s from './weather.module.css'
import { citiesWeatherThunks, CityLocalType } from '../citiesWeather/citiesWeather.slice'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useTranslation } from 'react-i18next'
import { useInitData } from 'common/hooks/useInitData'

const Weather = () => {
  const cities: CityLocalType[] = useInitData()
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  // console.log('cities*****', cities)
  // console.log('LANG', i18n.language)

  useEffect(() => {
    cities.forEach((city) =>
      dispatch(
        citiesWeatherThunks.getSummaryWeather({
          location: city.name,
          degrees: city.degrees,
          lang: i18n.language,
          id: city.id,
        }),
      ),
    )
  }, [i18n.language])

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
