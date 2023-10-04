import React from "react";
import {FilterValuesType} from "../App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {FullInput} from "./FullInput";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import s from './todolist.module.css'

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
    editSpan: (title: string, todolistId: string, taskId: string) => void
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

    const addTaskCallback = (title: string) => {
        props.addTask(props.todolistId, title);
    }

    return (
        <div>
            <FullInput callback={addTaskCallback}/>
            <ul className={s.list} ref={listRef}>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                        const onChangeHandler = () => props.changeIsDone(props.todolistId, t.id)

                        const onChangeTitle = (title: string) => {
                            props.editSpan(title, props.todolistId, t.id)
                        }

                        return <li key={t.id}>
                            {/*<input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>*/}
                            <Checkbox size={"small"}
                                      onChange={onChangeHandler}
                                      checked={t.isDone}
                                      color="secondary" />
                            <EditableSpan
                                title={t.title}
                                editSpan={onChangeTitle}/>
                            {/*<button onClick={onClickHandler}>x</button>*/}
                            <IconButton onClick={onClickHandler} aria-label="delete" size="small">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </li>
                    })
                }
            </ul>
            <div>
                {/*<button className={props.filter === 'all' ? 'active-filter' : ''}*/}
                {/*        onClick={onAllClickHandler}>All*/}
                {/*</button>*/}
                {/*<button className={props.filter === 'active' ? 'active-filter' : ''}*/}
                {/*        onClick={onActiveClickHandler}>Active*/}
                {/*</button>*/}
                {/*<button className={props.filter === 'completed' ? 'active-filter' : ''}*/}
                {/*        onClick={onCompletedClickHandler}>Completed*/}
                {/*</button>*/}
                {/*<Button onClick={onAllClickHandler} variant="outlined" color="secondary">All</Button>*/}
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
}

export default Todolist;