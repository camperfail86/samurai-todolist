import React, { memo, useCallback, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FullInput } from "../FullInput";
import { EditableSpan } from "../EditableSpan";
import s from "../todolist.module.css";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../store/store";
import {  TaskMainType, taskThunks } from "../../reducers/TaskReducer";
import { ButtonDelete } from "../ButtonDelete";
import { FilterValuesType, todolistActions, todolistThunks } from "../../reducers/TodolistReducer";
import { useAppDispatch } from "../../hooks/hooks";
import { StatusType } from "../../reducers/AppReducer";
import { TaskStatuses } from "../../utils/enums";
import { FilterTaskButtons } from "./FilterTaskButtons";
import { Tasks } from "./Tasks";

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
    const tasks = useSelector<AppRootStateType, TaskMainType>((state) => state.tasks);

    // const changeFilter = (todolistId: string, value: FilterValuesType) => {
    //     dispatch(todolistActions.changeFilter({ todolistId, value }));
    // };

    useEffect(() => {
        dispatch(taskThunks.fetchTasks(props.todolistId));
    }, []);

    const addTaskCallback = useCallback(
        (title: string) => {
            return dispatch(taskThunks.addTask({todolistId: props.todolistId, title})).unwrap();
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
            <Tasks tasks={tasks} filter={props.filter} todolistId={props.todolistId} changeIsDone={props.changeIsDone}/>
            <FilterTaskButtons changeFilter={props.changeFilter} filter={props.filter} todolistId={props.todolistId} title={props.title} />
        </div>
    );
});

export default Todolist;


