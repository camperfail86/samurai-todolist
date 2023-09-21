import React, {useState} from "react";
import {FilterValuesType} from "../App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {FullInput} from "./FullInput";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    changeIsDone: (todolistId: string, id: string) => void
    addTask: (todolistId: string, title: string) => void
    filter: FilterValuesType
    todolistId: string
}

function Todolist(props: PropsType) {

    const [listRef] = useAutoAnimate<HTMLUListElement>()
    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, "all");
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, "active");
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistId, "completed");
    }

    return (
        <div>
            <FullInput todolistId={props.todolistId}
                       callback={props.addTask}/>
            <ul ref={listRef}>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                        const onChangeHandler = () => props.changeIsDone(props.todolistId, t.id)
                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;
