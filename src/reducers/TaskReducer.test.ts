import {
    addTaskAC,
    // addTasksArrayNullAC,
    changeIsDoneAC, editSpanTaskAC, removeTaskAC, TaskMainType, TaskReducer, TaskStatuses
}
    from './TaskReducer'
import {
    addTodolistAC, changeFilterAC,
    deleteTodolistAC,
    FilterValuesType, setTodolistAC,
    todolistID1,
    TodolistReducer,
    TodolistsMainType
} from "./TodolistReducer";
import {v1} from "uuid";

test('correct task should be deleted from correct array', () => {
    const startState: TaskMainType = {
        'todolistId1': [
            {
                id: '1', title: "HTML&CSS", todoListId: 'todolistID1',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
            {
                id: '2', title: "JS", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
        ],
        'todolistId2': [
            {
                id: '1', title: "MILK", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
            {
                id: '2', title: "COFFEE", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 2, addedDate: '', deadline: '', order: 2,
                description: ''
            },
        ]
    }

    const action = removeTaskAC('todolistId2', '2')

    const endState = TaskReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1', title: "HTML&CSS", todoListId: 'todolistID1',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
        ],
        'todolistId2': [
            {
                id: '1', title: "MILK", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
        ]
    })
})

test('correct task should be added to correct array', () => {
    // const startState: TaskMainType = {
    //     'todolistId1': [
    //         {
    //             id: '1', title: "HTML&CSS", todoListId: 'todolistID1',
    //             status: TaskStatuses.Completed, startDate: '',
    //             priority: 1, addedDate: '', deadline: '', order: 1,
    //             description: ''
    //         },
    //         {
    //             id: '2', title: "JS", todoListId: 'todolistID2',
    //             status: TaskStatuses.Completed, startDate: '',
    //             priority: 1, addedDate: '', deadline: '', order: 1,
    //             description: ''
    //         },
    //     ],
    //     'todolistId2': [
    //         {
    //             id: '1', title: "MILK", todoListId: 'todolistID2',
    //             status: TaskStatuses.Completed, startDate: '',
    //             priority: 1, addedDate: '', deadline: '', order: 1,
    //             description: ''
    //         },
    //         {
    //             id: '2', title: "COFFEE", todoListId: 'todolistID2',
    //             status: TaskStatuses.Completed, startDate: '',
    //             priority: 2, addedDate: '', deadline: '', order: 2,
    //             description: ''
    //         },
    //     ]
    // }
    //
    // const action = addTaskAC('todolistId2', 'juce')
    //
    // const endState: TaskMainType = TaskReducer(startState, action)
    //
    // expect(endState['todolistId1'].length).toBe(2)
    // expect(endState['todolistId2'].length).toBe(3)
    // expect(endState['todolistId2'][0].id).toBeDefined()
    // expect(endState['todolistId2'][0].title).toBe('juce')
    // expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const startState: TaskMainType = {
        'todolistId1': [
            {
                id: '1', title: "HTML&CSS", todoListId: 'todolistID1',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
            {
                id: '2', title: "JS", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
        ],
        'todolistId2': [
            {
                id: '1', title: "MILK", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
            {
                id: '2', title: "COFFEE", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 2, addedDate: '', deadline: '', order: 2,
                description: ''
            },
        ]
    }

    // const action = changeIsDoneAC(true, 'todolistId2', '2')
    //
    // const endState = TaskReducer(startState, action)
    //
    // expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    // expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('status', () => {
    const startState: TaskMainType = {
        'todolistId1': [
            {
                id: '1', title: "HTML&CSS", todoListId: 'todolistID1',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
            {
                id: '2', title: "JS", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
        ],
        'todolistId2': [
            {
                id: '1', title: "MILK", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
            {
                id: '2', title: "COFFEE", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 2, addedDate: '', deadline: '', order: 2,
                description: ''
            },
        ]
    }

    const action = editSpanTaskAC('juce', 'todolistId2', '2')

    const endState = TaskReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('juce')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {
    const startState: TaskMainType = {
        'todolistId1': [
            {
                id: '1', title: "HTML&CSS", todoListId: 'todolistID1',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
            {
                id: '2', title: "JS", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
        ],
        'todolistId2': [
            {
                id: '1', title: "MILK", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
            {
                id: '2', title: "COFFEE", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 2, addedDate: '', deadline: '', order: 2,
                description: ''
            },
        ]
    }

    // const action = addTasksArrayNullAC(v1(), "new todolist");
    // const action = addTodolistAC(v1(), "new todolist");

    // const endState = TaskReducer(startState, action)


    // const keys = Object.keys(endState);
    // const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    // if (!newKey) {
    //     throw Error("new key should be added")
    // }
    //
    // expect(keys.length).toBe(3);
    // expect(endState[newKey]).toEqual([]);
});

test('ids should be equals', () => {
    const startTasksState: TaskMainType = {}
    const startTodolistsState: Array<TodolistsMainType> = []

    const todolistId = v1()
    // const action = addTodolistAC(todolistId,'new todolist')

    // const endTasksState = TaskReducer(startTasksState, action)
    // const endTodolistsState = TodolistReducer(startTodolistsState, action)

    // const keys = Object.keys(endTasksState)
    // const idFromTasks = keys[0]
    // const idFromTodolists = endTodolistsState[0].id

    // expect(idFromTasks).toBe(action.payload.todolistId)
    // expect(idFromTodolists).toBe(action.payload.todolistId)
})

test('property with todolistId should be deleted', () => {
    const startState: TaskMainType = {
        'todolistId1': [
            {
                id: '1', title: "HTML&CSS", todoListId: 'todolistID1',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
            {
                id: '2', title: "JS", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
        ],
        'todolistId2': [
            {
                id: '1', title: "MILK", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 1, addedDate: '', deadline: '', order: 1,
                description: ''
            },
            {
                id: '2', title: "COFFEE", todoListId: 'todolistID2',
                status: TaskStatuses.Completed, startDate: '',
                priority: 2, addedDate: '', deadline: '', order: 2,
                description: ''
            },
        ]
    }

    const action = deleteTodolistAC('todolistId2')

    const endState = TaskReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test('set Todolists', () => {
    const action = setTodolistAC([
        {id: '1', title: 'What to learn', order: 1, addedDate: ''},
        {id: '2', title: 'What to buy',  order: 2, addedDate: ''},
    ])

    const endState = TaskReducer({}, action)

    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})


