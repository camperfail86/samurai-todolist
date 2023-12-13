import { AddTodolistType, changeTodolistEntityStatus, SetTodolistsType } from "./TodolistReducer";
import { tasksAPI, TaskType, UpdateTaskModelType } from "../api/task-api";
import { Dispatch } from "redux";
import { AppStoreType } from "../store/store";
import { setErrorAC, setStatusAC, StatusType } from "./AppReducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";

export type TaskActionType =
    | RemoveTaskType
    | ChangeIsDoneType
    | EditSpanTaskType
    | AddTaskType
    | DeleteTodolistType
    | AddTodolistType
    | SetTodolistsType
    | SetTasksType
    | ChangeTaskEntityStatusType;

type TaskStateType = TaskMainType;

export type TaskMainType = Record<string, TaskType[]>;

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

let initialState: TaskMainType = {
    // [todolistID1]: [
    //     {id: v1(), title: "HTML&CSS", todoListId: todolistID1,
    //         status: TaskStatuses.Completed, startDate: '',
    //         priority: 1, addedDate: '', deadline: '', order: 1,
    //         description: ''
    //     },
    //     {id: v1(), title: "JS", todoListId: todolistID1,
    //         status: TaskStatuses.New, startDate: '',
    //         priority: 2, addedDate: '', deadline: '', order: 2,
    //         description: ''
    //     },
    // ],
};

export const TaskReducer = (state = initialState, action: TaskActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.id),
            };
        }
        case "CHANGE-IS-DONE": {
            let isDone = 2;
            if (action.payload.status) {
                isDone = TaskStatuses.Completed;
            } else {
                isDone = TaskStatuses.New;
            }
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
                    t.id === action.payload.id ? { ...t, status: isDone } : t,
                ),
            };
        }
        case "EDIT-SPAN-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
                    t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t,
                ),
            };
        }
        case "ADD-TASK": {
            if (action.payload.task.title.trim() !== "") {
                let task = action.payload.task;
                return {
                    ...state,
                    [action.payload.task.todoListId]: [task, ...state[action.payload.task.todoListId]],
                };
            } else return state;
        }
        case "ADD-TODOLIST": {
            return { ...state, [action.payload.todolist.id]: [] };
        }
        case "DELETE-TODOLIST": {
            let copyState = { ...state };
            delete copyState[action.payload.todolistId];
            return copyState;
        }
        case "SET-TODOLISTS": {
            let copyState = { ...state };
            action.payload.todolists.forEach((tl) => {
                copyState[tl.id] = [];
            });
            return copyState;
        }
        case "CHANGE-TASK-ENTITY-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
                    t.id === action.payload.id ? { ...t, entityStatus: action.payload.entityStatus } : t,
                ),
            };
        }
        case "SET-TASKS": {
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks.map((t) => ({
                    ...t,
                    entityStatus: "idle",
                })),
            };
        }
        default:
            return state;
    }
};

type RemoveTaskType = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: "REMOVE-TASK",
        payload: { id, todolistId },
    } as const;
};

type ChangeIsDoneType = ReturnType<typeof changeIsDoneAC>;
export const changeIsDoneAC = (status: boolean, todolistId: string, id: string) => {
    return {
        type: "CHANGE-IS-DONE",
        payload: { status, todolistId, id },
    } as const;
};

type EditSpanTaskType = ReturnType<typeof editSpanTaskAC>;
export const editSpanTaskAC = (title: string, todolistId: string, taskId: string) => {
    return {
        type: "EDIT-SPAN-TASK",
        payload: { title, todolistId, taskId },
    } as const;
};

type AddTaskType = ReturnType<typeof addTaskAC>;
export const addTaskAC = (task: TaskType) => {
    return {
        type: "ADD-TASK",
        payload: { task },
    } as const;
};

type DeleteTodolistType = ReturnType<typeof deleteTodolistAC>;
export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: "DELETE-TODOLIST",
        payload: { todolistId },
    } as const;
};

export type SetTasksType = ReturnType<typeof setTasksAC>;
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {
        type: "SET-TASKS",
        payload: { todolistId, tasks },
    } as const;
};

export type ChangeTaskEntityStatusType = ReturnType<typeof changeTaskEntityStatus>;
export const changeTaskEntityStatus = (todolistId: string, id: string, entityStatus: StatusType) => {
    return {
        type: "CHANGE-TASK-ENTITY-STATUS",
        payload: { todolistId, id, entityStatus },
    } as const;
};

// THUNKS
export const fetchTasksThunk = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC("loading"));
        tasksAPI
            .getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId));
                dispatch(setStatusAC("succeeded"));
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch);
            });
    };
};

export const AddTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC("loading"));
        dispatch(changeTodolistEntityStatus(todolistId, "loading"));
        tasksAPI
            .createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item;
                    dispatch(addTaskAC(task));
                    dispatch(setStatusAC("succeeded"));
                    dispatch(changeTodolistEntityStatus(todolistId, "succeeded"));
                } else {
                    handleServerAppError(res.data, dispatch);
                    dispatch(changeTodolistEntityStatus(todolistId, "failed"));
                }
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch);
                dispatch(changeTodolistEntityStatus(todolistId, "failed"));
            });
    };
};

export const fetchDeleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC("loading"));
        dispatch(changeTaskEntityStatus(todolistId, taskId, "loading"));
        tasksAPI
            .deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(removeTaskAC(todolistId, taskId));
                dispatch(setStatusAC("succeeded"));
                dispatch(changeTaskEntityStatus(todolistId, taskId, "succeeded"));
            })
            .catch((e) => {
                dispatch(setStatusAC("failed"));
                handleServerNetworkError(e, dispatch);
                dispatch(changeTaskEntityStatus(todolistId, taskId, "failed"));
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
        dispatch(changeTaskEntityStatus(todolistId, task.id, "loading"));
        dispatch(setStatusAC("loading"));
        tasksAPI
            .updateTask(todolistId, id, model)
            .then(() => {
                dispatch(changeIsDoneAC(!!status, todolistId, id));
                dispatch(setStatusAC("succeeded"));
                dispatch(changeTaskEntityStatus(todolistId, task.id, "succeeded"));
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch);
                dispatch(setStatusAC("failed"));
                dispatch(changeTodolistEntityStatus(todolistId, "failed"));
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
        dispatch(setStatusAC("loading"));
        tasksAPI
            .updateTask(todolistId, id, model)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(editSpanTaskAC(title, todolistId, id));
                    dispatch(setStatusAC("succeeded"));
                    dispatch(changeTodolistEntityStatus(todolistId, "succeeded"));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch);
                dispatch(changeTodolistEntityStatus(todolistId, "failed"));
            })
            .finally(() => {
                dispatch(setStatusAC("succeeded"));
            });
    };
};
