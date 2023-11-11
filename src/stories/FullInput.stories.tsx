import type {Meta, StoryObj} from '@storybook/react';
import {FullInput, FullInputType} from '../components/FullInput';
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const meta: Meta<typeof FullInput> = {
    title: 'TODOLISTS/FullInput',
    component: FullInput,
    tags: ['autodocs'],
    argTypes: {
        callback: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof FullInput>;

export const FullInputStory: Story = {
    args: {
        callback: action('Button clicked inside form')
    },
};

const btnStyle = {
    maxWidth: '40px',
    minWidth: '40px',
    maxHeight: '39px',
    minHeight: '39px',
    marginLeft: '5px',
    backgroundColor: 'black'
}

const FullInputExample = memo((props: FullInputType) => {
    const [error, setError] = useState(true)
    const [title, setTitle] = useState('')
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (title.trim() !== '') {
                setError(false)
                props.callback(title);
                setTitle('')
            } else {
                setError(true)
            }
        }
    }

    const onClickHandler = () => {
        if (title.trim() !== '') {
            setError(false)
            props.callback(title);
            setTitle('')
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       label={error ? "Введите текст" : "Писать тут"}
                       variant="outlined"
                       value={title}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                       onKeyPress={onKeyPressHandler}
                       error={error}
                       helperText={error ? "Title is required" : ""}
                       size="small"
            />
            <Button style={btnStyle} onClick={onClickHandler} variant="contained">+</Button>
        </div>
    )
})

export const FullInputStoryError: Story = {
    render: ()=> <FullInputExample callback={action('Button clicked inside form')}/>
};
