import React, { memo, useCallback, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FullInput } from "./FullInput";
import { EditableSpan } from "./EditableSpan";
import s from "./todolist.module.css";
import { useSelector } from "react-redux";
import { AppStoreType } from "../store/store";
import {  TaskMainType, taskThunks } from "../reducers/TaskReducer";
import { Task } from "./Task";
import { ButtonFilter } from "./ButtonFilter";
import { ButtonDelete } from "./ButtonDelete";
import { FilterValuesType, todolistThunks } from "../reducers/TodolistReducer";
import { useAppDispatch } from "../hooks/hooks";
import { StatusType } from "../reducers/AppReducer";
import { TaskStatuses } from "../utils/enums";

type PropsType = {
    changeFilter: (todolistId: string, value: FilterValuesType) => void;
    changeIsDone: (status: TaskStatuses, todolistId: string, id: string) => void;
    filter: FilterValuesType;
    todolistId: string;
    title: string;
    editSpanTodo: (title: string, todolistId: string) => void;
    deleteTodolist: (todolistId: string) => void;
    entityStatus: StatusType;
};

const Todolist = memo((props: PropsType) => {
    const dispatch = useAppDispatch();
    const tasks = useSelector<AppStoreType, TaskMainType>((state) => state.tasks);

    useEffect(() => {
        dispatch(taskThunks.fetchTasks(props.todolistId));
    }, []);

    let tasksForTodolist = tasks[props.todolistId];
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.Completed);
    }

    const [listRef] = useAutoAnimate<HTMLUListElement>();

    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "all");
    }, [props.todolistId, props.changeFilter]);
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "active");
    }, [props.todolistId, props.changeFilter]);
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "completed");
    }, [props.todolistId, props.changeFilter]);

    const addTaskCallback = useCallback(
        (title: string) => {
            dispatch(taskThunks.addTask({todolistId: props.todolistId, title}));
        },
        [props.todolistId, dispatch],
    );

    const onClickButtonHandler = useCallback(() => {
        props.deleteTodolist(props.todolistId);
    }, [props.deleteTodolist, props.todolistId]);

    const onChangeTitleTodo = useCallback(
        (title: string) => {
            props.editSpanTodo(title, props.todolistId);
        },
        [props.editSpanTodo, props.todolistId],
    );

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} editSpan={onChangeTitleTodo} />
                <ButtonDelete callback={onClickButtonHandler} disabled={props.entityStatus === "loading"} />
            </h3>
            <FullInput callback={addTaskCallback} disabled={props.entityStatus === "loading"} />
            <ul className={s.list} ref={listRef}>
                {tasksForTodolist?.map((t) => {
                    return (
                        <Task
                            key={t.id}
                            task={t}
                            changeIsDone={props.changeIsDone}
                            entityStatus={t.entityStatus}
                            todolistId={props.todolistId}
                        />
                    );
                })}
            </ul>
            <div>
                <ButtonFilter
                    variant={props.filter === "all" ? "outlined" : "text"}
                    name="All"
                    color="secondary"
                    callback={onAllClickHandler}
                />
                <ButtonFilter
                    variant={props.filter === "active" ? "outlined" : "text"}
                    name="Active"
                    color="secondary"
                    callback={onActiveClickHandler}
                />
                <ButtonFilter
                    variant={props.filter === "completed" ? "outlined" : "text"}
                    name="Completed"
                    color="secondary"
                    callback={onCompletedClickHandler}
                />
            </div>
        </div>
    );
});

export default Todolist;
