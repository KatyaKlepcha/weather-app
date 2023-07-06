import {instance} from "../../common/constants/instance";
import {CoordType} from "../weather/weather-api";

export const citiesWeatherAPI = {
    findCity(cityName: string) {
        return instance.get<{
            city: FindCityResponseType
        }>(`forecast?q=${cityName}&appid=d8b8feb797d8d7246525255551517358`)
    }
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