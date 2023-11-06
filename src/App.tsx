import React, {useCallback, useReducer} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from "uuid";
import {FullInput} from "./components/FullInput";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from "@mui/material/Grid";
import {
    addTodolistAC, AddTodolistType,
    changeFilterAC,
    deleteTodolistAC,
    editSpanTodoAC,
    TodolistReducer
} from "./reducers/TodolistReducer";
import {
    changeIsDoneAC,
} from "./reducers/TaskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./store/store";

const paperStyle = {
    padding: '10px 15px'
}

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = Record<string, TaskType[]>

function App() {
    const todolists = useSelector<AppStoreType, Array<TodolistsType>>((state) => state.todolists)
    const dispatch = useDispatch()

    const changeIsDone = useCallback((todolistId: string, id: string) => {
        dispatch(changeIsDoneAC(todolistId, id))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let todolistId = v1();
        dispatch(addTodolistAC(todolistId, title))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, value))
    },[dispatch])

    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistAC(todolistId))
    }, [dispatch])

    const editSpanTodo = useCallback((title: string, todolistId: string) => {
        dispatch(editSpanTodoAC(title, todolistId))
    }, [dispatch])

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container>
                <Grid container style={ {padding: '20px 0'} }>
                    <FullInput callback={addTodolist}/>
                </Grid>
                <Grid container spacing={2}>
                    {todolists.map(td => {
                        // const onChangeTitleTodo = (title: string) => {
                        //     editSpanTodo(title, td.id)
                        // }

                        return (
                            <Grid item xs={3.1} key={td.id}>
                                <Paper style={paperStyle}>
                                        {/*<h3>*/}
                                        {/*    <EditableSpan title={td.title} editSpan={onChangeTitleTodo}/>*/}
                                        {/*    <IconButton onClick={() => deleteTodolist(td.id)} aria-label="delete"*/}
                                        {/*                size="small">*/}
                                        {/*        <DeleteIcon fontSize="small"/>*/}
                                        {/*    </IconButton>*/}
                                        {/*</h3>*/}

                                        <Todolist
                                            editSpanTodo={editSpanTodo}
                                            deleteTodolist={deleteTodolist}
                                            // addTask={addTask}
                                            changeIsDone={changeIsDone}
                                            // tasks={tasksForTodolist}
                                            changeFilter={changeFilter}
                                            // removeTask={removeTask}
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
        </div>
    );
}

export default App;
