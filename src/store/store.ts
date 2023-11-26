import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodolistActionType, TodolistReducer} from "../reducers/TodolistReducer";
import {TaskActionType, TaskReducer} from "../reducers/TaskReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {AppReducer} from "../reducers/AppReducer";

export const rootReducer = combineReducers(
    {
        todolists: TodolistReducer,
        tasks: TaskReducer,
        app: AppReducer
    }
)
export type AppActionType = TodolistActionType | TaskActionType
export type AppDispatchType = ThunkDispatch<AppStoreType, unknown, AppActionType>
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppStoreType = ReturnType<typeof rootReducer>