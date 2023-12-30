import { authAPI } from "../api/auth-api";
import { LoginType } from "../features/login/Login";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { createSlice } from "@reduxjs/toolkit";
import { appActions, appThunks } from "./AppReducer";
import { todolistActions } from "./TodolistReducer";
import { createAppAsyncThunk } from "../utils/createAppAsyncThunk";
import { ResultCode } from "../utils/enums";

const slice = createSlice({
    name: 'login-slice',
    initialState: {
        isLoggedIn: true
    },
    reducers: {
        // setLoggedIn: (state, action: PayloadAction<{value: boolean}>) => {
        //     state.isLoggedIn = action.payload.value
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action)=> {
                state.isLoggedIn = action.payload.value
            })
            .addCase(logout.fulfilled, (state, action)=> {
                state.isLoggedIn = action.payload.value
            })
            .addCase(appThunks.initializeApp.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.value
            })
            .addCase(appThunks.initializeApp.rejected, (state, action) => {
                state.isLoggedIn = false
            })
    }
})

const login = createAppAsyncThunk<{ value: boolean }, { data: LoginType }>("login/log-in", async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setStatus({ status: "loading" }));
    try {
        const res = await authAPI.login(arg.data);
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setStatus({ status: "succeeded" }));
            // dispatch(loginActions.setLoggedIn({value: true}));
            return { value: true };
        } else {
            dispatch(appActions.setStatus({ status: "failed" }));
            if (!res.data.fieldsErrors.length) {
                handleServerAppError(res.data, dispatch);
            }
            return rejectWithValue(res.data);
        }
    } catch (e: any) {
        dispatch(appActions.setStatus({ status: "failed" }));
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(e);
    }
});

const logout = createAppAsyncThunk<{ value: boolean }, undefined>("login/log-out", async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setStatus({ status: "loading" }));
    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setStatus({status: "succeeded"}));
            dispatch(todolistActions.deleteStateTodo({}))
            return { value: false }
        } else {
            dispatch(appActions.setStatus({ status: "failed" }));
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (e: any) {
        dispatch(appActions.setStatus({ status: "failed" }));
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    }
});

export const loginActions = slice.actions
export const loginReducer = slice.reducer
export const loginThunks = {login, logout}
