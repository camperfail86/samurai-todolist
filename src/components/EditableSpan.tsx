import React, {useState, FocusEvent, ChangeEvent} from "react";

type editableSpanProps = {
    // onDblCLick: () => void
    title: string
    // editMode: boolean
    editSpan: (title: string, todolistId: string, taskId: string)=>void
    taskId: string
    todolistId: string
}
export const  EditableSpan = (props: editableSpanProps) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')
    const editSpanCLick = (e: FocusEvent<HTMLInputElement>) => {
        props.editSpan(e.currentTarget.value, props.todolistId, props.taskId)
        setEditMode(false)
    }
    const onDblClick = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode ? <input
            value={title}
            onBlur={editSpanCLick}
            autoFocus={true}
            onChange={onChangeHandler}
        /> : <span onDoubleClick={onDblClick}>{props.title}</span>
    )
}
