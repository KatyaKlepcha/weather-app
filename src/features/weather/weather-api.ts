import {instance} from "../../common/constants/instance";

export const weatherAPI = {
    getSummary(arg: GetSummaryType) {
        return instance.get<WeatherResponseType>(`weather?q=${arg.location}&appid=d8b8feb797d8d7246525255551517358&units=${arg?.degrees}`)
    }
}

type DegreesTempType = 'metric' | 'imperial'

export type GetSummaryType = {
    location: string
    degrees?: DegreesTempType
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
    description: string;
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
    lon: number
}

export type SysType = {
    country: string
    id: number
    sunrise: number //timestamp
    sunset: number //timestamp
    type: number
}

export type WindType = {
    deg: number
    gust: number
    speed: number
}