import { useEffect, useState } from 'react'
import { citiesWeatherThunks, CityLocalType } from 'features/citiesWeather/citiesWeather.slice'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { selectCityLocal } from 'features/citiesWeather/cities.selector'
import { getGeocode } from 'use-places-autocomplete'
import { getBrowserLocation } from 'common/utils/geolocation'
import { useTranslation } from 'react-i18next'

export const useInitData = () => {
  const cities = useAppSelector(selectCityLocal)
  const { i18n } = useTranslation()
  const [city, setCity] = useState<CityLocalType>({} as CityLocalType)
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (cities.length !== 0) {
      return
    }
    getBrowserLocation()
      .then((coord) => {
        const parameter: google.maps.GeocoderRequest = {
          location: coord,
          language: i18n.language,
        }
        return getGeocode(parameter)
      })
      .then((results) => {
        setCity({
          name: results[0].address_components[3].short_name,
          id: results[0].place_id.split('_')[0],
          degrees: 'metric',
        })
        setIsLoaded(true)
      })
      .catch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities])

  useEffect(() => {
    if (!isLoaded) return
    dispatch(
      citiesWeatherThunks.getSummaryWeather({
        location: city.name,
        degrees: city.degrees,
        lang: i18n.language,
        id: city.id,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded])
  return cities
}
