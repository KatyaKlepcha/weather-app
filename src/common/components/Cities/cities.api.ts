import {instance} from "../../constants/instance";

export const citiesAPI = {
    getCities(cityName: string){
        return instance.get(`forecast?q=${cityName}&appid=d8b8feb797d8d7246525255551517358`)
    }
}
