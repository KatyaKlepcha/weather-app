import {CityLocalType} from "../../features/citiesWeather/citiesWeather.slice";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cities');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState) as CityLocalType[];
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: CityLocalType[]) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cities', serializedState);
    } catch {
        // ignore write errors
    }
};