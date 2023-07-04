import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading";

const slice = createSlice({
    name: "app",
    initialState: {
        error: null as string | null,
        status: "idle" as RequestStatusType,
    },
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status;
        },
        setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
            state.error = action.payload.error;
        },
    },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
