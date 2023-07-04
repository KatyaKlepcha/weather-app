import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

export const API_KEY = "AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs"