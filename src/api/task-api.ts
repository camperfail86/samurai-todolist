import { instance, ResponseType } from "./todolist-api";
import { StatusType } from "../reducers/AppReducer";
import { TaskStatuses } from "../utils/enums";

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`/todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, { title: title });
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
};

export type TaskType = {
    addedDate: string;
    deadline: string;
    description: string;
    id: string;
    order: number;
    priority: number;
    startDate: string;
    status: TaskStatuses;
    title: string;
    todoListId: string;
    entityStatus: StatusType;
};

export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: number;
    startDate: string;
    deadline: string;
};

export type GetTasksType = {
    error: string | null;
    items: TaskType[];
    totalCount: number;
};
