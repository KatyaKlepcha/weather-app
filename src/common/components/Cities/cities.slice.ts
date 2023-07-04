import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {citiesAPI} from "./cities.api";

const initialState = {
    cities: [],
    searchCities: [],
}


const getCities = createAsyncThunk<any, any>('weather/getCities', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI

    try {
        const res = await citiesAPI.getCities(arg)
        console.log('res.dataCITIES', res.data)
        return res.data
    } catch (e) {
        return rejectWithValue(null)
    }
})

const addCity = createAsyncThunk<any, any>('weather/getCities', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI

    try {
        const res = await citiesAPI.getCities(arg)
        console.log('res.dataCITIES', res.data)
        return res.data
    } catch (e) {
        return rejectWithValue(null)
    }
})


export const slice = createSlice({
    name: 'cities',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCities.fulfilled, (state, action) => {
                state.cities = action.payload.cities
            })
    },
})

export const citiesReducer = slice.reducer
export const citiesThunks = {getCities}