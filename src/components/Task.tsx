import React, {memo, useCallback} from 'react';
import {editSpanTaskAC, removeTaskAC} from "../reducers/TaskReducer";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../App";
import {useDispatch} from "react-redux";
import {ButtonDelete} from "./ButtonDelete";

export type TaskPropsType = {
    task: TaskType
    changeIsDone: (todolistId: string, id: string) => void
    todolistId: string
}

export const Task = memo(({task, changeIsDone, todolistId}: TaskPropsType) => {
    const dispatch = useDispatch()
    const onClickHandler = useCallback(() => dispatch(removeTaskAC(todolistId, task.id)), [task.id,dispatch])
    const onChangeHandler = useCallback(() => changeIsDone(todolistId, task.id), [task.id,changeIsDone])

    const onChangeTitle = useCallback((title: string) => {
        dispatch(editSpanTaskAC(title, todolistId, task.id))
    },[task.id, dispatch])

    return <li key={task.id}>
        <Checkbox size={"small"}
                  onChange={onChangeHandler}
                  checked={task.isDone}
                  color="secondary" />
        <EditableSpan
            title={task.title}
            editSpan={onChangeTitle}/>
        <ButtonDelete callback={onClickHandler}/>
    </li>
});
