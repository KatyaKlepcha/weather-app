import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading";

const slice = createSlice({
    name: "app",
    initialState: {
        error: null as string | null,
        status: "idle" as RequestStatusType,
        isInitialized: false
    },
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status;
        },
        setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
            state.error = action.payload.error;
        },
        setInitialized: (state, action: PayloadAction<{ initializeStatus: boolean }>)=>{
            state.isInitialized = action.payload.initializeStatus
        }
    },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
