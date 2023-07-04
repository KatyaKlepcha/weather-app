import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetSummaryType, SysType, weatherAPI, WeatherResponseType, WindType} from "./weather-api";
import {appActions} from "../../app/app.slice";
import {format} from "date-fns";
import {getFromLocalStorage} from "../../common/utils/getFromLocalStorage";
import {RootState} from "../../app/store";

export type WeatherType = {
    description: string;
    icon: string
    id: number
    main: string
}

export type MainType = {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_max: number
    temp_min: number
}

type InitialStateType = {
    weather: WeatherType[]
    currentDate: string
    currentTime: string
    currentCity: string
    main: MainType
    wind: WindType
    sys: SysType
}

const initialState: InitialStateType = {
    weather: [],
    currentDate: '',
    currentTime: '',
    currentCity: '',
    main: {} as MainType,
    wind: {} as WindType,
    sys: {} as SysType,
}

const getSummaryWeather = createAsyncThunk<WeatherResponseType, GetSummaryType>('weather/getSummaryWeather', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: "loading"}))
    try {
        const res = await weatherAPI.getSummary(arg)
        // dispatch(setSummaryWeather({ weather: res.data }))
        dispatch(appActions.setAppStatus({status: "idle"}))
        console.log('res.data', res.data)
        return res.data

    } catch (e) {
        return rejectWithValue(null)
        // errorNetworkUtil(dispatch, e)
    }
})
const getStartCity = createAsyncThunk<string, any>('weather/getStartCity', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    const city = getFromLocalStorage('current-city')
    try {
        if (city) {
            dispatch(weatherActions.setCurrentCity({city: city}))
            return city
        }
    } catch (e) {
        return rejectWithValue(null)
    }
})

const getStartWeather = createAsyncThunk<any, any>('weather/getStartWeather', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    dispatch(getStartCity({}))
    const state = getState() as RootState
    const currentCity = state.weather.currentCity
    if (currentCity) {
        dispatch(getSummaryWeather({location: currentCity}))
    } else {
        dispatch(weatherActions.setCurrentCity({city: 'Minsk'}))
        dispatch(getSummaryWeather({location: 'Minsk'}))
    }
    try {

    } catch (e) {
        return rejectWithValue(null)
    }
})

export const slice = createSlice({
    name: 'weather',
    initialState: initialState,
    reducers: {
        // setSummaryWeather: (state, action: PayloadAction<{ weather: WeatherResponseType }>) => {
        //     state.weather = action.payload.weather.weather
        //     state.currentDate = format(parseISO(String(action.payload.weather.dt)), "dd.MM.yyyy")
        //     state.currentTime = format(parseISO(String(action.payload.weather.dt)), 'HH:mm')
        //     state.main = action.payload.weather.main
        //     state.sunrise = format(parseISO(String(action.payload.weather.sys.sunrise)), 'HH:mm')
        //     state.sunset = format(parseISO(String(action.payload.weather.sys.sunset)), 'HH:mm')
        //     state.wind = action.payload.weather.wind
        //     state.visibility = action.payload.weather.visibility
        // },
        setCurrentCity: (state, action: PayloadAction<{ city: string }>) => {
            state.currentCity = action.payload.city
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSummaryWeather.fulfilled, (state, action) => {
                state.weather = action.payload.weather
                state.currentDate = format(new Date(action.payload.dt).getTimezoneOffset(), "E, dd MMMM HH:mm:ss")
                // state.currentTime = format(parseISO(String(action.payload.weather.dt)), 'HH:mm')
                state.main = action.payload.main
                // state.sunrise = format(parseISO(String(action.payload.weather.sys.sunrise)), 'HH:mm')
                // state.sunset = format(parseISO(String(action.payload.weather.sys.sunset)), 'HH:mm')
                state.wind = action.payload.wind
                state.sys = action.payload.sys
            })
    },
})

export const weatherReducer = slice.reducer;
export const weatherActions = slice.actions;
export const weatherThunks = {getSummaryWeather, getStartWeather, getStartCity}