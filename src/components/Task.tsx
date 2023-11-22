import React, {memo, useCallback} from 'react';
import {editSpanTaskAC, editSpanTaskTC, fetchDeleteTaskTC, TaskStatuses} from "../reducers/TaskReducer";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {ButtonDelete} from "./ButtonDelete";
import {TaskType} from "../api/task-api";
import {useAppDispatch} from "../hooks/hooks";

export type TaskPropsType = {
    task: TaskType
    changeIsDone: (status: TaskStatuses, todolistId: string, id: string) => void
    todolistId: string
}

export const Task = memo(({task, changeIsDone, todolistId}: TaskPropsType) => {
    // const dispatch: ThunkDispatch<AppStoreType, any, TaskActionType> = useDispatch()
    const dispatch = useAppDispatch()
    const onClickHandler = useCallback(() => {
        // dispatch(removeTaskAC(todolistId, task.id))
        dispatch(fetchDeleteTaskTC(todolistId, task.id))
    }, [task.id, dispatch])

    const onChangeHandler = useCallback(() => changeIsDone(task.status, todolistId, task.id), [task.status, task.id, changeIsDone])

    const onChangeTitle = useCallback((title: string) => {
        dispatch(editSpanTaskTC(title, todolistId, task.id))
    }, [task.id, dispatch])

    return <li key={task.id}>
        <Checkbox size={"small"}
                  onChange={onChangeHandler}
                  checked={!!task.status}
                  color="secondary"/>
        <EditableSpan
            title={task.title}
            editSpan={onChangeTitle}/>
        <ButtonDelete callback={onClickHandler}/>
    </li>
});
