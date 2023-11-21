import React from 'react'
import City from '../citiesWeather/City'
import s from './weather.module.css'
import { CityLocalType } from '../citiesWeather/citiesWeather.slice'
import { useInitData } from 'common/hooks/useInitData'

const Weather = () => {
  const cities: CityLocalType[] = useInitData()

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
