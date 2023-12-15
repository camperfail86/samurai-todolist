import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";
// import { TodolistActionType, TodolistReducer } from "../reducers/TodolistReducer";
import { TaskActionType, taskReducer } from "../reducers/TaskReducer";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { AppReducer } from "../reducers/AppReducer";
// import { LoginReducer } from "../reducers/LoginReducer";
import { configureStore } from "@reduxjs/toolkit";
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
export type AppThunk = ThunkAction<void, AppStoreType, unknown, AnyAction>
export type AppStoreType = ReturnType<typeof store.getState>;
export const store = configureStore({
    reducer: rootReducer
});

