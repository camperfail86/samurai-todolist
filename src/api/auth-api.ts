import {instance} from "./todolist-api";
import {LoginType} from "../features/login/Login";


export const authAPI = {
    login(data: LoginType) {
        return instance.post<ResponseType<{userId?: number}>>(`/auth/login`, data)
    },
    me() {
        return instance.get<ResponseType<{id: number, email: string, login: string}>>('auth/me')
    },
    logout() {
        return instance.delete<ResponseType<{userId?: number}>>('/auth/login')
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



