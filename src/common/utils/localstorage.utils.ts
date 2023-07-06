import {RootState} from "../../app/store";
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

export const saveState = (state: CitiesWeatherType ) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cities', serializedState);
    } catch {
        // ignore write errors
    }
};