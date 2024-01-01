import React, { useCallback, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { FullInput } from "./FullInput";
import {
    FilterValuesType, todolistActions,
    TodolistsMainType, todolistThunks
} from "../reducers/TodolistReducer";
import Paper from "@mui/material/Paper";
import Todolist from "./todolist/Todolist";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../store/store";
import { taskThunks } from "../reducers/TaskReducer";
import { useAppDispatch } from "../hooks/hooks";
import { Navigate } from "react-router-dom";
import { TaskStatuses } from "../utils/enums";

const paperStyle = {
    padding: "10px 15px",
};

type TodolistListType = {
    addTodolist: (title: string) => void;
    changeFilter: (todolistId: string, value: FilterValuesType) => void;
    changeIsDone: (status: TaskStatuses, todolistId: string, id: string) => void;
    editSpanTodo: (title: string, todolistId: string) => void;
    deleteTodolist: (todolistId: string) => void;
};

export const TodolistList = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistsMainType>>((state) => state.todolists);
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppRootStateType>((state) => state.login.isLoggedIn);

    const changeIsDone = useCallback(
        (status: TaskStatuses, todolistId: string, id: string) => {
            dispatch(taskThunks.changeIsDone({status, todolistId, id}));
        },
        [dispatch],
    );

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        dispatch(todolistActions.changeFilter({ todolistId, value }));
    };

    const addTodolist = useCallback(
        (title: string) => {
            dispatch(todolistThunks.createTodolist({title}));
        },
        [dispatch],
    );


    const deleteTodolist = useCallback(
        (todolistId: string) => {
            dispatch(todolistThunks.deleteTodolist({todolistId}));
        },
        [dispatch],
    );

    const editSpanTodo = useCallback(
        (title: string, todolistId: string) => {
            dispatch(todolistThunks.editTitleTodo({todolistId, title}));
        },
        [dispatch],
    );

    useEffect(() => {
        dispatch(todolistThunks.fetchTodolists());
    }, []);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <Container>
            <Grid container style={{ padding: "20px 0" }}>
                <FullInput callback={addTodolist} />
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
                    );
                })}
            </Grid>
        </Container>
    );
};
