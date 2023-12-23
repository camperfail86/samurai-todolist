import React, { useCallback, useEffect } from "react";
import "./App.css";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { AppStoreType } from "./store/store";
import { useAppDispatch } from "./hooks/hooks";
import { ErrorSnackBar } from "./components/common/ErrorSnackBar";
import LinearProgress from "@mui/material/LinearProgress";
import { initializeAppTC, StatusType } from "./reducers/AppReducer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TodolistList } from "./components/TodolistList";
import { Login } from "./features/login/Login";
import CircularProgress from "@mui/material/CircularProgress";
import { logoutTC } from "./reducers/LoginReducer";

const loaderStyle = {
    position: "absolute",
};

const boxStyle = {
    position: "relative",
};

function App() {
    const dispatch = useAppDispatch();
    const status = useSelector<AppStoreType, StatusType>((state) => state.app.status);
    const initialized = useSelector<AppStoreType>((state) => state.app.initialized);
    const isLoggedIn = useSelector<AppStoreType>((state) => state.login.isLoggedIn);
    useEffect(() => {
        dispatch(initializeAppTC());
    }, []);

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC());
    }, [dispatch]);

    if (!initialized) {
        return <CircularProgress color="secondary" />;
    }

    return (
        <BrowserRouter>
            <div className="App">
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                News
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
