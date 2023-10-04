import todolist from "../components/Todolist";
import {FilterValuesType, todolistsType} from "../App";
import {v1} from "uuid";
type ActionType = RemoveTaskType | AddTodolistType | ChangeFilterType
type StateType = todolistsType[]
export const TodolistReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        // case 'REMOVE-TASK': {
        //     return state[action.payload.todolistId].filter(t => t.id != action.payload.id)
        // }
        case 'ADD-TODOLIST': {
            return state
        }
        // case 'CHANGE-FILTER': {
            // return state.map( td => td.id === action.payload.todolistId ? td.filter: action.payload.value )
        // }
        default: return state
    }
}

type RemoveTaskType = ReturnType<typeof removeTask>
export const removeTask = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: { id, todolistId }
    } as const
}

type AddTodolistType = ReturnType<typeof addTodolist>
export const addTodolist = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: { title }
    } as const
}

type ChangeFilterType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: { todolistId, value }
    } as const
}