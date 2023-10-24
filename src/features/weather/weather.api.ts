import { instance } from 'common/constants/instance'

export const weatherApi = {
  getSummary(arg: GetSummaryType) {
    return instance.get<WeatherResponseType>(
      `weather?q=${arg.location}&appid=${process.env.REACT_APP_API_KEY}&units=${arg.degrees}&lang=${arg.lang}`,
    )
  },
  getCurrentGeolocation(arg: CoordType) {
    return instance
      .get<WeatherResponseType>(
        `weather?lat=${arg.lat}&lon=${arg.lng}&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
      )
      .then((res) => res.data)
  },
  getForecast(city: string) {
    return instance.get<ResponseListType>(`forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
  },
}

export type DegreesTempType = 'standard' | 'metric' | 'imperial'

export type GetSummaryType = {
  location: string
  degrees: DegreesTempType
  lang?: string
  id?: number
}

export type WeatherResponseType = {
  base: string
  clouds: CloudsType
  cod: number
  coord: CoordType
  dt: number
  id: number
  main: MainType
  name: string
  sys: SysType
  timezone: number
  visibility: number
  weather: WeatherType[]
  wind: WindType
}

export type WeatherType = {
  description: string
  icon: string
  id: number
  main: string
}

export type MainType = {
  feels_like: number
  grnd_level: number
  humidity: number
  pressure: number
  sea_level: number
  temp: number
  temp_max: number
  temp_min: number
}

export type CloudsType = {
  all: number
}

export type CoordType = {
  lat: number
  lng: number
}

export type SysType = {
  country: string
  id: number
  sunrise: number
  sunset: number
  type: number
}

export type WindType = {
  deg: number
  gust: number
  speed: number
}

// export type LangsType = {
//   id: string
//   lang: string
// }

export type ResponseListType = {
  list: ListType[]
}

export type ListType = {
  clouds: CloudsType
  dt: number
  dt_txt: string
  main: MainType
  pop: number
  sys: { pod: string }
  visibility: number
  weather: WeatherType[]
  wind: WindType
}
