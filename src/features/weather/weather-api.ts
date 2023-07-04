import {instance} from "../../common/constants/instance";
import {MainType, WeatherType} from "./weather.slice";

export const weatherAPI = {
    getSummary(arg: GetSummaryType){
        return instance.get<WeatherResponseType>(`weather?q=${arg.location}&appid=d8b8feb797d8d7246525255551517358&units=${arg.degrees}`)
    }
}

export type GetSummaryType = {
    location: string
    degrees?: any
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