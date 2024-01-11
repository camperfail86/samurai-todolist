import { taskReducer } from "../reducers/TaskReducer";
import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "../reducers/LoginReducer";
import { appReducer } from "../reducers/AppReducer";
import { todolistReducer } from "../reducers/TodolistReducer";

export type AppDispatchType = typeof store.dispatch;
export type AppRootStateType = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer: {
        todolists: todolistReducer,
        tasks: taskReducer,
        app: appReducer,
        login: loginReducer,
    }
});

