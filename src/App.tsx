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
import {
    changeFilterTC, createTodolistTC, deleteTodolistTC, editSpanTodoTC, fetchTodolistThunk, FilterValuesType,
    TodolistsMainType
} from "./reducers/TodolistReducer";
import {
    changeIsDoneTC, TaskStatuses,
} from "./reducers/TaskReducer";
import {useSelector} from "react-redux";
import {AppStoreType} from "./store/store";
import {useAppDispatch} from "./hooks/hooks";
import {ErrorSnackBar} from "./components/common/ErrorSnackBar";
import LinearProgress from "@mui/material/LinearProgress";
import {initializeAppTC, StatusType} from "./reducers/AppReducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TodolistList} from "./components/TodolistList";
import {Login} from "./features/login/Login";
import CircularProgress from '@mui/material/CircularProgress';
import {logoutTC} from "./reducers/LoginReducer";

const loaderStyle = {
    position: 'absolute'
}

const boxStyle = {
    position: 'relative'
}

function App() {
    const dispatch = useAppDispatch()
    const status = useSelector<AppStoreType, StatusType>((state) => state.app.status)
    const initialized = useSelector<AppStoreType>((state) => state.app.initialized)
    const isLoggedIn = useSelector<AppStoreType>(state => state.login.isLoggedIn)
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    if (!initialized) {
        return <CircularProgress color="secondary" />
    }

    // const changeIsDone = useCallback((status: TaskStatuses, todolistId: string, id: string) => {
    //     dispatch(changeIsDoneTC(status, todolistId, id))
    // }, [dispatch])
    //
    // const addTodolist = useCallback((title: string) => {
    //     dispatch(createTodolistTC(title))
    // }, [dispatch])
    //
    // const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
    //     dispatch(changeFilterTC(todolistId, value))
    // }, [dispatch])
    //
    // const deleteTodolist = useCallback((todolistId: string) => {
    //     dispatch(deleteTodolistTC(todolistId))
    // }, [dispatch])
    //
    // const editSpanTodo = useCallback((title: string, todolistId: string) => {
    //     dispatch(editSpanTodoTC(todolistId, title))
    // }, [dispatch])

    return (
        <BrowserRouter>
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
                            {isLoggedIn ? <Button color="inherit" onClick={logoutHandler}>Log Out</Button> : null}
                        </Toolbar>
                    </AppBar>
                    {status === 'loading' ? <LinearProgress color="secondary"/> : ''}
                </Box>
                <Routes>
                    <Route path='/'
                           element={<TodolistList />}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='*' element={<h1>404: PAGE NOT FOUND</h1>} />
                </Routes>
                <ErrorSnackBar/>
            </div>
        </BrowserRouter>
    );
}

export default App;
