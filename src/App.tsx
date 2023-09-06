import React, { useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from "uuid";
import {FullInput} from "./components/FullInput";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
  // const getData = () => {
  //   fetch('https://jsonplaceholder.typicode.com/todos')
  //     .then(response => response.json())
  //     .then(json => setTasks(json))
  // }

  // useEffect(() => {
  //     getData()
  //   }, [])

  const [tasks, setTasks] = useState([
    {id: v1(), title: 'react', isDone: true},
    {id: v1(), title: 'html', isDone: false},
    {id: v1(), title: 'css', isDone: false}
  ])

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id != id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    if (title.trim() !== '') {
      let task = {id: v1(), title: title, isDone: false};
      let newTasks = [task, ...tasks];
      setTasks(newTasks);
    }
  }

  let [filter, setFilter] = useState<FilterValuesType>("all");


  let tasksForTodolist = tasks;
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone === true);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  return (
    <div className="App">
      <h3>What to Skills</h3>
      <FullInput addTask={addTask}/>
      <Todolist tasks={tasksForTodolist} changeFilter={changeFilter} removeTask={removeTask}/>
    </div>
  );
}

export default App;
