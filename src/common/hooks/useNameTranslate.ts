import { LangsType } from 'features/citiesWeather/cities.selector'
import { useEffect, useState } from 'react'
import { getGeocode } from 'use-places-autocomplete'
import { CityLocalType } from 'features/citiesWeather/citiesWeather.slice'

export const useNameTranslate = (city: CityLocalType, lang: LangsType | string) => {
  const [cityName, setCityName] = useState<string>('')

  console.log('city.id', city.id)
  useEffect(() => {
    const parameter: google.maps.GeocoderRequest = {
      placeId: String(city.id),
      language: lang,
    }
    console.log('parameter', parameter)
    // console.log('getGeocode(parameter)', getGeocode(parameter))
    getGeocode(parameter)
      .then((results) => {
        console.log('results', results)
        setCityName(results[0].address_components[0].long_name)
      })
      .catch((e) => {
        console.log('catch', e)
        setCityName(city.name)
      })
  }, [city.name, city.id, lang])
  return cityName
}
