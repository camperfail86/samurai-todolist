import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {EditableSpan, editableSpanProps} from '../components/EditableSpan';
import React, {ChangeEvent, FocusEvent, memo, useState} from "react";
import TextField from "@mui/material/TextField";

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    argTypes: {
        title: {
            description: 'Start value empty. Add value push button set string.'
        },
        editSpan: {
            description: 'Value EditableSpan changed'
        }
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

const EditableSpanExample = memo((props: editableSpanProps) => {
    const [editMode, setEditMode] = useState(true)
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

export const EditableSpanStory: Story = {
    render: () => <EditableSpanExample editSpan={action('changed')} title='Example'/>
};
