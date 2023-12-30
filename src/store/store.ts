import { AnyAction, combineReducers } from "redux";
import { TaskActionType, taskReducer } from "../reducers/TaskReducer";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { loginReducer } from "../reducers/LoginReducer";
import { appReducer } from "../reducers/AppReducer";
import { TodolistActionType, todolistReducer } from "../reducers/TodolistReducer";

// export type AppActionType = TodolistActionType | TaskActionType;
export type AppDispatchType = typeof store.dispatch;
// export type AppStoreType = ReturnType<typeof store.getState>;
export type AppRootStateType = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer: {
        todolists: todolistReducer,
        tasks: taskReducer,
        app: appReducer,
        login: loginReducer,
    }
});

// @ts-ignore
window.store = store;
