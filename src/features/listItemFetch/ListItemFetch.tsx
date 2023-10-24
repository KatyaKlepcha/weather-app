import { useEffect, useState } from 'react'
import { GetSummaryType, weatherApi, WeatherResponseType } from 'features/weather/weather.api'
import s from './ListItemFetch.module.css'

type ListItemFetchProps = {
  suggestion: google.maps.places.AutocompletePrediction
  handleClick: (city: GetSummaryType) => void
}

const ListItemFetch = ({
  suggestion: {
    structured_formatting: { main_text, secondary_text },
  },
  handleClick,
}: ListItemFetchProps) => {
  const [data, setData] = useState<null | WeatherResponseType>(null)
  useEffect(() => {
    weatherApi
      .getSummary({ location: main_text, degrees: 'metric' })
      .then(({ data }) => {
        setData(data)
      })
      .catch(() => setData(null))
  }, [main_text])

  if (!data) return null

  return (
    <ul
      tabIndex={0}
      onClick={() =>
        handleClick({
          location: main_text,
          degrees: 'metric',
        })
      }
      className={s.listItem}
    >{`${main_text}, ${data.sys.country}`}</ul>
  )
}

export default ListItemFetch
