import {combineReducers, legacy_createStore} from "redux";
import {TodolistReducer} from "../reducers/TodolistReducer";
import {TaskReducer} from "../reducers/TaskReducer";

export const rootReducer = combineReducers(
    {
        todolists: TodolistReducer,
        tasks: TaskReducer
    }
)
export const store = legacy_createStore(rootReducer)
export type AppStoreType = ReturnType<typeof rootReducer>