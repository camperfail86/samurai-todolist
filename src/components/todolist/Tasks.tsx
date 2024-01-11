import React from "react";
import s from "../todolist.module.css";
import { Task } from "../Task";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TaskStatuses } from "../../utils/enums";
import { TaskMainType } from "../../reducers/TaskReducer";
import { FilterValuesType } from "../../reducers/TodolistReducer";

type Props = {
    todolistId: string;
    tasks: TaskMainType
    changeIsDone: (status: TaskStatuses, todolistId: string, id: string) => void;
    filter: FilterValuesType
}

export const Tasks = ({tasks, filter, todolistId, changeIsDone}: Props) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>();

    let tasksForTodolist = tasks[todolistId];
    if (filter === "active") {
        tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.Completed);
    }

    return (
        <ul className={s.list} ref={listRef}>
            {tasksForTodolist?.map((t) => {
                return (
                    <Task
                        key={t.id}
                        task={t}
                        changeIsDone={changeIsDone}
                        entityStatus={t.entityStatus}
                        todolistId={todolistId}
                    />
                );
            })}
        </ul>
    );
};
