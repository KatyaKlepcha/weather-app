import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CoordType, DegreesTempType, GetSummaryType, weatherApi, WeatherResponseType} from "../weather/weather.api";
import {appActions} from "../../app/app.slice";
import {citiesWeatherAPI, LangType} from "./citiesWeather.api";
import {getFromLocalStorage} from "../../common/utils/getFromLocalStorage";
import {setToLocalStorage} from "../../common/utils/setToLocalStorage";

const initialState = {
    citiesWeather: {} as CitiesWeatherType
}

export type CitiesWeatherType = {
    [key: string]: WeatherResponseType & { degrees: string }
}

const firstLoading = createAsyncThunk<any, string[]>('citiesWeather/firstLoading', async (arg, thunkAPI) => {
    console.log('firstLoading')
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: "loading"}))

    try {
        dispatch(citiesWeatherActions.setCities({cities: arg}))
        arg.forEach(t => dispatch(citiesWeatherThunks.getSummaryWeather({location:t, degrees: "metric"})))
        dispatch(appActions.setAppStatus({status: "idle"}))

    } catch (e) {
        return rejectWithValue(null)
    }
})

const getCurrentGeolocation = createAsyncThunk<any, CoordType>('citiesWeather/getCurrentGeolocation', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: "loading"}))
    try {
        const res = await citiesWeatherAPI.getCurrentGeolocation(arg)
        dispatch(appActions.setAppStatus({status: "idle"}))
        console.log('res.data', res.data)
        return res.data
    } catch (e) {
        return rejectWithValue(null)
    }
})


const getSummaryWeather = createAsyncThunk<{
    city: string, weather: WeatherResponseType, degrees: DegreesTempType
}, GetSummaryType>('citiesWeather/getSummaryWeather', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    // dispatch(appActions.setAppStatus({status: "loading"}))
    try {
        const res = await weatherApi.getSummary({location: arg.location, degrees: arg.degrees} as GetSummaryType)
        // dispatch(appActions.setAppStatus({status: "idle"}))
        return {city: arg.location, weather: res.data, degrees: arg.degrees}
    } catch (e) {
        return rejectWithValue(null)
    }
})

const findCity = createAsyncThunk<any, string>('citiesWeather/findCity', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    // dispatch(appActions.setAppStatus({status: "loading"}))

    try {
        const res = await citiesWeatherAPI.findCity(arg)
        const city = res.data.city.name

        // dispatch(appActions.setAppStatus({status: "idle"}))
        const test = getFromLocalStorage('current-city')
        setToLocalStorage([city, ...test ], 'current-city')
        dispatch(citiesWeatherActions.setCities({cities: [city, ...test]}))
        dispatch(citiesWeatherThunks.getSummaryWeather({location: city, degrees: 'metric'}))
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
        deleteCity: (state, action: PayloadAction<{ city: string }>) => {
            //delete state.citiesWeather[action.payload.city]
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSummaryWeather.fulfilled, (state, action) => {
                state.citiesWeather[action.payload.city] = {...action.payload.weather, degrees: action.payload.degrees}
            })
    },
})

export const citiesWeatherReducer = slice.reducer;
export const citiesWeatherActions = slice.actions;
export const citiesWeatherThunks = {firstLoading, getSummaryWeather, findCity, getCurrentGeolocation}