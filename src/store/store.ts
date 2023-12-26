import { AnyAction, combineReducers } from "redux";
import { TaskActionType, taskReducer } from "../reducers/TaskReducer";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { loginReducer } from "../reducers/LoginReducer";
import { appReducer } from "../reducers/AppReducer";
import { TodolistActionType, todolistReducer } from "../reducers/TodolistReducer";

export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: appReducer,
    login: loginReducer,
});
export type AppActionType = TodolistActionType | TaskActionType;
export type AppDispatchType = ThunkDispatch<AppStoreType, unknown, AppActionType>;
// export type AppThunk = ThunkAction<void, AppStoreType, unknown, AnyAction>
export type AppStoreType = ReturnType<typeof store.getState>;
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer
});

// @ts-ignore
window.store = store;
