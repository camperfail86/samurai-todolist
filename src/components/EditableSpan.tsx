import React, {useState, FocusEvent, ChangeEvent} from "react";

type editableSpanProps = {
    title: string
    editSpan: (title: string)=>void
}
export const  EditableSpan = (props: editableSpanProps) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')
    const editSpanCLick = (e: FocusEvent<HTMLInputElement>) => {
        props.editSpan(e.currentTarget.value)
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
