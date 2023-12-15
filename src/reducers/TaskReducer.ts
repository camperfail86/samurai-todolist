import { tasksAPI, TaskType, UpdateTaskModelType } from "../api/task-api";
import { Dispatch } from "redux";
import { AppStoreType } from "../store/store";
import { appActions, StatusType } from "./AppReducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { todolistActions } from "./TodolistReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TaskActionType =
    // | RemoveTaskType
    // | ChangeIsDoneType
    // | EditSpanTaskType
    // | AddTaskType
    // | DeleteTodolistType
    // | SetTasksType
    // | ChangeTaskEntityStatusType
    | any;

type TaskStateType = TaskMainType;

export type TaskMainType = Record<string, TaskType[]>;

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

const slice = createSlice({
    name: "task-slice",
    initialState: {} as TaskStateType,
    reducers: {
        removeTask: (state, action: PayloadAction<{ todolistId: string; id: string }>) => {
            const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state[action.payload.todolistId].splice(index, 1);
            }
        },
        addTask: (state, action: PayloadAction<{task: TaskType}>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        editSpanTask: (state, action: PayloadAction<{title: string, todolistId: string, taskId: string}>) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) {
                state[action.payload.todolistId][index].title = action.payload.title
            }
        },
        setTasks: (state, action: PayloadAction<{tasks: TaskType[], todolistId: string}>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
        changeIsDone: (state, action: PayloadAction<{status: boolean, todolistId: string, id: string}>) => {
            let isDone = 2;
            if (action.payload.status) {
                isDone = TaskStatuses.Completed;
            } else {
                isDone = TaskStatuses.New;
            }
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.id)
            state[action.payload.todolistId][index].status = isDone
        },
        changeTaskEntityStatus: (state, action: PayloadAction<{todolistId: string, id: string, entityStatus: StatusType}>) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.id)
            state[action.payload.todolistId][index].entityStatus = action.payload.entityStatus
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(todolistActions.deleteTodolist, (state, action) => {
                delete state[action.payload.todolistId];
            })
            .addCase(todolistActions.setTodolist, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = [];
                });
            });
    },
});

export const taskReducer = slice.reducer;
export const taskActions = slice.actions;

// let initialState: TaskMainType = {};

// export const TaskReducer = (state = initialState, action: TaskActionType): TaskStateType => {
//     switch (action.type) {
//         // case "CHANGE-IS-DONE": {
//         //     let isDone = 2;
//         //     if (action.payload.status) {
//         //         isDone = TaskStatuses.Completed;
//         //     } else {
//         //         isDone = TaskStatuses.New;
//         //     }
//         //     return {
//         //         ...state,
//         //         [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
//         //             t.id === action.payload.id ? { ...t, status: isDone } : t,
//         //         ),
//         //     };
//         // }
//         // case "EDIT-SPAN-TASK": {
//         //     return {
//         //         ...state,
//         //         [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
//         //             t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t,
//         //         ),
//         //     };
//         // }
//         // case "ADD-TASK": {
//         //     if (action.payload.task.title.trim() !== "") {
//         //         let task = action.payload.task;
//         //         return {
//         //             ...state,
//         //             [action.payload.task.todoListId]: [task, ...state[action.payload.task.todoListId]],
//         //         };
//         //     } else return state;
//         // }
//         // case "ADD-TODOLIST": {
//         //     return { ...state, [action.payload.todolist.id]: [] };
//         // }
//         // case "DELETE-TODOLIST": {
//         //     let copyState = { ...state };
//         //     delete copyState[action.payload.todolistId];
//         //     return copyState;
//         // }
//         // case "SET-TODOLISTS": {
//         //     let copyState = { ...state };
//         //     action.payload.todolists.forEach((tl: any) => {
//         //         copyState[tl.id] = [];
//         //     });
//         //     return copyState;
//         // }
//         case "CHANGE-TASK-ENTITY-STATUS": {
//             return {
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
//                     t.id === action.payload.id ? { ...t, entityStatus: action.payload.entityStatus } : t,
//                 ),
//             };
//         }
//         // case "SET-TASKS": {
//         //     return {
//         //         ...state,
//         //         [action.payload.todolistId]: action.payload.tasks.map((t: any) => ({
//         //             ...t,
//         //             entityStatus: "idle",
//         //         })),
//         //     };
//         // }
//         default:
//             return state;
//     }
// };

// type RemoveTaskType = ReturnType<typeof removeTaskAC>;
// export const removeTaskAC = (todolistId: string, id: string) => {
//     return {
//         type: "REMOVE-TASK",
//         payload: { id, todolistId },
//     } as const;
// };

// type ChangeIsDoneType = ReturnType<typeof changeIsDoneAC>;
// export const changeIsDoneAC = (status: boolean, todolistId: string, id: string) => {
//     return {
//         type: "CHANGE-IS-DONE",
//         payload: { status, todolistId, id },
//     } as const;
// };
//
// type EditSpanTaskType = ReturnType<typeof editSpanTaskAC>;
// export const editSpanTaskAC = (title: string, todolistId: string, taskId: string) => {
//     return {
//         type: "EDIT-SPAN-TASK",
//         payload: { title, todolistId, taskId },
//     } as const;
// };
//
// type AddTaskType = ReturnType<typeof addTaskAC>;
// export const addTaskAC = (task: TaskType) => {
//     return {
//         type: "ADD-TASK",
//         payload: { task },
//     } as const;
// };
//
// type DeleteTodolistType = ReturnType<typeof deleteTodolistAC>;
// export const deleteTodolistAC = (todolistId: string) => {
//     return {
//         type: "DELETE-TODOLIST",
//         payload: { todolistId },
//     } as const;
// };
//
// export type SetTasksType = ReturnType<typeof setTasksAC>;
// export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
//     return {
//         type: "SET-TASKS",
//         payload: { todolistId, tasks },
//     } as const;
// };
//
// export type ChangeTaskEntityStatusType = ReturnType<typeof changeTaskEntityStatus>;
// export const changeTaskEntityStatus = (todolistId: string, id: string, entityStatus: StatusType) => {
//     return {
//         type: "CHANGE-TASK-ENTITY-STATUS",
//         payload: { todolistId, id, entityStatus },
//     } as const;
// };

// THUNKS
export const fetchTasksThunk = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setStatus({ status: "loading" }));
        tasksAPI
            .getTasks(todolistId)
            .then((res) => {
                dispatch(taskActions.setTasks({tasks: res.data.items, todolistId}));
                dispatch(appActions.setStatus({ status: "succeeded" }));
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch);
            });
    };
};

export const AddTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setStatus({ status: "loading" }));
        dispatch(todolistActions.changeTodolistEntityStatus({ id: todolistId, entityStatus: "loading" }));
        tasksAPI
            .createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item;
                    dispatch(taskActions.addTask({task}));
                    dispatch(appActions.setStatus({ status: "succeeded" }));
                    dispatch(todolistActions.changeTodolistEntityStatus({ id: todolistId, entityStatus: "succeeded" }));
                } else {
                    handleServerAppError(res.data, dispatch);
                    dispatch(todolistActions.changeTodolistEntityStatus({ id: todolistId, entityStatus: "failed" }));
                }
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch);
                dispatch(todolistActions.changeTodolistEntityStatus({ id: todolistId, entityStatus: "failed" }));
            });
    };
};

export const fetchDeleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setStatus({ status: "loading" }));
        dispatch(taskActions.changeTaskEntityStatus({todolistId, id: taskId, entityStatus: "loading"}));
        tasksAPI
            .deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(taskActions.removeTask({todolistId, id: taskId}));
                dispatch(appActions.setStatus({ status: "succeeded" }));
                // dispatch(taskActions.changeTaskEntityStatus({todolistId, id: taskId, entityStatus: "succeeded"}));
            })
            .catch((e) => {
                dispatch(appActions.setStatus({ status: "failed" }));
                handleServerNetworkError(e, dispatch);
                dispatch(taskActions.changeTaskEntityStatus({todolistId, id: taskId, entityStatus: "failed"}));
            });
    };
};

export const changeIsDoneTC = (status: TaskStatuses, todolistId: string, id: string) => {
    return (dispatch: Dispatch, getState: () => AppStoreType) => {
        const state = getState();
        const task = state.tasks[todolistId].find((t) => t.id === id);
        if (!task) {
            console.warn("no task");
            return;
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
        dispatch(taskActions.changeTaskEntityStatus({todolistId, id: task.id, entityStatus: "loading"}));
        dispatch(appActions.setStatus({ status: "loading" }));
        tasksAPI
            .updateTask(todolistId, id, model)
            .then(() => {
                dispatch(taskActions.changeIsDone({status: !!status, todolistId, id}));
                dispatch(appActions.setStatus({ status: "succeeded" }));
                dispatch(taskActions.changeTaskEntityStatus({todolistId, id: task.id, entityStatus: "succeeded"}));
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch);
                dispatch(appActions.setStatus({ status: "failed" }));
                dispatch(todolistActions.changeTodolistEntityStatus({ id: todolistId, entityStatus: "failed" }));
            });
    };
};

export const editSpanTaskTC = (title: string, todolistId: string, id: string) => {
    return (dispatch: Dispatch, getState: () => AppStoreType) => {
        const state = getState();
        const task = state.tasks[todolistId].find((t) => t.id === id);
        if (!task) {
            console.warn("no task");
            return;
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
        tasksAPI
            .updateTask(todolistId, id, model)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(taskActions.editSpanTask({title, todolistId, taskId: id}));
                    dispatch(appActions.setStatus({ status: "succeeded" }));
                    dispatch(todolistActions.changeTodolistEntityStatus({ id: todolistId, entityStatus: "succeeded" }));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch);
                dispatch(todolistActions.changeTodolistEntityStatus({ id: todolistId, entityStatus: "failed" }));
            })
            .finally(() => {
                dispatch(appActions.setStatus({ status: "succeeded" }));
            });
    };
};
