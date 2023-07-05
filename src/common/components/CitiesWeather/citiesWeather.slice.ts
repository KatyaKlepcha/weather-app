import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetSummaryType, weatherAPI, WeatherResponseType} from "../../../features/weather/weather-api";
import {appActions} from "../../../app/app.slice";
import {citiesAPI} from "../Cities/cities.api";
import {setToLocalStorage} from "../../utils/setToLocalStorage";
import {getFromLocalStorage} from "../../utils/getFromLocalStorage";

const initialState = {
    citiesWeather: {} as CitiesWeatherType
}

export type CitiesWeatherType = {
    [key: string]: WeatherResponseType
}


const getSummaryWeather = createAsyncThunk<{
    city: string,
    weather: WeatherResponseType
}, string>('citiesWeather/getSummaryWeather', async (city, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: "loading"}))
    try {
        const res = await weatherAPI.getSummary({location: city} as GetSummaryType)
        dispatch(appActions.setAppStatus({status: "idle"}))
        return {city, weather: res.data}
    } catch (e) {
        return rejectWithValue(null)
    }
})

const findCity = createAsyncThunk<any, string>('citiesWeather/findCity', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: "loading"}))

    try {
        const res = await citiesAPI.findCity(arg)
        const city = res.data.city.name

        dispatch(appActions.setAppStatus({status: "idle"}))
        const test = getFromLocalStorage('current-city')
        setToLocalStorage([city, ...test ], 'current-city')
        dispatch(citiesWeatherActions.setCities({cities: [city, ...test]}))
        dispatch(citiesWeatherThunks.getSummaryWeather(city))
        // return res.data.city.name
    } catch (e) {
        return rejectWithValue(null)
    }
})

const firstLoading = createAsyncThunk<any, string[]>('citiesWeather/firstLoading', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: "loading"}))

    try {
        dispatch(citiesWeatherActions.setCities({cities: arg}))
        arg.forEach(t => dispatch(citiesWeatherThunks.getSummaryWeather(t)))
        dispatch(appActions.setAppStatus({status: "idle"}))

    } catch (e) {
        return rejectWithValue(null)
    }
})

export const slice = createSlice({
    name: 'citiesWeather',
    initialState: initialState,
    reducers: {
        setCities: (state, action: PayloadAction<{ cities: string[] }>) => {
            state.citiesWeather = action.payload.cities.reduce((acc, cur) => {
                    acc[cur] = state.citiesWeather[cur] || {} as WeatherResponseType;
                    return acc
                }, {} as CitiesWeatherType
            )
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSummaryWeather.fulfilled, (state, action) => {
                state.citiesWeather[action.payload.city] = action.payload.weather
            })
    },
})

export const citiesWeatherReducer = slice.reducer;
export const citiesWeatherActions = slice.actions;
export const citiesWeatherThunks = {getSummaryWeather, findCity, firstLoading}