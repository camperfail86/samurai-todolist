import React, { memo, useCallback, useEffect } from "react";
import { FullInput } from "../FullInput";
import { EditableSpan } from "../EditableSpan";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../store/store";
import { TaskMainType, taskThunks } from "../../reducers/TaskReducer";
import { ButtonDelete } from "../ButtonDelete";
import { FilterValuesType } from "../../reducers/TodolistReducer";
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

const Todolist = memo(
    ({
        changeFilter,
        todolistId,
        deleteTodolist,
        filter,
        changeIsDone,
        entityStatus,
        title,
        editSpanTodo,
    }: PropsType) => {
        const dispatch = useAppDispatch();
        const tasks = useSelector<AppRootStateType, TaskMainType>((state) => state.tasks);

        useEffect(() => {
            dispatch(taskThunks.fetchTasks(todolistId));
        }, []);

        const addTaskCallback = useCallback(
            (title: string) => {
                return dispatch(taskThunks.addTask({ todolistId: todolistId, title })).unwrap();
            },
            [todolistId, dispatch],
        );

        const onClickButtonHandler = useCallback(() => {
            deleteTodolist(todolistId);
        }, [deleteTodolist, todolistId]);

        const onChangeTitleTodo = useCallback(
            (title: string) => {
                editSpanTodo(title, todolistId);
            },
            [editSpanTodo, todolistId],
        );

        return (
            <div>
                <h3>
                    <EditableSpan title={title} editSpan={onChangeTitleTodo} />
                    <ButtonDelete callback={onClickButtonHandler} disabled={entityStatus === "loading"} />
                </h3>
                <FullInput callback={addTaskCallback} disabled={entityStatus === "loading"} />
                <Tasks tasks={tasks} filter={filter} todolistId={todolistId} changeIsDone={changeIsDone} />
                <FilterTaskButtons changeFilter={changeFilter} filter={filter} todolistId={todolistId} title={title} />
            </div>
        );
    },
);

export default Todolist;
