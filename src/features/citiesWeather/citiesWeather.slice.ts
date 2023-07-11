import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CoordType, DegreesTempType, GetSummaryType, weatherApi, WeatherResponseType} from "../weather/weather.api";
import {createAppAsyncThunk} from "../../common/utils/createAppAsyncThunk";

type InitialStateType = {
    city: CityType
    cityLocal: CityLocalType[]
}

type CityType = {
    [key: string]: WeatherResponseType
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
            delete state.city[action.payload.city]
            const index = state.cityLocal.findIndex((city) => city.name === action.payload.city);
            if (index !== -1) state.cityLocal.splice(index, 1);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSummaryWeather.fulfilled, (state, action) => {
                const index = state.cityLocal.findIndex((city) => city.name === action.payload.weather.name)
                if (index === -1) {
                    state.cityLocal.push({name: action.payload.weather.name, degrees: action.payload.degrees})
                }
                state.city[action.payload.weather.name] = action.payload.weather
            })
            .addCase(changeDegrees.fulfilled, (state, action) => {
                const index = state.cityLocal.findIndex((city) => city.name === action.payload.city);
                if (index !== -1) state.cityLocal[index].degrees = action.payload.degrees;
                state.city[action.payload.city] = action.payload.weather
            })
            .addCase(getCurrentGeolocation.fulfilled, (state, action) => {
                const index = state.cityLocal.findIndex((city) => city.name === action.payload.name)
                if (index === -1) {
                    state.cityLocal.push({name: action.payload.name, degrees:'metric'})
                }
                state.city[action.payload.name] = action.payload
            })
    },
})

const getSummaryWeather = createAppAsyncThunk<{
    city: string, weather: WeatherResponseType, degrees: DegreesTempType
}, GetSummaryType>
('citiesWeather/getSummaryWeather', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
        const res = await weatherApi.getSummary({location: arg.location, degrees: arg.degrees} as GetSummaryType)
        return {city: arg.location, weather: res.data, degrees: arg.degrees}

    } catch (e) {
        return rejectWithValue(null)
    }
})

const changeDegrees = createAppAsyncThunk<{
    city: string, weather: WeatherResponseType, degrees: DegreesTempType
}, GetSummaryType>
('citiesWeather/changeDegrees', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const res = await weatherApi.getSummary({location: arg.location, degrees: arg.degrees} as GetSummaryType)
        return {city: arg.location, weather: res.data, degrees: arg.degrees}
    } catch (e) {
        return rejectWithValue(null)
    }
})

const getCurrentGeolocation = createAsyncThunk<WeatherResponseType, CoordType>('citiesWeather/getCurrentGeolocation', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const res = await weatherApi.getCurrentGeolocation(arg)
        return res
    } catch (e) {
        return rejectWithValue(null)
    }
})

const getForecast = createAppAsyncThunk<any, string>('citiesWeather/getForecast', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const res = await weatherApi.getForecast(arg)
        return res.data.list.map((el: any)=> ({name: el.dt_txt, temp: el.main.temp}))
    } catch (e) {
        return rejectWithValue(null)
    }
})


export const citiesWeatherReducer = slice.reducer;
export const citiesWeatherActions = slice.actions;
export const citiesWeatherThunks = {getSummaryWeather, changeDegrees, getCurrentGeolocation, getForecast}