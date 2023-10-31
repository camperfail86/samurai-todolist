import React, {memo, useCallback} from "react";
import {FilterValuesType, TasksType} from "../App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {FullInput} from "./FullInput";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import s from './todolist.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../store/store";
import {addTaskAC, editSpanTaskAC, removeTaskAC} from "../reducers/TaskReducer";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    // tasks: Array<TaskType>
    // removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    changeIsDone: (todolistId: string, id: string) => void
    // addTask: (todolistId: string, title: string) => void
    filter: FilterValuesType
    todolistId: string
    // editSpan: (title: string, todolistId: string, taskId: string) => void
}

const Todolist = memo((props: PropsType) => {
    const tasks = useSelector<AppStoreType, TasksType>((state) => state.tasks)
    const dispatch = useDispatch()
    let tasksForTodolist = tasks[props.todolistId];
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
    }

    const [listRef] = useAutoAnimate<HTMLUListElement>()
    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "all");
    },[props.todolistId, props.changeFilter])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "active");
    },[props.todolistId, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "completed");
    },[props.todolistId, props.changeFilter])

    const addTaskCallback = (title: string) => {
        dispatch(addTaskAC(props.todolistId, title))
    }

    return (
        <div>
            <FullInput callback={addTaskCallback}/>
            <ul className={s.list} ref={listRef}>
                {
                    tasksForTodolist.map(t => {
                        return <Task task={t} changeIsDone={props.changeIsDone} todolistId={props.todolistId}/>
                    })
                }
            </ul>
            <div>
                <Button onClick={onAllClickHandler}
                        variant={props.filter === 'all' ? "outlined" : "text"}
                        color="secondary">All</Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.filter === 'active' ? "outlined" : "text"}
                        color="secondary">Active</Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.filter === 'completed' ? "outlined" : "text"}
                        color="secondary">Completed</Button>
            </div>
        </div>
    )
})

export default Todolist;