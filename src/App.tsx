import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {FullInput} from "./components/FullInput";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from "@mui/material/Grid";
import {changeFilterTC, createTodolistTC, deleteTodolistTC, editSpanTodoTC, fetchTodolistThunk, FilterValuesType,
    TodolistsMainType
} from "./reducers/TodolistReducer";
import {
     changeIsDoneTC, TaskStatuses,
} from "./reducers/TaskReducer";
import {useSelector} from "react-redux";
import {AppStoreType} from "./store/store";
import {useAppDispatch} from "./hooks/hooks";
import {ErrorSnackBar} from "./components/common/ErrorSnackBar";
import {LinearProgress} from "@mui/material";
import {StatusType} from "./reducers/AppReducer";

const paperStyle = {
    padding: '10px 15px'
}

const loaderStyle={
    position: 'absolute'
}

const boxStyle = {
    position: 'relative'
}

function App() {
    const todolists = useSelector<AppStoreType, Array<TodolistsMainType>>((state) => state.todolists)
    const dispatch = useAppDispatch()
    const status = useSelector<AppStoreType, StatusType>((state) => state.app.status)

    useEffect(() => {
        dispatch(fetchTodolistThunk)
    }, [])

    const changeIsDone = useCallback((status: TaskStatuses, todolistId: string, id: string) => {
        dispatch(changeIsDoneTC(status, todolistId, id))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterTC(todolistId, value))
    },[dispatch])

    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch])

    const editSpanTodo = useCallback((title: string, todolistId: string) => {
        dispatch(editSpanTodoTC(todolistId, title))
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
                {status === 'loading' ? <LinearProgress color="secondary" /> : ''}
            </Box>
            <Container>
                <Grid container style={ {padding: '20px 0'} }>
                    <FullInput callback={addTodolist}/>
                </Grid>
                <Grid container spacing={2}>
                    {todolists.map(td => {

                        return (
                            <Grid item xs={3.1} key={td.id}>
                                <Paper style={paperStyle}>
                                        <Todolist
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
            <ErrorSnackBar/>
        </div>
    );
}

export default App;
