import {RootState} from "../../app/store";

export const weatherSelector = (state: RootState) => state.weather.weather
// export const descriptionSelector = (state: RootState) => weatherSelector(state
export const citySelector = (state: RootState) => state.weather.currentCity
export const dateSelector = (state: RootState) => state.weather.currentDate
export const timeSelector = (state: RootState) => state.weather.currentTime
export const windSelector = (state: RootState) => state.weather.wind
export const mainSelector = (state: RootState) => state.weather.main
export const tempSelector = (state: RootState)=> mainSelector(state).temp
export const humiditySelector = (state: RootState)=> mainSelector(state).humidity
export const feelsLikeSelector = (state: RootState)=> mainSelector(state).feels_like
export const pressureSelector = (state: RootState)=> mainSelector(state).pressure
export const sysSelector = (state: RootState)=> state.weather.sys
export const countrySelector = (state: RootState)=> sysSelector(state).country