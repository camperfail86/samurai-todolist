import React, {useEffect, useState} from 'react'
import {config, todolistAPI} from "../../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const promise = todolistAPI.getTodo()
        promise.then((data) => setState(data.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // const title = 'COUNTER-STRIKE'
        const promise = todolistAPI.createTodo()
        promise.then((data) => setState(data.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    // const todolistID = '39ded0cc-40df-426f-8dd7-833efe3d638b'
    useEffect(() => {
        todolistAPI.deleteTodo().then((data) => setState(data.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodo()
            .then((data) => setState(data.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

