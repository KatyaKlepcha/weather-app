import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DegreesTempType, GetSummaryType, weatherApi, WeatherResponseType} from "../weather/weather.api";


// const getCurrentGeolocation = createAsyncThunk<any, CoordType>('citiesWeather/getCurrentGeolocation', async (arg, thunkAPI) => {
//     const {dispatch, rejectWithValue} = thunkAPI
//     dispatch(appActions.setAppStatus({status: "loading"}))
//     try {
//         const res = await citiesWeatherAPI.getCurrentGeolocation(arg)
//         dispatch(appActions.setAppStatus({status: "idle"}))
//         console.log('res.data', res.data)
//         return res.data
//     } catch (e) {
//         return rejectWithValue(null)
//     }
// })


type InitialStateType = {
    city: { [key: string]: WeatherResponseType }
    cityLocal: CityLocalType[]
}

export type CityLocalType = {
    name: string,
    degrees: DegreesTempType
}
export const slice = createSlice({
    name: 'citiesWeather',
    initialState: {} as InitialStateType,
    reducers: {
        deleteCity: (state, action: PayloadAction<{ city: string }>) => {
            //delete state.citiesWeather[action.payload.city]
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSummaryWeather.fulfilled, (state, action) => {
                if (action.payload.show) {
                    state.cityLocal.push({name: action.payload.city, degrees: action.payload.degrees})
                }
                state.city[action.payload.city] = action.payload.weather
            })
    },
})

const getSummaryWeather = createAsyncThunk<{
    city: string, weather: WeatherResponseType, degrees: DegreesTempType, show: boolean
}, GetSummaryType & { show: boolean }>
('citiesWeather/getSummaryWeather', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await weatherApi.getSummary({location: arg.location, degrees: "metric"} as GetSummaryType)
        return {city: arg.location, weather: res.data, degrees: arg.degrees, show: arg.show}
    } catch (e) {
        return rejectWithValue(null)
    }
})

export const citiesWeatherReducer = slice.reducer;
export const citiesWeatherActions = slice.actions;
export const citiesWeatherThunks = {getSummaryWeather}