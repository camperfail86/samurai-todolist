import React, { useCallback } from "react";
import { ButtonFilter } from "../ButtonFilter";
import { FilterValuesType, todolistActions } from "../../reducers/TodolistReducer";
import { useAppDispatch } from "../../hooks/hooks";

type PropsType = {
    todolistId: string;
    title: string;
    filter: FilterValuesType;
    changeFilter: (todolistId: string, value: FilterValuesType) => void;
}

export const FilterTaskButtons = (props: PropsType) => {
    const changeTodolistFilter = (filter: FilterValuesType) => {
        props.changeFilter(props.todolistId, filter)
    }

    return (
        <div>
            <ButtonFilter
                variant={props.filter === "all" ? "outlined" : "text"}
                name="All"
                color="secondary"
                // callback={()=>changeFilter(props.todolistId, 'all')}
                callback={()=>changeTodolistFilter('all')}
            />
            <ButtonFilter
                variant={props.filter === "active" ? "outlined" : "text"}
                name="Active"
                color="secondary"
                callback={()=>changeTodolistFilter('active')}
                // callback={()=>changeFilter(props.todolistId, 'active')}
            />
            <ButtonFilter
                variant={props.filter === "completed" ? "outlined" : "text"}
                name="Completed"
                color="secondary"
                callback={()=>changeTodolistFilter('completed')}
                // callback={()=>changeFilter(props.todolistId, 'completed')}
            />
        </div>
    );
};
