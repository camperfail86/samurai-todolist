import React, {KeyboardEvent, useRef, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "../App";
import {useAutoAnimate} from "@formkit/auto-animate/react";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  // addTask: (title: string) => void
}

function Todolist(props: PropsType) {

  const [listRef] = useAutoAnimate<HTMLUListElement>()

  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  return (
    <div>
      <ul ref={listRef}>
        {
          props.tasks.map(t => {
            const onClickHandler = () => props.removeTask(t.id)

            return <li key={t.id}>
              <input type="checkbox" checked={t.isDone}/>
              <span>{t.title}</span>
              <button onClick={onClickHandler}>x</button>
            </li>
          })
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}

export default Todolist;
