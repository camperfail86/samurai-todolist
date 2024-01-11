import { todolistAPI, TodolistType } from "../api/todolist-api";
import { appActions, StatusType } from "./AppReducer";
import { handleServerNetworkError } from "../utils/error-utils";
import { createSlice, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { ResultCode } from "../utils/enums";
import { createAppAsyncThunk } from "../utils/createAppAsyncThunk";

const slice = createSlice({
    initialState: [] as TodolistsMainType[],
    name: "todolist-slice",
    reducers: {
        setTodolist: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            action.payload.todolists.forEach((tl) => {
                state.push({ ...tl, filter: "all", entityStatus: "idle" });
            });
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: StatusType }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) state[index].entityStatus = action.payload.entityStatus;
        },
        changeFilter: (state, action: PayloadAction<{ todolistId: string; value: FilterValuesType }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
            if (index !== -1) state[index].filter = action.payload.value;
        },
        deleteStateTodo: (state, action) => {
            state.splice(0, state.length);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodolist.fulfilled, (state, action) => {
                state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
            })
            .addCase(deleteTodolist.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
                if (index !== -1) {
                    state.splice(index, 1);
                }
            })
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state.push({ ...tl, filter: "all", entityStatus: "idle" });
                });
            })
            .addCase(editTitleTodo.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
                if (index !== -1) state[index].title = action.payload.title;
            })
            .addMatcher(isRejected(todolistThunks.deleteTodolist), (state, action) => {
                const todo = state.find((todo) => todo.id === action.meta.arg.todolistId);
                if (todo) {
                    todo.entityStatus = "idle";
                }
            });
    },
});

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistsMainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: StatusType;
};

const fetchTodolists = createAppAsyncThunk<{
    todolists: TodolistType[];
}>("todolists/fetchTodolist", async (arg, thunkAPI) => {
    const res = await todolistAPI.getTodo();
    return { todolists: res.data };
});

const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
    "todolist/deleteTodolist",
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        dispatch(todolistActions.changeTodolistEntityStatus({ id: arg.todolistId, entityStatus: "loading" }));
        try {
            const res = await todolistAPI.deleteTodo(arg.todolistId);
            dispatch(todolistActions.changeTodolistEntityStatus({ id: arg.todolistId, entityStatus: "succeeded" }));
            return { todolistId: arg.todolistId };
        } catch (e: any) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }
    },
);

const createTodolist = createAppAsyncThunk<{ todolist: TodolistType }, { title: string }>(
    "todolist/createTodolist",
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        const res = await todolistAPI.createTodo(arg.title);
        if (res.data.resultCode === ResultCode.success) {
            console.log(res.data.data.item);
            return { todolist: res.data.data.item };
        } else {
            if (res.data.messages.length) {
                dispatch(appActions.setError({ error: res.data.messages[0] }));
            }
            return rejectWithValue(res.data);
        }
    },
);

const editTitleTodo = createAppAsyncThunk<any, { todolistId: string; title: string }>(
    "todolist/editTitleTodo",
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        dispatch(appActions.setStatus({ status: "loading" }));
        try {
            const res = await todolistAPI.updateTodo(arg.todolistId, arg.title);
            dispatch(appActions.setStatus({ status: "succeeded" }));
            return { todolistId: arg.todolistId, title: arg.title };
        } catch (e: any) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }
    },
);

export const todolistReducer = slice.reducer;
export const todolistActions = slice.actions;
export const todolistThunks = { createTodolist, deleteTodolist, editTitleTodo, fetchTodolists };
