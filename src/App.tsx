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
    addTasksArrayNullAC,
    changeIsDoneAC,
    editSpanTaskAC,
    removeTaskAC,
    TaskReducer
} from "./reducers/TaskReducer";

const paperStyle = {
    padding: '10px 15px'
}

export type FilterValuesType = 'all' | 'completed' | 'active'
export type todolistsType = {
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
    const [todolists, dispatchTodolist] = useReducer(TodolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchTasks] = useReducer(TaskReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTask = (todolistId: string, id: string) => {
        dispatchTasks(removeTaskAC(todolistId, id))
    }

    const changeIsDone = (todolistId: string, id: string) => {
        dispatchTasks(changeIsDoneAC(todolistId, id))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatchTasks(addTaskAC(todolistId, title))
    }

    const addTodolist = (title: string) => {
        let todolistId = v1();
        dispatchTodolist(addTodolistAC(todolistId, title))
        dispatchTasks(addTasksArrayNullAC(todolistId, title))
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        dispatchTodolist(changeFilterAC(todolistId, value))
    }

    const deleteTodolist = (todolistId: string) => {
        delete tasks[todolistId]
        dispatchTodolist(deleteTodolistAC(todolistId))
    }

    const editSpan = (title: string, todolistId: string, taskId: string) => {
        dispatchTasks(editSpanTaskAC(title, todolistId, taskId))
    }

    const editSpanTodo = (title: string, todolistId: string) => {
        dispatchTodolist(editSpanTodoAC(title, todolistId))
    }

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

                        let tasksForTodolist = tasks[td.id];
                        if (td.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                        }
                        if (td.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                        }

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
                                            editSpan={editSpan}
                                            addTask={addTask}
                                            changeIsDone={changeIsDone}
                                            tasks={tasksForTodolist}
                                            changeFilter={changeFilter}
                                            removeTask={removeTask}
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
