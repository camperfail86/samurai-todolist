import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from '../components/Task';
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {todolistID1} from "../reducers/TodolistReducer";
import {TaskStatuses} from "../reducers/TaskReducer";

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
    args: {
        changeIsDone: action('Status changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'JS', todoListId: todolistID1,
            status: TaskStatuses.New, startDate: '',
            priority: 1, addedDate: '', deadline: '', order: 1,
            description: '', entityStatus: 'idle'},
        todolistId: 'fgdosrg8rgjuh'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: '12wsdewfijdei', title: 'JS', status: TaskStatuses.Completed, todoListId: todolistID1,
            startDate: '', priority: 1, addedDate: '', deadline: '', order: 1, description: '', entityStatus: 'idle'},
    }
};

export const TaskIsNotDoneStory: Story = {};
