import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodolistType, todolistID1, todolistID2} from "./TodolistReducer";

type TaskActionType = RemoveTaskType
    | ChangeIsDoneType
    | EditSpanTaskType
    | AddTaskType
    | DeleteTodolistType
    | AddTodolistType
type TaskStateType = TasksType
let initialState: TaskStateType = {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    }

export const TaskReducer = (state = initialState, action: TaskActionType): TaskStateType => {
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
        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolistId]: []}
        }
        case "DELETE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
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

type DeleteTodolistType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: { todolistId }
    } as const
}