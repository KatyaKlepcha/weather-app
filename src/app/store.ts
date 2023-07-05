import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {appReducer} from "./app.slice";
import {citiesWeatherReducer} from "../common/components/CitiesWeather/citiesWeather.slice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        citiesWeather: citiesWeatherReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;


