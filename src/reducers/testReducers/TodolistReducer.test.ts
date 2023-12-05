import {
    changeFilterAC,
    deleteTodolistAC,
    editSpanTodoAC, FilterValuesType,
    TodolistReducer,
    TodolistsMainType
} from "../TodolistReducer";
import {v1} from "uuid";

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistsMainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 1, addedDate: '', entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 2, addedDate: '', entityStatus: 'idle'},
    ]

    // const endState = TodolistReducer(startState, addTodolistAC(v1(), newTodolistTitle))
    // // {type: 'ADD-TODOLIST', title: newTodolistTitle}
    // expect(endState.length).toBe(3)
    // expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistsMainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 1, addedDate: '', entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 2, addedDate: '', entityStatus: 'idle'},
    ]

    const endState = TodolistReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should change its name", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTitle = 'Hello'
    const startState: Array<TodolistsMainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 1, addedDate: '', entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 2, addedDate: '', entityStatus: 'idle'},
    ]
    const endState = TodolistReducer(startState, editSpanTodoAC(newTitle, todolistId2))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodolistsMainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 1, addedDate: '', entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 2, addedDate: '', entityStatus: 'idle'},
    ]

    const endState = TodolistReducer(startState, changeFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

