import { useEffect, useState } from 'react'
import { GetSummaryType, weatherApi, WeatherResponseType } from 'features/weather/weather.api'
import s from './ListItemFetch.module.css'
import { citiesWeatherThunks } from 'features/citiesWeather/citiesWeather.slice'
import { useAppDispatch } from 'common/hooks/useAppDispatch'

type ListItemFetchProps = {
  suggestion: google.maps.places.AutocompletePrediction
  handleClick: (city: GetSummaryType) => void
}

const ListItemFetch = ({
  suggestion: {
    place_id,
    structured_formatting: { main_text, secondary_text },
  },
  handleClick,
}: ListItemFetchProps) => {
  const [data, setData] = useState<null | WeatherResponseType>(null)
  // console.log('data**********', data)
  const dispatch = useAppDispatch()
  useEffect(() => {
    weatherApi
      .getSummary({ location: main_text, degrees: 'metric' })
      .then(({ data }) => {
        setData(data)
      })
      .catch(() => setData(null))
    // dispatch(citiesWeatherThunks.getSummaryWeather({ location: main_text, degrees: 'metric' })).then((res: any) => {
    //   console.log('resRES', res)
    //   console.log('res', res.payload.weather)
    //   // if (res.payload) {
    //   setData(res.payload.weather)
    //   // }
    // })
  }, [dispatch, main_text])

  if (!data) return null

  return (
    <ul
      tabIndex={0}
      onClick={() =>
        handleClick({
          id: place_id,
          location: main_text,
          degrees: 'metric',
        })
      }
      className={s.listItem}
    >{`${main_text}, ${data.sys.country}`}</ul>
  )
}

export default ListItemFetch
