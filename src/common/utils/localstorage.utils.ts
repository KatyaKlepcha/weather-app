import {CitiesWeatherType} from "../../features/citiesWeather/citiesWeather.slice";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cities');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

// export const saveState = (state: CitiesWeatherType ) => {
export const saveState = (state: {} ) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cities', serializedState);
    } catch {
        // ignore write errors
    }
};