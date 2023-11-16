import axios from "axios";

export const instance = axios.create(
    {
        withCredentials: true,
        baseURL: "https://social-network.samuraijs.com/api/1.1",
        headers: {
            "API-KEY": "8bf529cc-e7bb-4c13-ad05-c2e0207800f3"
        }
    }
)

export const todolistAPI = {
    getTodo() {
        return instance.get<TodolistType[]>(`/todo-lists`)
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`/todo-lists`, {title: title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title: title})
    }
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}



