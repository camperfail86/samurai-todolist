import React from "react";
import { ButtonFilter } from "../ButtonFilter";
import { FilterValuesType } from "../../reducers/TodolistReducer";

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
                callback={()=>changeTodolistFilter('all')}
            />
            <ButtonFilter
                variant={props.filter === "active" ? "outlined" : "text"}
                name="Active"
                color="secondary"
                callback={()=>changeTodolistFilter('active')}
            />
            <ButtonFilter
                variant={props.filter === "completed" ? "outlined" : "text"}
                name="Completed"
                color="secondary"
                callback={()=>changeTodolistFilter('completed')}
            />
        </div>
    );
};
