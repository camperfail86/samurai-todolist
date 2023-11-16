import React, {ChangeEvent, useEffect, useState} from 'react'
import {tasksAPI} from "../api/task-api";

export default {
    title: 'API-tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    // useEffect(() => {
    //     const promise = tasksAPI.getTasks()
    //     promise.then((res) => setState(res.data))
    // }, [])
    const onClickHandler = (todolistId: string) => {
        tasksAPI.getTasks(todolistId).then((res) => setState(res.data.items))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return <div>
        <input placeholder='todolistId print' value={todolistId} onChange={(e) => onChangeHandler(e)} type="text"/>
        <button onClick={() => onClickHandler(todolistId)}>get tasks</button>
        <span>{JSON.stringify(state)}</span>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [todolistId, setTodolistId] = useState('')
    // useEffect(() => {
    //     const title = 'DOOM'
    //     const promise = tasksAPI.createTask(title)
    //     promise.then((res) => setState(res.data))
    // }, [])
    const onClickHandler = (title: string) => {
        tasksAPI.createTask(todolistId, title).then((res) => setState(res.data))
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <div>
            <input placeholder="title" value={title} onChange={(e) => onChangeHandlerTitle(e)} type="text"/>
            <input placeholder="todolistId" value={todolistId} onChange={(e) => onChangeHandler(e)} type="text"/>
            <button onClick={() => onClickHandler(title)}>create task</button>
            <span>{JSON.stringify(state)}</span>
        </div>
    )
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    // useEffect(() => {
    //     const taskId = '9ef76714-8485-41e3-9115-b4f46d141e31'
    //     tasksAPI.deleteTask(taskId).then((res) => setState(res.data))
    // }, [])

    const onClickHandler = (todolistId: string, taskId: string) => {
        tasksAPI.deleteTask(todolistId, taskId).then((res) => setState(res.data))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeHandlerTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    return (
        <div>
            <input placeholder="todolistId" value={todolistId} onChange={(e) => onChangeHandler(e)} type="text"/>
            <input placeholder="taskId" value={taskId} onChange={(e) => onChangeHandlerTaskId(e)} type="text"/>
            <button onClick={() => onClickHandler(todolistId, taskId)}>delete task</button>
            <span>{JSON.stringify(state)}</span>
        </div>
    )
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const title = 'ANATOLIk'
    // useEffect(() => {
        // const taskId = 'dea3077d-48eb-4cee-af09-b743d9294a23'
        // const title = 'VALORANTIK'
        // tasksAPI.updateTask(taskId, title)
        //     .then((res) => setState(res.data))
    // }, [])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeHandlerTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const onClickHandler = (todolistId: string, taskId: string) => {
        tasksAPI.updateTask(todolistId, taskId, title).then((res) => setState(res.data))
    }

    return (
        <div>
            <input placeholder="todolistId" value={todolistId} onChange={(e) => onChangeHandler(e)} type="text"/>
            <input placeholder="taskId" value={taskId} onChange={(e) => onChangeHandlerTaskId(e)} type="text"/>
            <button onClick={() => onClickHandler(todolistId, taskId)}>update task</button>
            <span>{JSON.stringify(state)}</span>
        </div>
    )
}

