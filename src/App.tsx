import React, { useCallback, useEffect } from "react";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./store/store";
import { useAppDispatch } from "./hooks/hooks";
import { ErrorSnackBar } from "./components/common/ErrorSnackBar";
import LinearProgress from "@mui/material/LinearProgress";
import { appThunks, StatusType } from "./reducers/AppReducer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TodolistList } from "./components/TodolistList";
import { Login } from "./features/login/Login";
import CircularProgress from "@mui/material/CircularProgress";
import { loginThunks } from "./reducers/LoginReducer";

function App() {
    const dispatch = useAppDispatch();
    const status = useSelector<AppRootStateType, StatusType>((state) => state.app.status);
    const initialized = useSelector<AppRootStateType>((state) => state.app.initialized);
    const isLoggedIn = useSelector<AppRootStateType>((state) => state.login.isLoggedIn);

    useEffect(() => {
        dispatch(appThunks.initializeApp());
    }, []);

    const logoutHandler = useCallback(() => {
        dispatch(loginThunks.logout());
    }, [dispatch]);

    if (!initialized) {
        return <CircularProgress color="secondary" />;
    }

    return (
        <BrowserRouter>
            <div className="App">
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" style={{backgroundColor: 'black'}}>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                TODOLIST
                            </Typography>
                            {isLoggedIn ? (
                                <Button color="inherit" onClick={logoutHandler}>
                                    Log Out
                                </Button>
                            ) : null}
                        </Toolbar>
                    </AppBar>
                    {status === "loading" ? <LinearProgress color="secondary" /> : ""}
                </Box>
                <Routes>
                    <Route path="/" element={<TodolistList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>} />
                </Routes>
                <ErrorSnackBar />
            </div>
        </BrowserRouter>
    );
}

export default App;
