import React, {useReducer, useState} from 'react';
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
import {changeFilterAC, TodolistReducer} from "./reducers/TodolistReducer";

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
export type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    // const [todolist2, dispatchTodolist] = useReducer(TodolistReducer, [
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])

    let [tasks, setTasks] = useState<TasksType>({
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
        let filteredTasks = tasks[todolistId].filter(t => t.id != id);
        setTasks({...tasks, [todolistId]: filteredTasks});
    }

    const changeIsDone = (todolistId: string, id: string) => {
        const changeIsDoneTasks = tasks[todolistId].map((t) => t.id === id ? {...t, isDone: !t.isDone} : t)
        setTasks({...tasks, [todolistId]: changeIsDoneTasks})
    }

    const addTask = (todolistId: string, title: string) => {
        if (title.trim() !== '') {
            let task = {id: v1(), title: title, isDone: false};
            let newTasks = [task, ...tasks[todolistId]];
            setTasks({...tasks, [todolistId]: newTasks});
        }
    }

    const addTodolist = (title: string) => {
        if (title.trim() !== '') {
            let todolistId = v1();
            let newTodolist: todolistsType = {id: todolistId, title: title, filter: 'all'};
            setTodolists([...todolists, newTodolist]);
            setTasks({...tasks, [todolistId]: []});
        }
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(td => {
            return (td.id === todolistId ? {...td, filter: value} : {...td})
        }))
        // dispatchTodolist(changeFilterAC(todolistId, value))
    }

    const deleteTodolist = (todolistId: string) => {
        let filteredTodo = todolists.filter(td => td.id !== todolistId)
        delete tasks[todolistId]
        setTodolists(filteredTodo)
    }

    const editSpan = (title: string, todolistId: string, taskId: string) => {
        let newTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
        }
        setTasks(newTasks)
    }

    const editSpanTodo = (title: string, todolistId: string) => {
        let newTodolists = todolists.map(td => td.id === todolistId ? {...td, title} : td)
        setTodolists(newTodolists)
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
                {/*<div className="todolists">*/}
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
                {/*</div>*/}
            </Container>
        </div>
    );
}

export default App;
