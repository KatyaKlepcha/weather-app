import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CoordType,
  DegreesTempType,
  GetSummaryType,
  ListType,
  weatherApi,
  WeatherResponseType,
} from '../weather/weather.api'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'
import { format } from 'date-fns'
import { LangsType } from 'features/citiesWeather/cities.selector'

type InitialStateType = {
  city: CityType
  cityLocal: CityLocalType[]
}

export type CityType = {
  [key: string]: WeatherResponseType
}

export type CityLocalType = {
  name: string
  id?: string | number
  degrees: DegreesTempType
  lang?: string | LangsType
}
export const slice = createSlice({
  name: 'citiesWeather',
  initialState: {} as InitialStateType,
  reducers: {
    deleteCity: (state, action: PayloadAction<{ city: string }>) => {
      delete state.city[action.payload.city]
      const index = state.cityLocal.findIndex((city) => city.name === action.payload.city)
      if (index !== -1) state.cityLocal.splice(index, 1)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSummaryWeather.fulfilled, (state, action) => {
        const index = state.cityLocal.findIndex((city) => {
          return city.id === action.payload.id
        })

        if (index === -1) {
          state.cityLocal.push({
            name: action.payload.weather.name,
            degrees: action.payload.degrees,
            id: action.payload.id,
            lang: action.payload.lang,
          })
        }
        state.city[action.payload.weather.name] = action.payload.weather
      })
      .addCase(changeDegrees.fulfilled, (state, action) => {
        const index = state.cityLocal.findIndex((city) => city.id === action.payload.id)
        if (index !== -1) state.cityLocal[index].degrees = action.payload.degrees
        state.city[action.payload.city] = action.payload.weather
      })
  },
})

const getSummaryWeather = createAppAsyncThunk<
  {
    city: string
    weather: WeatherResponseType
    degrees: DegreesTempType
    id?: string | number
    lang?: string | LangsType
  },
  GetSummaryType
>('citiesWeather/getSummaryWeather', async ({ location, degrees, lang, id }, { rejectWithValue }) => {
  try {
    const { data } = await weatherApi.getSummary({ location, degrees, lang, id } as GetSummaryType)
    return { city: location, weather: data, degrees: degrees, id, lang }
  } catch (e) {
    return rejectWithValue(null)
  }
})

const changeDegrees = createAppAsyncThunk<
  {
    city: string
    weather: WeatherResponseType
    degrees: DegreesTempType
    id?: string | number
  },
  GetSummaryType
>('citiesWeather/changeDegrees', async ({ location, degrees, id }, { rejectWithValue }) => {
  try {
    const { data } = await weatherApi.getSummary({ location, degrees } as GetSummaryType)
    return { city: location, weather: data, degrees, id }
  } catch (e) {
    return rejectWithValue(null)
  }
})

const getCurrentGeolocation = createAsyncThunk<WeatherResponseType, CoordType>(
  'citiesWeather/getCurrentGeolocation',
  async (arg, { rejectWithValue }) => {
    try {
      return await weatherApi.getCurrentGeolocation(arg)
    } catch (e) {
      return rejectWithValue(null)
    }
  },
)

const getForecast = createAppAsyncThunk<PartListType[], string>(
  'citiesWeather/getForecast',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await weatherApi.getForecast(arg)
      return data.list.map((el: ListType) => {
        const dateChart = format(new Date(el.dt_txt), 'dd.MM')
        return { date: dateChart, temp: Math.round(el.main.temp) }
      })
    } catch (e) {
      return rejectWithValue(null)
    }
  },
)

export type PartListType = {
  date: string
  temp: number
}

export const citiesWeatherReducer = slice.reducer
export const citiesWeatherActions = slice.actions
export const citiesWeatherThunks = { getSummaryWeather, changeDegrees, getCurrentGeolocation, getForecast }
