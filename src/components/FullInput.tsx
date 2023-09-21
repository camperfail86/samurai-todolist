import React, {ChangeEvent, KeyboardEvent, useRef, useState} from "react";

type FullInputType = {
    callback: (todolistId: string, title: string) => void
    todolistId: string
}
export const FullInput = (props: FullInputType) => {
    const [error, setError] = useState(false)
    const [title, setTitle] = useState('')
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (title.trim() !== '') {
                setError(false)
                props.callback(props.todolistId, title);
                setTitle('')
            } else {
                setError(true)
            }
        }
    }

    const onClickHandler = () => {
        if (title.trim() !== '') {
            setError(false)
            props.callback(props.todolistId, title);
            setTitle('')
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <input
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={onClickHandler}>+</button>
            {error ? <div className={'error-message'}>Title is required</div> : ''}
        </div>
    )
}
