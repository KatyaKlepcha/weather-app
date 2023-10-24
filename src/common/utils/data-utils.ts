import { DegreesTempType } from 'features/weather/weather.api'
import { LangsType } from 'features/citiesWeather/cities.selector'
import { format } from 'date-fns'

export const getIsAbove = (temp: number | string, degrees: DegreesTempType): boolean => {
  if (degrees === 'imperial') {
    return temp > 32
  }
  if (degrees === 'standard') {
    return temp > 273
  }

  return temp > 0
}

export const getLocaleDate = (date: number, lang: string | LangsType) => {
  const now = new Date(date * 1000)
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    weekday: 'short',
  }

  const localeDate =
    lang === 'en' ? new Intl.DateTimeFormat('en-Uk', dateOptions) : new Intl.DateTimeFormat(lang, dateOptions)

  // const time = dayjs.unix(date).format('HH:mm')
  const time = format(date, 'HH:mm')

  return `${localeDate.format(now)}, ${time}`
}
