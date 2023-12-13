import React, { ChangeEvent, useEffect, useState } from "react";
import { todolistAPI } from "../api/todolist-api";
import { tasksAPI } from "../api/task-api";
import todolist from "../components/Todolist";

export default {
    title: "API-todolists",
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const promise = todolistAPI.getTodo();
        promise.then((res) => setState(res.data));
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState("");
    // useEffect(() => {
    //     const title = 'CLICK-TITLE'
    //     const promise = todolistAPI.createTodo(title)
    //     promise.then((res) => setState(res.data))
    // }, [])

    const onClickHandler = (title: string) => {
        todolistAPI.createTodo(title).then((res) => setState(res.data));
        setTitle("");
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    return (
        <div>
            <input value={title} onChange={(e) => onChangeHandler(e)} type="text" />
            <button onClick={() => onClickHandler(title)}></button>
            <span>{JSON.stringify(state)}</span>
        </div>
    );
};
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistsId, setTodolistsId] = useState("");
    // const todolistID = '39ded0cc-40df-426f-8dd7-833efe3d638b'
    // useEffect(() => {
    // const todolistsId = '97c084b5-1f30-4214-8b52-84b86726e79b'
    // todolistAPI.deleteTodo(todolistsId).then((res) => setState(res.data))
    // }, [])

    const onClickHandler = (todolistsId: string) => {
        todolistAPI.deleteTodo(todolistsId).then((res) => setState(res.data));
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistsId(e.currentTarget.value);
    };

    return (
        <div>
            <input value={todolistsId} onChange={(e) => onChangeHandler(e)} placeholder="print todolistId" />
            <button onClick={() => onClickHandler(todolistsId)}></button>
            <span>{JSON.stringify(state)}</span>
        </div>
    );
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistsId, setTodolistsId] = useState("");
    const [title, setTitle] = useState("");
    // useEffect(() => {
    //     const todolistsId = '97c084b5-1f30-4214-8b52-84b86726e79b'
    //     const title = 'VALORANT'
    //     todolistAPI.updateTodo(todolistsId, title)
    //         .then((res) => setState(res.data))
    // }, [])

    const onClickHandler = (todolistsId: string, title: string) => {
        todolistAPI.updateTodo(todolistsId, title).then((res) => setState(res.data));
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistsId(e.currentTarget.value);
    };

    const onChangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    return (
        <div>
            <input
                placeholder="print todolistId"
                value={todolistsId}
                onChange={(e) => onChangeHandler(e)}
                type="text"
            />
            <input placeholder="print title" value={title} onChange={(e) => onChangeHandlerTitle(e)} type="text" />
            <button onClick={() => onClickHandler(todolistsId, title)}></button>
            <span>{JSON.stringify(state)}</span>
        </div>
    );
};
