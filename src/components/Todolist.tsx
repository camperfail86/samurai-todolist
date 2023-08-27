import React, {ChangeEvent, useState} from "react";
import {FullInput} from "./FullInput";


export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title?: string
  tasks: Array<TaskType>
  setTasks: Function
}

function Todolist(props: PropsType) {
  let [nameButton, setNameButton] = useState('all');

  let filteredTasks = props.tasks
  switch (nameButton) {
    case 'active':
      filteredTasks = props.tasks.filter(t => !t.isDone)
      break
    case 'completed':
      filteredTasks = props.tasks.filter(t => t.isDone)
  }

  const removeTasks = (id: number) => {
    filteredTasks = props.tasks.filter(t => t.id !== id)
    props.setTasks(filteredTasks)
  }

  const filterButton = (name: string) => {
    setNameButton(name);
  }

  const getTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTextNameInput(e.currentTarget.value)
  }

  const [textNameInput, setTextNameInput] = useState('')
  const onClickInputHandler = () => {
    let newTask = {id: 5, title: textNameInput, isDone: false}
    filteredTasks = [newTask, ...props.tasks]
    props.setTasks(filteredTasks)
    setTextNameInput('')
  }
  return (
    <div>
      <h3>What to {props.title}</h3>
      <FullInput getTextInput={getTextInput}
                 onClickInputHandler={onClickInputHandler}
                 textNameInput={textNameInput}
      />
      <ul>
        {filteredTasks.map((el, index) => {
          return (
            <li key={index}>
              <button onClick={() => {
                removeTasks(el.id)
              }}>X
              </button>
              <input type="checkbox" checked={el.isDone}/>
              <span>{el.title}</span>
            </li>
          )
        })}
      </ul>
      <div>
        <button onClick={() => filterButton('all')}>All</button>
        <button onClick={() => filterButton('active')}>Active</button>
        <button onClick={() => filterButton('completed')}>Completed</button>
      </div>
    </div>
  )
}

export default Todolist;
