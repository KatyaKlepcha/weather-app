import {configureStore, ThunkAction, Action, getDefaultMiddleware} from '@reduxjs/toolkit';
import {appReducer} from "./app.slice";
import {weatherReducer} from "../features/weather/weather.slice";
import {citiesReducer} from "../common/components/Cities/cities.slice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        weather: weatherReducer,
        cities: citiesReducer
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false,
        }),
    ],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;


