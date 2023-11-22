import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import todolist from "../components/Todolist";

export type TodolistActionType = AddTodolistType
    | ChangeFilterType
    | EditSpanTodoType
    | DeleteTodolistType
    | SetTodolistsType
type TodolistStateType = TodolistsMainType[]

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistsMainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistID1 = v1()
export const todolistID2 = v1()
let initialState: TodolistsMainType[] = [
    // {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
]

export const TodolistReducer = (state = initialState, action: TodolistActionType): TodolistsMainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            if (action.payload.todolist.title.trim() !== '') {
                // let newTodolist: TodolistsMainType = {
                //     id: action.payload.todolist.id,
                //     title: action.payload.todolist.title,
                //     filter: 'all',
                //     order: 0,
                //     addedDate: ''
                // };
                return [...state, {...action.payload.todolist, filter: 'all'}]
                // return copyState
            } else return state
        }
        case "SET-TODOLISTS": {
            return action.payload.todolists.map(tl => {
                return {...tl, filter: 'all'}
            })
        }
        case 'CHANGE-FILTER': {
            return state.map(td => td.id === action.payload.todolistId ? {...td, filter: action.payload.value} : td)
        }
        case "EDIT-SPAN-TODO": {
            return state.map(td => td.id === action.payload.todolistId ? {...td, title: action.payload.title} : td)
        }
        case "DELETE-TODOLIST": {
            return state.filter(td => td.id !== action.payload.todolistId)
        }
        default:
            return state
    }
}

export type AddTodolistType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {todolist}
    } as const
}

type ChangeFilterType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {todolistId, value}
    } as const
}

type EditSpanTodoType = ReturnType<typeof editSpanTodoAC>
export const editSpanTodoAC = (todolistId: string, title: string) => {
    return {
        type: 'EDIT-SPAN-TODO',
        payload: {todolistId, title}
    } as const
}

type DeleteTodolistType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: {todolistId}
    } as const
}

export type SetTodolistsType = ReturnType<typeof setTodolistAC>
export const setTodolistAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {todolists}
    } as const
}

export const fetchTodolistThunk = (dispatch: Dispatch) => {
    todolistAPI.getTodo()
        .then(res => {
        dispatch(setTodolistAC(res.data))
    })
}

export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodo(todolistId)
            .then(res => {
                dispatch(deleteTodolistAC(todolistId))
            })
    }
}

export const createTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodo(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const editSpanTodoTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodo(todolistId, title)
            .then(res => {
                dispatch(editSpanTodoAC(todolistId, title))
            })
    }
}

export const changeFilterTC = (todolistId: string, value: FilterValuesType) => {
    return (dispatch: Dispatch) => {
        // todolistAPI.updateTodo(todolistId, title)
            // .then(res => {
                dispatch(changeFilterAC(todolistId, value))
            // })
    }
}