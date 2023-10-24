import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import s from 'common/components/PlacesAutocomplete/PlacesAutocomplete.module.css'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useTranslation } from 'react-i18next'
import { selectCityLocal } from 'features/citiesWeather/cities.selector'
import usePlacesAutocomplete from 'use-places-autocomplete'
import ListItemFetch from 'features/listItemFetch/ListItemFetch'
import { citiesWeatherThunks } from 'features/citiesWeather/citiesWeather.slice'
import { GetSummaryType } from 'features/weather/weather.api'

type PropsType = {
  isLoaded: boolean
}

const PlacesAutocomplete: FC<PropsType> = ({ isLoaded }) => {
  const [error, setError] = useState<string | null>(null)
  const [currentCity, setCurrentCity] = useState<GetSummaryType | null>(null)

  const {
    ready,
    value,
    init,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    requestOptions: {
      types: ['(cities)'],
      language: 'en',
    },
    debounce: 300,
  })

  const cityLocal = useAppSelector(selectCityLocal)

  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setCurrentCity(null)
    setError(null)
  }

  const handleSelect = (city: GetSummaryType) => {
    setValue(`${city.location}`, false)
    setCurrentCity(city)
    setError(null)
    clearSuggestions()
  }

  const onAddCity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const index = cityLocal.findIndex((city) => city.name === currentCity?.location)
    if (currentCity) {
      dispatch(citiesWeatherThunks.getSummaryWeather(currentCity))
    } else {
      setError('Enter city name to search')
    }
    if (index !== -1) {
      setError('A city with the same name has already been found')
    }
  }

  useEffect(() => {
    if (isLoaded) {
      init()
    }
  }, [init, isLoaded])

  return (
    <div className={s.searchContainer}>
      <div className={s.wrapper}>
        <input className={s.input} disabled={!ready} value={value} onChange={onChangeHandler} />
        <button className={s.buttonAdd} onClick={onAddCity}>
          {t('button')}
        </button>
      </div>
      {status === 'OK' && (
        <div className={s.list}>
          {data.map((suggestion) => {
            return <ListItemFetch key={suggestion.place_id} handleClick={handleSelect} suggestion={suggestion} />
          })}
        </div>
      )}
      {error && <div className={s.error}>{error}</div>}
    </div>
  )
}

export default PlacesAutocomplete
