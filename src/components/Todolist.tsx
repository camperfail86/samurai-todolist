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
import {ButtonFilter} from "./ButtonFilter";
import {ButtonDelete} from "./ButtonDelete";
import {todolistID1} from "../reducers/TodolistReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    changeIsDone: (todolistId: string, id: string) => void
    filter: FilterValuesType
    todolistId: string
    title: string
    editSpanTodo: (title: string, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
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
    }, [props.todolistId, props.changeFilter])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "active");
    }, [props.todolistId, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "completed");
    }, [props.todolistId, props.changeFilter])

    const addTaskCallback = useCallback((title: string) => {
        dispatch(addTaskAC(props.todolistId, title))
    }, [props.todolistId, dispatch])

    const onChangeTitleTodo = useCallback((title: string) => {
        props.editSpanTodo(title, props.todolistId)
    }, [props.editSpanTodo, props.todolistId])

    // const onChangeTitle = useCallback((title: string) => {
    //     dispatch(editSpanTaskAC(title, props.todolistId, t.id))
    // },[t.id, dispatch])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} editSpan={onChangeTitleTodo}/>
                <ButtonDelete callback={useCallback(() =>
                    props.deleteTodolist(props.todolistId),[props.deleteTodolist, props.todolistId])
                }/>
            </h3>
            <FullInput callback={addTaskCallback}/>
            <ul className={s.list} ref={listRef}>
                {
                    tasksForTodolist.map(t => {
                        return <Task
                            key={t.id}
                            task={t}
                            changeIsDone={props.changeIsDone}
                            todolistId={props.todolistId}/>
                    })
                }
            </ul>
            <div>
                <ButtonFilter variant={props.filter === 'all' ? "outlined" : "text"}
                              name='All'
                              color='secondary'
                              callback={onAllClickHandler}
                />
                <ButtonFilter variant={props.filter === 'active' ? "outlined" : "text"}
                              name='Active'
                              color='secondary'
                              callback={onActiveClickHandler}
                />
                <ButtonFilter variant={props.filter === 'completed' ? "outlined" : "text"}
                              name='Completed'
                              color='secondary'
                              callback={onCompletedClickHandler}
                />
            </div>
        </div>
    )
})

export default Todolist;