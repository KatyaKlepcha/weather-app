import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LangType} from "../features/citiesWeather/citiesWeather.api";

export type RequestStatusType = "idle" | "loading";

const slice = createSlice({
    name: "app",
    initialState: {
        error: null as string | null,
        status: "idle" as RequestStatusType,
        isInitialized: false,
        lang: {} as LangType
    },
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status;
        },
        setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
            state.error = action.payload.error;
        },
        setInitialized: (state, action: PayloadAction<{ initializeStatus: boolean }>) => {
            state.isInitialized = action.payload.initializeStatus
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher((action) => {
                return action.type.endsWith('/pending')
            },
            (state) => {
                state.status = 'loading'
            })
            .addMatcher((action) => {
                    return action.type.endsWith('/fulfilled')
                },
                (state) => {
                    state.status = 'idle'
                })
            .addMatcher((action) => {
                    return action.type.endsWith('/rejected')
                },
                (state) => {
                    state.status = 'idle'
                })
    }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
