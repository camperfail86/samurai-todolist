import { tasksAPI, TaskType, UpdateTaskModelType } from "../api/task-api";
import { appActions, StatusType } from "./AppReducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { todolistActions, todolistThunks } from "./TodolistReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../utils/createAppAsyncThunk";
import { ResultCode, TaskStatuses } from "../utils/enums";
import { thunkTryCatch } from "../utils/thunkTryCatch";

type TaskStateType = TaskMainType;

export type TaskMainType = Record<string, TaskType[]>;

const slice = createSlice({
    name: "task-slice",
    initialState: {} as TaskStateType,
    reducers: {
        changeTaskEntityStatus: (
            state,
            action: PayloadAction<{
                todolistId: string;
                id: string;
                entityStatus: StatusType;
            }>,
        ) => {
            const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.id);
            state[action.payload.todolistId][index].entityStatus = action.payload.entityStatus;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(changeIsDone.fulfilled, (state, action) => {
                let isDone = 2;
                if (action.payload.status) {
                    isDone = TaskStatuses.Completed;
                } else {
                    isDone = TaskStatuses.New;
                }
                const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.id);
                state[action.payload.todolistId][index].status = isDone;
            })
            .addCase(todolistThunks.createTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(todolistThunks.deleteTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todolistId];
            })
            .addCase(todolistActions.deleteStateTodo, (state, action) => {
                Object.keys(state).forEach((key) => delete state[key]);
            })
            .addCase(todolistActions.setTodolist, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = [];
                });
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks;
            })
            .addCase(editSpanTask.fulfilled, (state, action) => {
                const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state[action.payload.todolistId][index].title = action.payload.title;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state[action.payload.todolistId].splice(index, 1);
                }
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task);
            })
            .addCase(todolistThunks.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = []
                })
            });
    },
});

export const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
    "tasks/fetchTasks",
    async (todolistId: string, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        dispatch(appActions.setStatus({ status: "loading" }));
        try {
            const res = await tasksAPI.getTasks(todolistId);
            dispatch(appActions.setStatus({ status: "succeeded" }));
            return { tasks: res.data.items, todolistId };
        } catch (e: any) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }
    },
);

export const addTask = createAppAsyncThunk<{ task: TaskType }, { todolistId: string; title: string }>(
    "tasks/addTask",
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        return thunkTryCatch(thunkAPI, async () => {
            const res = await tasksAPI.createTask(arg.todolistId, arg.title)
            if (res.data.resultCode === ResultCode.success) {
                const task = res.data.data.item
                return {task}
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)
            }
        })
    },
);

export const deleteTask = createAppAsyncThunk<{ todolistId: string; id: string }, { todolistId: string; taskId: string }>(
    "tasks/deleteTask",
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        let { todolistId, taskId } = arg;
        dispatch(appActions.setStatus({ status: "loading" }));
        dispatch(taskActions.changeTaskEntityStatus({ todolistId, id: taskId, entityStatus: "loading" }));
        try {
            const res = await tasksAPI.deleteTask(todolistId, taskId);
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setStatus({ status: "succeeded" }));
                dispatch(taskActions.changeTaskEntityStatus({ todolistId, id: taskId, entityStatus: "succeeded" }));
                return { todolistId, id: taskId };
            } else {
                dispatch(appActions.setStatus({ status: "failed" }));
                dispatch(taskActions.changeTaskEntityStatus({ todolistId, id: taskId, entityStatus: "failed" }));
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null);
            }
        } catch (e: any) {
            handleServerNetworkError(e, dispatch);
            dispatch(appActions.setStatus({ status: "failed" }));
            dispatch(taskActions.changeTaskEntityStatus({ todolistId, id: taskId, entityStatus: "failed" }));
            return rejectWithValue(null);
        }
    },
);

export const changeIsDone = createAppAsyncThunk<
    {
        status: boolean;
        todolistId: string;
        id: string;
    },
    {
        status: TaskStatuses;
        todolistId: string;
        id: string;
    }
>("tasks/changeIsDone", async (arg, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    let { todolistId, id, status } = arg;
    const state = getState();
    const task = state.tasks[arg.todolistId].find((t) => t.id === id);
    if (!task) {
        console.warn("no task");
        return rejectWithValue(null);
    }
    status === TaskStatuses.Completed ? (status = TaskStatuses.New) : (status = TaskStatuses.Completed);
    const model: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
    };
    dispatch(taskActions.changeTaskEntityStatus({ todolistId, id: task.id, entityStatus: "loading" }));
    dispatch(appActions.setStatus({ status: "loading" }));
    try {
        const res = await tasksAPI.updateTask(todolistId, id, model);
        dispatch(appActions.setStatus({ status: "succeeded" }));
        dispatch(taskActions.changeTaskEntityStatus({ todolistId, id: task.id, entityStatus: "succeeded" }));
        return { status: !!status, todolistId, id };
    } catch (e: any) {
        handleServerNetworkError(e, dispatch);
        dispatch(appActions.setStatus({ status: "failed" }));
        dispatch(todolistActions.changeTodolistEntityStatus({ id: todolistId, entityStatus: "failed" }));
        return rejectWithValue(null);
    }
});

export const editSpanTask = createAppAsyncThunk<
    { title: string; todolistId: string; id: string },
    {
        title: string;
        todolistId: string;
        id: string;
    }
>("tasks/editSpanTask", async (arg, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    let { todolistId, id, title } = arg;
    const state = getState();
    const task = state.tasks[todolistId].find((t) => t.id === id);
    if (!task) {
        console.warn("no task");
        return rejectWithValue(null);
    }
    const model: UpdateTaskModelType = {
        title: title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
    };
    dispatch(appActions.setStatus({ status: "loading" }));
    try {
        const res = await tasksAPI.updateTask(todolistId, id, model);
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setStatus({ status: "succeeded" }));
            dispatch(todolistActions.changeTodolistEntityStatus({ id: todolistId, entityStatus: "succeeded" }));
            return { title, todolistId, id };
        } else {
            handleServerAppError(res.data, dispatch);
            dispatch(appActions.setStatus({ status: "succeeded" }));
            return rejectWithValue(null);
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch);
        dispatch(todolistActions.changeTodolistEntityStatus({ id: todolistId, entityStatus: "failed" }));
        dispatch(appActions.setStatus({ status: "succeeded" }));
        return rejectWithValue(null);
    }
});

export const taskReducer = slice.reducer;
export const taskActions = slice.actions;
export const taskThunks = { fetchTasks, addTask, changeIsDone, editSpanTask, deleteTask };
