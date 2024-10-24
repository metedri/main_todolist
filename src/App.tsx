import { useState } from 'react';
import './App.css';
import { Todolist } from './common/components/Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './common/components/AddItemForm';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TasksStateType = {
  [key: string]: TaskType[]
}

type TodolistType = {
  id: string
  title: string
  filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
  // state
  const ToDoListId1 = v1()
  const ToDoListId2 = v1()

  const [tasks, setTasks] = useState<TasksStateType>({
    [ToDoListId1]: [
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'Typescript', isDone: false },
      { id: v1(), title: 'RTK query', isDone: false },
    ],
    [ToDoListId2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ]
  })

  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: ToDoListId1, title: 'What to learn', filter: 'all' },
    { id: ToDoListId2, title: 'What to buy', filter: 'all' },
  ])

  // --tasks
  const removeTask = (id: string, listID: string) => {
    setTasks({...tasks, [listID]: tasks[listID].filter(t => t.id !== id)})
  }

  const addTask = (title: string, listID: string) => {
    const newTask = { id: v1(), title, isDone: false }
    setTasks({...tasks, [listID]: [...tasks[listID], newTask]})
  }

  const changeTaskStatus = (id: string, status: boolean, listID: string) => {
    setTasks({...tasks, [listID]: tasks[listID].map(t => t.id === id? {...t, isDone: status}:t)})
  }

  const changeTaskTitle = (id: string, title: string, listID: string) => {
    setTasks({...tasks, [listID]: tasks[listID].map(t => t.id === id ? {...t, title: title}: t)})
  }

  // --todolists
  const changeFilter = (filter: FilterValues, listID: string) => {
    setTodolists(todolists.map(tl => tl.id === listID? {...tl, filter}: tl))
  }

  const removeTodolist = (listID: string) => {
    delete tasks[listID]
    setTodolists(todolists.filter(tl => tl.id !== listID))
  }

  const addTodolist = (title: string) => {
    const newTodolistId = v1()
    setTodolists([...todolists, {id: newTodolistId, title, filter: 'all'}])
    setTasks({...tasks, [newTodolistId]: []})
  }

  const changeTodolistTitle = (title: string, listID: string) => {
    setTodolists(todolists.map(tl => tl.id === listID? {...tl, title}: tl))
  }


  //filtration

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist}/>
      {todolists.map(tl => {

        let tasksForToDoList = tasks[tl.id]
        if (tl.filter === 'active') {
          tasksForToDoList = tasks[tl.id].filter(t => !t.isDone)
        }

        if (tl.filter === 'completed') {
          tasksForToDoList = tasks[tl.id].filter(t => t.isDone)
        }


        return (
          <Todolist
            key={tl.id}
            listID={tl.id}
            title={tl.title}
            tasks={tasksForToDoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
          />

        )
      })}
    </div>
  );
}

export default App;
