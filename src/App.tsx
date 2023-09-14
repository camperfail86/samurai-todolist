import React, {useState} from 'react';
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

  // let todolistID1 = v1();
  // let todolistID2 = v1();
  //
  // let [todolists, setTodolists] = useState<Array<todolistsType>>([
  //   {id: todolistID1, title: 'What to learn', filter: 'all'},
  //   {id: todolistID2, title: 'What to buy', filter: 'all'},
  // ])

  // let [tasks, setTasks] = useState({
  //   [todolistID1]: [
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true},
  //     {id: v1(), title: "ReactJS", isDone: false},
  //     {id: v1(), title: "Rest API", isDone: false},
  //     {id: v1(), title: "GraphQL", isDone: false},
  //   ],
  //   [todolistID2]: [
  //     {id: v1(), title: "HTML&CSS2", isDone: true},
  //     {id: v1(), title: "JS2", isDone: true},
  //     {id: v1(), title: "ReactJS2", isDone: false},
  //     {id: v1(), title: "Rest API2", isDone: false},
  //     {id: v1(), title: "GraphQL2", isDone: false},
  //   ]
  // });

  const [tasks, setTasks] = useState([
    {id: v1(), title: 'react', isDone: true},
    {id: v1(), title: 'html', isDone: false},
    {id: v1(), title: 'css', isDone: false}
  ])
  let [filter, setFilter] = useState<FilterValuesType>("all");
  const [error, setError] = useState(false)

  const removeTask = (id: string) => {
    let filteredTasks = tasks.filter(t => t.id != id);
    setTasks(filteredTasks);
  }

  const changeIsDone = (id: string) => {
    const newTasks = tasks.map((t) => t.id === id ? {...t, isDone: !t.isDone} : t)
    setTasks(newTasks)
  }

  const addTask = (title: string) => {
    if (title.trim() !== '') {
      let task = {id: v1(), title: title, isDone: false};
      let newTasks = [task, ...tasks];
      setTasks(newTasks);
      setError(false)
    } else {
      setError(true)
    }
  }

  let tasksForTodolist = tasks;
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone === true);
  }

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  }

  return (
    <div className="App">
      <h3>What to Skills</h3>
      <Todolist
        addTask={addTask}
        changeIsDone={changeIsDone}
        tasks={tasksForTodolist}
        changeFilter={changeFilter}
        removeTask={removeTask}
        error={error}
        filter={filter}
      />
    </div>
  );
}

export default App;
