import {instance} from "../../common/constants/instance";
import {CoordType, WeatherResponseType} from "../weather/weather.api";

export const citiesWeatherAPI = {
    findCity(cityName: string) {
        return instance.get<{
            city: FindCityResponseType
        }>(`forecast?q=${cityName}&appid=d8b8feb797d8d7246525255551517358`)
    },
    getLang(arg: LangType) {
        return instance.get<WeatherResponseType>(`forecast?id=${arg.id}&lang=${arg.lang}`)
    }
}

export type LangType = {
    id: string,
    lang: string
}


export type FindCityResponseType = {
    coord: CoordType
    country: string
    id: number
    name: string
    population: number
    sunrise: number
    sunset: number
    timezone: number
}