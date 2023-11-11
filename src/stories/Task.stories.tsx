import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from '../components/Task';
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

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
        task: {id: '12wsdewfijdei', title: 'JS', isDone: false},
        todolistId: 'fgdosrg8rgjuh'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: '12wsdewfijdei', title: 'JS', isDone: true},
    }
};

export const TaskIsNotDoneStory: Story = {};
