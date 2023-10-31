import React, {useState, FocusEvent, ChangeEvent, memo} from "react";
import TextField from '@mui/material/TextField';

type editableSpanProps = {
    title: string
    editSpan: (title: string)=>void
}
export const  EditableSpan = memo((props: editableSpanProps) => {
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
        editMode ?
            // <input value={title} onBlur={editSpanCLick} autoFocus={true}/>
            <TextField
                onChange={onChangeHandler}
                value={title}
                onBlur={editSpanCLick}
                autoFocus={true}
                variant="standard"
            />
         : <span onDoubleClick={onDblClick}>{props.title}</span>
    )
})
