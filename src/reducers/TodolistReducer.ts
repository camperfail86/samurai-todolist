import { v1 } from "uuid";
import { todolistAPI, TodolistType } from "../api/todolist-api";
import { Dispatch } from "redux";
import { setErrorAC, setStatusAC, StatusType } from "./AppReducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";

export type TodolistActionType =
    | AddTodolistType
    | ChangeFilterType
    | EditSpanTodoType
    | DeleteTodolistType
    | SetTodolistsType
    | ChangeTodolistEntityStatusType;

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistsMainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: StatusType;
};

export const todolistID1 = v1();
export const todolistID2 = v1();
let initialState: TodolistsMainType[] = [];

export const TodolistReducer = (state = initialState, action: TodolistActionType): TodolistsMainType[] => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            if (action.payload.todolist.title.trim() !== "") {
                return [...state, { ...action.payload.todolist, filter: "all", entityStatus: "idle" }];
            } else return state;
        }
        case "SET-TODOLISTS": {
            return action.payload.todolists.map((tl) => {
                return { ...tl, filter: "all", entityStatus: "idle" };
            });
        }
        case "CHANGE-FILTER": {
            return state.map((td) =>
                td.id === action.payload.todolistId ? { ...td, filter: action.payload.value } : td,
            );
        }
        case "EDIT-SPAN-TODO": {
            return state.map((td) =>
                td.id === action.payload.todolistId ? { ...td, title: action.payload.title } : td,
            );
        }
        case "DELETE-TODOLIST": {
            return state.filter((td) => td.id !== action.payload.todolistId);
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map((td) =>
                td.id === action.payload.id ? { ...td, entityStatus: action.payload.entityStatus } : td,
            );
        }
        default:
            return state;
    }
};

export type AddTodolistType = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: "ADD-TODOLIST",
        payload: { todolist },
    } as const;
};

type ChangeFilterType = ReturnType<typeof changeFilterAC>;
export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        payload: { todolistId, value },
    } as const;
};

type EditSpanTodoType = ReturnType<typeof editSpanTodoAC>;
export const editSpanTodoAC = (todolistId: string, title: string) => {
    return {
        type: "EDIT-SPAN-TODO",
        payload: { todolistId, title },
    } as const;
};

type DeleteTodolistType = ReturnType<typeof deleteTodolistAC>;
export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: "DELETE-TODOLIST",
        payload: { todolistId },
    } as const;
};

export type SetTodolistsType = ReturnType<typeof setTodolistAC>;
export const setTodolistAC = (todolists: TodolistType[]) => {
    return {
        type: "SET-TODOLISTS",
        payload: { todolists },
    } as const;
};

export type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatus>;
export const changeTodolistEntityStatus = (id: string, entityStatus: StatusType) => {
    return {
        type: "CHANGE-TODOLIST-ENTITY-STATUS",
        payload: { id, entityStatus },
    } as const;
};

export const fetchTodolistThunk = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC("loading"));
    todolistAPI
        .getTodo()
        .then((res) => {
            dispatch(setTodolistAC(res.data));
            dispatch(setStatusAC("succeeded"));
        })
        .catch((error) => {
            handleServerAppError(error, dispatch);
        });
};

export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC("loading"));
        dispatch(changeTodolistEntityStatus(todolistId, "loading"));
        todolistAPI.deleteTodo(todolistId).then((res) => {
            dispatch(deleteTodolistAC(todolistId));
            dispatch(setStatusAC("succeeded"));
            dispatch(changeTodolistEntityStatus(todolistId, "succeeded"));
        });
    };
};

export const createTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC("loading"));
        todolistAPI
            .createTodo(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setStatusAC("succeeded"));
                    dispatch(addTodolistAC(res.data.data.item));
                } else {
                    if (res.data.messages.length) {
                        dispatch(setErrorAC(res.data.messages[0]));
                    }
                    dispatch(setStatusAC("failed"));
                }
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch);
            });
    };
};

export const editSpanTodoTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC("loading"));
        todolistAPI.updateTodo(todolistId, title).then((res) => {
            dispatch(editSpanTodoAC(todolistId, title));
            dispatch(setStatusAC("succeeded"));
        });
    };
};

export const changeFilterTC = (todolistId: string, value: FilterValuesType) => {
    return (dispatch: Dispatch) => {
        dispatch(changeFilterAC(todolistId, value));
    };
};
