import { authAPI } from "../api/auth-api";
import { createSlice, isAnyOf, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../utils/createAppAsyncThunk";
import { ResultCode } from "../utils/enums";
import {  handleServerNetworkError } from "../utils/error-utils";

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
            .addMatcher(
                isPending,
                (state, action) => {
                    state.status = 'loading'
                }
            )
            .addMatcher(
                isFulfilled,
                (state, action) => {
                    state.status = 'succeeded'
                }
            )
            .addMatcher(
                isRejected,
                (state, action: any) => {
                    state.status = 'failed'
                    if (action.payload) {
                        state.error = action.payload.messages[0]
                    } else {
                        state.error = action.error.message ? action.error.message : 'Some error occurred'
                    }
                }
            )
            .addMatcher(isAnyOf(appThunks.initializeApp.fulfilled, appThunks.initializeApp.rejected), (state, action) => {
                state.initialized = true;
            });
    }
})

const initializeApp = createAppAsyncThunk('app/initializeApp', async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
        const res = await authAPI.me()
            if (res.data.resultCode === ResultCode.success) {
                return {value: true}
            } else {
                return rejectWithValue(null)
            }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setStatus({ status: "succeeded" }));
    }
})

export const appThunks = {initializeApp}
export const appReducer = slice.reducer
export const appActions = slice.actions