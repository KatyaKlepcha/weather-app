import {instance} from "../../common/constants/instance";

export const weatherApi = {
    getSummary(arg: GetSummaryType) {
        return instance.get<WeatherResponseType>(`weather?q=${arg.location}&appid=3ead9c6dddebfc8ac892957bcb957604&units=${arg.degrees}&lang=ru`)
    },
}

export type DegreesTempType = 'metric' | 'imperial'

export type GetSummaryType = {
    location: string
    degrees: DegreesTempType
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