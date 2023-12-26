import { todolistAPI, TodolistType } from "../api/todolist-api";
import { Dispatch } from "redux";
import { appActions, StatusType } from "./AppReducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskThunks } from "./TaskReducer";
import { ThunkDispatch } from "redux-thunk";
import { ResultCode } from "../utils/enums";
import { createAppAsyncThunk } from "../utils/createAppAsyncThunk";

export type TodolistActionType = any;

const slice = createSlice({
    initialState: [] as TodolistsMainType[],
    name: "todolist-slice",
    reducers: {
        // deleteTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
        //     const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
        //     if (index !== -1) {
        //         state.splice(index, 1);
        //     }
        // },
        // addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
        //     state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
        // },
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
        // editSpanTodo: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
        //     const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
        //     if (index !== -1) state[index].title = action.payload.title;
        // },
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
            .addCase(editTitleTodo.fulfilled, (state, action)=>{
                    const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
                    if (index !== -1) state[index].title = action.payload.title;
            });
    },
});

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistsMainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: StatusType;
};

// export const fetchTodolistThunk = () => (dispatch: ThunkDispatch<any, any, any>) => {
//     dispatch(appActions.setStatus({ status: "loading" }));
//     todolistAPI
//         .getTodo()
//         .then((res) => {
//             dispatch(todolistActions.setTodolist({ todolists: res.data }));
//             dispatch(appActions.setStatus({ status: "succeeded" }));
//             return res.data;
//         })
//         .then((todos) => {
//             for (let i = 0; i < todos.length; i++) {
//                 dispatch(taskThunks.fetchTasks(todos[i].id));
//             }
//         })
//         .catch((error) => {
//             handleServerAppError(error, dispatch);
//         });
// };

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }>('todolists/fetchTodolist', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setStatus({ status: "loading" }));
    try {
        const res = await todolistAPI.getTodo()
        // dispatch(todolistActions.setTodolist({ todolists: res.data }));
        // dispatch(appActions.setStatus({ status: "succeeded" }));
        console.log(res.data)
        return {todolists: res.data};
    } catch (e: any) {
        handleServerAppError(e, dispatch);
        // dispatch(appActions.setStatus({ status: "failed" }));
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setStatus({ status: "succeeded" }));
    }

        // .then((todos) => {
        //     for (let i = 0; i < todos.length; i++) {
        //         dispatch(taskThunks.fetchTasks(todos[i].id));
        //     }
        // })
})


const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
    "todolist/deleteTodolist",
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        dispatch(appActions.setStatus({ status: "loading" }));
        dispatch(todolistActions.changeTodolistEntityStatus({ id: arg.todolistId, entityStatus: "loading" }));
        try {
            const res = await todolistAPI.deleteTodo(arg.todolistId);
            dispatch(appActions.setStatus({ status: "succeeded" }));
            dispatch(todolistActions.changeTodolistEntityStatus({ id: arg.todolistId, entityStatus: "succeeded" }));
            return { todolistId: arg.todolistId }
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
        dispatch(appActions.setStatus({ status: "loading" }));
        try {
            const res = await todolistAPI.createTodo(arg.title);
            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setStatus({ status: "succeeded" }));
                console.log(res.data.data.item);
                return { todolist: res.data.data.item };
            } else {
                if (res.data.messages.length) {
                    dispatch(appActions.setError({ error: res.data.messages[0] }));
                }
                dispatch(appActions.setStatus({ status: "failed" }));
                return rejectWithValue(null);
            }
        } catch (e: any) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }
    },
);

const editTitleTodo = createAppAsyncThunk<any, { todolistId: string, title: string }>("todolist/editTitleTodo",
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        dispatch(appActions.setStatus({ status: "loading" }));
        try {
            const res = await todolistAPI.updateTodo(arg.todolistId, arg.title)
            dispatch(appActions.setStatus({ status: "succeeded" }));
            return { todolistId: arg.todolistId, title: arg.title }
        } catch (e: any) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    });


export const todolistReducer = slice.reducer;
export const todolistActions = slice.actions;
export const todolistThunks = { createTodolist, deleteTodolist, editTitleTodo, fetchTodolists };
