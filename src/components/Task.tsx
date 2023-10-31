import React, {memo} from 'react';
import {editSpanTaskAC, removeTaskAC} from "../reducers/TaskReducer";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../App";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    task: TaskType
    changeIsDone: (todolistId: string, id: string) => void
    todolistId: string
}

export const Task = memo(({task, changeIsDone, todolistId}: TaskPropsType) => {
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(todolistId, task.id))
    const onChangeHandler = () => changeIsDone(todolistId, task.id)

    const onChangeTitle = (title: string) => {
        dispatch(editSpanTaskAC(title, todolistId, task.id))
    }

    return <li key={task.id}>
        <Checkbox size={"small"}
                  onChange={onChangeHandler}
                  checked={task.isDone}
                  color="secondary" />
        <EditableSpan
            title={task.title}
            editSpan={onChangeTitle}/>
        <IconButton onClick={onClickHandler} aria-label="delete" size="small">
            <DeleteIcon fontSize="small" />
        </IconButton>
    </li>
});
