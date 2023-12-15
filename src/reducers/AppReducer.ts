import { Dispatch } from "redux";
import { authAPI } from "../api/auth-api";
import { loginActions } from "./LoginReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store/store";

export type StatusType = "idle" | "loading" | "succeeded" | "failed";

export const slice = createSlice({
    name: 'app-slice',
    initialState: {
        error: null as null | string,
        status: "idle" as StatusType,
        initialized: false,
    },
    reducers: {
        setError(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setStatus(state, action: PayloadAction<{status: StatusType}>) {
            state.status = action.payload.status
        },
        setInitialized(state, action: PayloadAction<{value: boolean}>) {
            state.initialized = action.payload.value
        }
    },
})

export const appReducer = slice.reducer
export const appActions = slice.actions

export const initializeAppTC = (): AppThunk => (dispatch: Dispatch) => {
    authAPI.me().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(loginActions.setLoggedIn({value: true}));
        }
        dispatch(appActions.setInitialized({value: true}));
    });
};
