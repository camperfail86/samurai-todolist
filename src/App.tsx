import React, {useReducer} from 'react';
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
    addTodolistAC,
    changeFilterAC,
    deleteTodolistAC,
    editSpanTodoAC,
    TodolistReducer
} from "./reducers/TodolistReducer";
import {
    addTaskAC,
    // addTasksArrayNullAC,
    changeIsDoneAC,
    editSpanTaskAC,
    removeTaskAC,
    TaskReducer
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

let todolistID1 = v1();
let todolistID2 = v1();
function App() {
    const todolists = useSelector<AppStoreType, Array<TodolistsType>>((state) => state.todolists)
    const dispatch = useDispatch()


    const changeIsDone = (todolistId: string, id: string) => {
        dispatch(changeIsDoneAC(todolistId, id))
    }

    const addTodolist = (title: string) => {
        let todolistId = v1();
        dispatch(addTodolistAC(todolistId, title))
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, value))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC(todolistId))
    }

    // const editSpan = (title: string, todolistId: string, taskId: string) => {
    //     dispatch(editSpanTaskAC(title, todolistId, taskId))
    // }

    const editSpanTodo = (title: string, todolistId: string) => {
        dispatch(editSpanTodoAC(title, todolistId))
    }

    console.log('app render')

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
                        const onChangeTitleTodo = (title: string) => {
                            editSpanTodo(title, td.id)
                        }

                        return (
                            <Grid item xs={3.1}>
                                <Paper style={paperStyle}>
                                    <div className='todolist' key={td.id}>
                                        <h3>
                                            <EditableSpan title={td.title} editSpan={onChangeTitleTodo}/>
                                            {/*<button onClick={() => deleteTodolist(td.id)}>x</button>*/}
                                            <IconButton onClick={() => deleteTodolist(td.id)} aria-label="delete"
                                                        size="small">
                                                <DeleteIcon fontSize="small"/>
                                            </IconButton>
                                        </h3>

                                        <Todolist
                                            // editSpan={editSpan}
                                            // addTask={addTask}
                                            changeIsDone={changeIsDone}
                                            // tasks={tasksForTodolist}
                                            changeFilter={changeFilter}
                                            // removeTask={removeTask}
                                            filter={td.filter}
                                            todolistId={td.id}
                                        />
                                    </div>
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
