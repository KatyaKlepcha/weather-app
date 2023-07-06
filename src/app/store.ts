import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {appReducer} from "./app.slice";
import {citiesWeatherReducer} from "../features/citiesWeather/citiesWeather.slice";
import {loadState, saveState} from "../common/utils/localstorage.utils";

export const store = configureStore({
    reducer: {
        app: appReducer,
        citiesWeather: citiesWeatherReducer
    },
    preloadedState: {citiesWeather: {citiesWeather:loadState()}}
});


store.subscribe(() => {
    saveState({
        ...store.getState().citiesWeather.citiesWeather
    });
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;


