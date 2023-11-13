import axios from "axios";

// const url = "https://social-network.samuraijs.com/api/1.1"
export const config = {
    withCredentials: true,
    headers: {
        "API-KEY": "8bf529cc-e7bb-4c13-ad05-c2e0207800f3"
    }
}


const instance = axios.create(
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
        const promise = instance.get(`/todo-lists`)
            // <TodolistType[]>
        return promise
    },
    createTodo() {
        return instance.post(`/todo-lists`, {title: 'title'})
    },
    deleteTodo() {
        const todolistId = '27baedb2-08bb-42d7-8b5f-c674465711b9'
        return instance.delete(`/todo-lists/${todolistId}`)
    },
    updateTodo() {
        const todolistId = '75bf1aa7-ab68-4c21-95bd-cf143b737ed0'
        return instance.put(`/todo-lists/${todolistId}`, {title: 'MINECRAFT'})
    }
}

// export type TodolistType = {
//     id: string
//     addedDate: string
//     order: number
//     title: string
// }
