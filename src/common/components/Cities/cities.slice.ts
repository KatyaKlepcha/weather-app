// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import {citiesAPI} from "./cities.api";
// import {appActions} from "../../../app/app.slice";
// import {weatherActions} from "../../../features/weather/weather.slice";
// import {setToLocalStorage} from "../../utils/setToLocalStorage";
// import {RootState} from "../../../app/store";
//
// type InitialStateType = {
//     cities: string [],
//     searchCities: []
// }
//
// const initialState: InitialStateType = {
//     cities: [],
//     searchCities: [],
// }
//
//
// const findCity = createAsyncThunk<string, string>('cities/findCity', async (arg, thunkAPI) => {
//     const {dispatch, rejectWithValue, getState} = thunkAPI
//     dispatch(appActions.setAppStatus({status: "loading"}))
//     const state = getState() as RootState
//     try {
//         const res = await citiesAPI.findCity(arg)
//         const city = res.data.city.name
//
//         dispatch(appActions.setAppStatus({status: "idle"}))
//         // @ts-ignore
//         const test = JSON.parse(localStorage.getItem('current-city'))
//         console.log(test)
//         setToLocalStorage([...test, city], 'current-city')
//         dispatch(weatherActions.setCurrentCity({city}))
//         return res.data.city.name
//     } catch (e) {
//         return rejectWithValue(null)
//     }
// })
//
//
// export const slice = createSlice({
//     name: 'cities',
//     initialState: initialState,
//     reducers: {
//         setCities: (state, action) => {
//             state.cities = action.payload
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(findCity.fulfilled, (state, action) => {
//                 state.cities.push(action.payload)
//             })
//     },
// })
//
// export const citiesReducer = slice.reducer
// export const citiesActions = slice.actions
// export const citiesThunks = {findCity}

export const w =0