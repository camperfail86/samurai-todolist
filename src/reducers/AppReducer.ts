import { authAPI } from "../api/auth-api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../utils/createAppAsyncThunk";
import { ResultCode } from "../utils/enums";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";

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
    extraReducers: (builder) => {
        builder
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.initialized = action.payload.value
            })
    }
})

const initializeApp = createAppAsyncThunk('app/initializeApp', async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
        const res = await authAPI.me()
            if (res.data.resultCode === ResultCode.success) {
                // dispatch(loginActions.setLoggedIn({value: true}));
                return {value: true}
            } else {
                // handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)
            }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setInitialized({value: true}));
        dispatch(appActions.setStatus({ status: "succeeded" }));
    }
})

export const appThunks = {initializeApp}
export const appReducer = slice.reducer
export const appActions = slice.actions