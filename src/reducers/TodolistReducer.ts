import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

type TodolistActionType = AddTodolistType
    | ChangeFilterType
    | EditSpanTodoType
    | DeleteTodolistType
type TodolistStateType = TodolistsType[]
export const todolistID1 = v1()
export const todolistID2 = v1()
let initialState: TodolistStateType = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const TodolistReducer = (state= initialState, action: TodolistActionType): TodolistStateType => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            if (action.payload.title.trim() !== '') {
                let newTodolist: TodolistsType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'};
                let copyState = [...state, newTodolist]
                return copyState
            } else return state
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
export const addTodolistAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, todolistId}
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
export const editSpanTodoAC = (title: string, todolistId: string) => {
    return {
        type: 'EDIT-SPAN-TODO',
        payload: {title, todolistId}
    } as const
}

type DeleteTodolistType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: {todolistId}
    } as const
}