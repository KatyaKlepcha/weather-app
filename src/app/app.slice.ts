import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LangsType } from 'features/citiesWeather/cities.selector'

export type RequestStatusType = 'idle' | 'loading'

const initialState: { lang: LangsType; error: string | null; status: RequestStatusType; isChangeLang: boolean } = {
  lang: 'en',
  error: null,
  status: 'idle',
  isChangeLang: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<{ lang: LangsType }>) => {
      state.lang = action.payload.lang
      state.isChangeLang = true
    },
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
    // setInitialized: (state, action: PayloadAction<{ initializeStatus: boolean }>) => {
    //   state.isInitialized = action.payload.initializeStatus
    // },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith('/pending')
        },
        (state) => {
          state.status = 'loading'
        },
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith('/fulfilled')
        },
        (state) => {
          state.status = 'idle'
        },
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith('/rejected')
        },
        (state) => {
          state.status = 'idle'
        },
      )
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
