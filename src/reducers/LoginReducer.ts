// import { SetErrorType, setStatusAC, SetStatusType } from "./AppReducer";
import { Dispatch } from "redux";
import { authAPI } from "../api/auth-api";
import { LoginType } from "../features/login/Login";
import { handleServerAppError } from "../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { action } from "@storybook/addon-actions";
import { AppThunk, store } from "../store/store";
import { appActions } from "./AppReducer";
import { todolistActions } from "./TodolistReducer";

const slice = createSlice({
    name: 'login-slice',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setLoggedIn: (state, action: PayloadAction<{value: boolean}>) => {
            state.isLoggedIn = action.payload.value
        }
    }
})
export const loginActions = slice.actions
export const loginReducer = slice.reducer

export const loginTC = (data: LoginType) => (dispatch: Dispatch) => {
    {
        dispatch(appActions.setStatus({status: "loading"}));
        authAPI
            .login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(appActions.setStatus({status: "succeeded"}));
                    dispatch(loginActions.setLoggedIn({value: true}));
                } else {
                    handleServerAppError(res.data, dispatch);
                    console.log(res.data);
                }
            })
            .catch((error) => {
                dispatch(appActions.setStatus({status: "failed"}));
                handleServerAppError(error, dispatch);
            });
    }
};

export const logoutTC = (): AppThunk => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: "loading"}));
    authAPI
        .logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(loginActions.setLoggedIn({value: false}));
                dispatch(appActions.setStatus({status: "succeeded"}));
                dispatch(todolistActions.deleteStateTodo({}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerAppError(error, dispatch);
        });
};
