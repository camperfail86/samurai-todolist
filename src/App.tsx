import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./components/Todolist";
import {FullInput} from "./components/FullInput";


function App() {
  const[tasks, setTasks] = useState([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 4, title: "TypeSctipt", isDone: false}
  ])

  return (
    <div className="App">
      <Todolist tasks={tasks} setTasks={setTasks} title='Skills'/>

    </div>
  );
}
export default App;
