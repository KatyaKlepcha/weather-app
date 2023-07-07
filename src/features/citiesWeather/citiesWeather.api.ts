import {instance} from "../../common/constants/instance";
import {CoordType, WeatherResponseType} from "../weather/weather.api";

export const citiesWeatherAPI = {
    getCurrentGeolocation(arg: CoordType){
        return instance.get<{ city: FindCityResponseType}>(`reverse?lat=${arg.lat}&lon=${arg.lon}&limit=5&appid=3ead9c6dddebfc8ac892957bcb957604`)
    },
    findCity(cityName: string) {
        return instance.get<{
            city: FindCityResponseType
        }>(`forecast?q=${cityName}&appid=3ead9c6dddebfc8ac892957bcb957604`)
    },
    // getLang(arg: LangType, ) {
    //     return instance.get<WeatherResponseType>(`weather?lat=${arg.lat}&lon=${arg.lon}&appid=7a8436536bd32b341051248c0c18743f&lang=${arg.lang}`)
    // }
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