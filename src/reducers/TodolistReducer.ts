import { todolistAPI, TodolistType } from "../api/todolist-api";
import { Dispatch } from "redux";
import { appActions, StatusType } from "./AppReducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TodolistActionType = any

const slice = createSlice({
    initialState: [] as TodolistsMainType[],
    name: 'todolist-slice',
    reducers: {
        deleteTodolist: (state, action: PayloadAction<{todolistId: string}>) => {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index !== -1) {
                state.splice(index, 1)
            }
        },
        addTodolist: (state, action: PayloadAction<{todolist: TodolistType}>) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        setTodolist: (state, action: PayloadAction<{todolists: TodolistType[]}>) => {
            action.payload.todolists.forEach((tl) => {
                state.push({ ...tl, filter: "all", entityStatus: "idle" });
            });
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{id: string, entityStatus: StatusType}>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].entityStatus = action.payload.entityStatus
        },
        changeFilter: (state, action: PayloadAction<{todolistId: string, value: FilterValuesType}>) => {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index !== -1) state[index].filter = action.payload.value
        },
        editSpanTodo: (state, action: PayloadAction<{todolistId: string, title: string}>) => {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index !== -1) state[index].title = action.payload.title
        }
    }
})

export const todolistReducer = slice.reducer
export const todolistActions = slice.actions

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistsMainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: StatusType;
};

export const fetchTodolistThunk = () => (dispatch: Dispatch) => {
    dispatch(appActions.setStatus({status: "loading"}));
    todolistAPI
        .getTodo()
        .then((res) => {
            dispatch(todolistActions.setTodolist({todolists: res.data}));
            dispatch(appActions.setStatus({status: "succeeded"}));
        })
        .catch((error) => {
            handleServerAppError(error, dispatch);
        });
};

export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setStatus({status: "loading"}));
        dispatch(todolistActions.changeTodolistEntityStatus({id: todolistId, entityStatus: "loading"}));
        todolistAPI.deleteTodo(todolistId).then((res) => {
            dispatch(todolistActions.deleteTodolist({todolistId: todolistId}));
            dispatch(appActions.setStatus({status: "succeeded"}));
            dispatch(todolistActions.changeTodolistEntityStatus({id: todolistId, entityStatus: "succeeded"}));
        });
    };
};

export const createTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setStatus({status: "loading"}));
        todolistAPI
            .createTodo(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(appActions.setStatus({status: "succeeded"}));
                    dispatch(todolistActions.addTodolist({todolist: res.data.data.item}));
                } else {
                    if (res.data.messages.length) {
                        dispatch(appActions.setError({error: res.data.messages[0]}))
                    }
                    dispatch(appActions.setStatus({status: "failed"}));
                }
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch);
            });
    };
};

export const editSpanTodoTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setStatus({status: "loading"}));
        todolistAPI.updateTodo(todolistId, title).then((res) => {
            dispatch(todolistActions.editSpanTodo({todolistId: todolistId, title: title}));
            dispatch(appActions.setStatus({status: "succeeded"}));
        });
    };
};

export const changeFilterTC = (todolistId: string, value: FilterValuesType) => {
    return (dispatch: Dispatch) => {
        dispatch(todolistActions.changeFilter({todolistId, value}));
    };
};
