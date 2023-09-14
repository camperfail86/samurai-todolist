import React, {useState} from "react";
import {FilterValuesType} from "../App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {FullInput} from "./FullInput";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  changeIsDone: (id: string) => void
  addTask:(title: string) => void
  error: boolean
  filter: FilterValuesType
}

function Todolist(props: PropsType) {

  const [listRef] = useAutoAnimate<HTMLUListElement>()
  const onAllClickHandler = () => {props.changeFilter("all");}
  const onActiveClickHandler = () => {props.changeFilter("active");}
  const onCompletedClickHandler = () => {props.changeFilter("completed");}

  return (
    <div>
      <FullInput error={props.error} addTask={props.addTask}/>
      <ul ref={listRef}>
        {
          props.tasks.map(t => {
            const onClickHandler = () => props.removeTask(t.id)
            const onChangeHandler = () => props.changeIsDone(t.id)
            return <li key={t.id}>
              <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
              <span>{t.title}</span>
              <button onClick={onClickHandler}>x</button>
            </li>
          })
        }
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}

export default Todolist;
