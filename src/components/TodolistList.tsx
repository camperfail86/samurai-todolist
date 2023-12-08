import React, {useCallback, useEffect} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {FullInput} from "./FullInput";
import {
    changeFilterTC,
    createTodolistTC,
    deleteTodolistTC, editSpanTodoTC, fetchTodolistThunk,
    FilterValuesType,
    TodolistsMainType
} from "../reducers/TodolistReducer";
import Paper from "@mui/material/Paper";
import Todolist from "./Todolist";
import {useSelector} from "react-redux";
import {AppStoreType} from "../store/store";
import {changeIsDoneTC, TaskStatuses} from "../reducers/TaskReducer";
import {useAppDispatch} from "../hooks/hooks";
import {Navigate} from "react-router-dom";

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

export const TodolistList = () => {
    const todolists = useSelector<AppStoreType, Array<TodolistsMainType>>((state) => state.todolists)
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppStoreType>((state)=> state.login.isLoggedIn)
    const changeIsDone = useCallback((status: TaskStatuses, todolistId: string, id: string) => {
        dispatch(changeIsDoneTC(status, todolistId, id))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterTC(todolistId, value))
    }, [dispatch])

    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch])

    const editSpanTodo = useCallback((title: string, todolistId: string) => {
        dispatch(editSpanTodoTC(todolistId, title))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistThunk())
    }, []);

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }



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
