import {TasksType} from "../App";
import {v1} from "uuid";

type TaskActionType = RemoveTaskType
    | ChangeIsDoneType
    | EditSpanTaskType
    | AddTaskType
    | AddTasksArrayNullType
type TaskStateType = TasksType

export const TaskReducer = (state: TaskStateType, action: TaskActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }
        }
        case 'CHANGE-IS-DONE': {
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].map(t => t.id === action.payload.id ?
                        {...t, isDone: !t.isDone} : t)
            }
        }
        case "EDIT-SPAN-TASK": {
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].map(t => t.id === action.payload.taskId ?
                        {...t, title: action.payload.title} : t)
            }
        }
        case "ADD-TASK": {
            if (action.payload.title.trim() !== '') {
                let task = {id: v1(), title: action.payload.title, isDone: false};
                return {
                    ...state, [action.payload.todolistId]: [task, ...state[action.payload.todolistId]]
                }
            } else return state
        }
        case "ADD-TASKS-ARRAY": {
            return {...state, [action.payload.todolistId]: []}
        }
        default:
            return state
    }
}

type RemoveTaskType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todolistId}
    } as const
}

type ChangeIsDoneType = ReturnType<typeof changeIsDoneAC>
export const changeIsDoneAC = (todolistId: string, id: string) => {
    return {
        type: 'CHANGE-IS-DONE',
        payload: {todolistId, id}
    } as const
}

type EditSpanTaskType = ReturnType<typeof editSpanTaskAC>
export const editSpanTaskAC = (title: string, todolistId: string, taskId: string) => {
    return {
        type: 'EDIT-SPAN-TASK',
        payload: {title, todolistId, taskId}
    } as const
}

type AddTaskType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todolistId, title}
    } as const
}

type AddTasksArrayNullType = ReturnType<typeof addTasksArrayNullAC>
export const addTasksArrayNullAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASKS-ARRAY',
        payload: {title, todolistId}
    } as const
}