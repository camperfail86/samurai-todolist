import React from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {FullInput} from "./FullInput";
import {FilterValuesType, TodolistsMainType} from "../reducers/TodolistReducer";
import Paper from "@mui/material/Paper";
import Todolist from "./Todolist";
import {useSelector} from "react-redux";
import {AppStoreType} from "../store/store";
import {TaskStatuses} from "../reducers/TaskReducer";

const paperStyle = {
    padding: '10px 15px'
}

type TodolistListType = {
    addTodolist: (title: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    changeIsDone: (status: TaskStatuses, todolistId: string, id: string) => void
    editSpanTodo: (title: string, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodolistList = (
    {
        addTodolist,
        editSpanTodo,
        deleteTodolist,
        changeIsDone,
        changeFilter
    }: TodolistListType) => {
    const todolists = useSelector<AppStoreType, Array<TodolistsMainType>>((state) => state.todolists)
    return (
        <Container>
            <Grid container style={{padding: '20px 0'}}>
                <FullInput callback={addTodolist}/>
            </Grid>
            <Grid container spacing={2}>
                {todolists.map((td: TodolistsMainType) => {

                    return (
                        <Grid item xs={3.1} key={td.id}>
                            <Paper style={paperStyle}>
                                <Todolist
                                    entityStatus={td.entityStatus}
                                    editSpanTodo={editSpanTodo}
                                    deleteTodolist={deleteTodolist}
                                    changeIsDone={changeIsDone}
                                    changeFilter={changeFilter}
                                    title={td.title}
                                    filter={td.filter}
                                    todolistId={td.id}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    );
};
