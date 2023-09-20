import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active'
export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTask = (todolistId: string, id: string) => {
        let filteredTasks = tasks[todolistId].filter(t => t.id != id);
        setTasks({...tasks, [todolistId]: filteredTasks});
    }

    const changeIsDone = (todolistId: string, id: string) => {
        const changeIsDoneTasks = tasks[todolistId].map((t) => t.id === id ? {...t, isDone: !t.isDone} : t)
        setTasks({...tasks, [todolistId]: changeIsDoneTasks})
    }

    const addTask = (todolistId: string, title: string) => {
        if (title.trim() !== '') {
          let task = {id: v1(), title: title, isDone: false};
          let newTasks = [task, ...tasks[todolistId]];
          setTasks({...tasks, [todolistId]: newTasks});
        }
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(td => { return (td.id === todolistId ? {...td, filter: value} : {...td}) }))
    }

    const deleteTodolist = (todolistId: string) => {
        let filteredTodo = todolists.filter(td => td.id !== todolistId)
        setTodolists(filteredTodo)
    }

    return (
        <div className="App">
            {todolists.map(td => {

                let tasksForTodolist = tasks[td.id];
                if (td.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }
                if (td.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }

                return (
                    <div className='todolist' key={td.id}>
                        <h3>{td.title} <button onClick={() => deleteTodolist(td.id)}>x</button></h3>
                        <Todolist
                            addTask={addTask}
                            changeIsDone={changeIsDone}
                            tasks={tasksForTodolist}
                            changeFilter={changeFilter}
                            removeTask={removeTask}
                            filter={td.filter}
                            todolistId={td.id}
                        />
                    </div>
                )
            })}
        </div>
    );
}

export default App;
