import { useState } from 'react';
import { Todolist } from './common/components/Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './common/components/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper'
import { MenuButton } from './common/components/MenuButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import Switch from '@mui/material/Switch';

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

type ThemeMode = 'dark' | 'light'


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

  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  // --tasks
  const removeTask = (id: string, listID: string) => {
    setTasks({ ...tasks, [listID]: tasks[listID].filter(t => t.id !== id) })
  }

  const addTask = (title: string, listID: string) => {
    const newTask = { id: v1(), title, isDone: false }
    setTasks({ ...tasks, [listID]: [...tasks[listID], newTask] })
  }

  const changeTaskStatus = (id: string, status: boolean, listID: string) => {
    setTasks({ ...tasks, [listID]: tasks[listID].map(t => t.id === id ? { ...t, isDone: status } : t) })
  }

  const changeTaskTitle = (id: string, title: string, listID: string) => {
    setTasks({ ...tasks, [listID]: tasks[listID].map(t => t.id === id ? { ...t, title: title } : t) })
  }

  // --todolists
  const changeFilter = (filter: FilterValues, listID: string) => {
    setTodolists(todolists.map(tl => tl.id === listID ? { ...tl, filter } : tl))
  }

  const removeTodolist = (listID: string) => {
    delete tasks[listID]
    setTodolists(todolists.filter(tl => tl.id !== listID))
  }

  const addTodolist = (title: string) => {
    const newTodolistId = v1()
    setTodolists([...todolists, { id: newTodolistId, title, filter: 'all' }])
    setTasks({ ...tasks, [newTodolistId]: [] })
  }

  const changeTodolistTitle = (title: string, listID: string) => {
    setTodolists(todolists.map(tl => tl.id === listID ? { ...tl, title } : tl))
  }

  const changeModeHandler = () => {
    setThemeMode(themeMode == 'light' ? 'dark' : 'light')
  }
  
  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#adc0ff',
        dark: '#7289d8',
      },
    },
  })


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='static' sx={{mb: '30px'}}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To Do List
          </Typography>
          <MenuButton>Login</MenuButton>
          <MenuButton>Logout</MenuButton>
          <MenuButton>Faq</MenuButton>
          <Switch color={'default'} onChange={changeModeHandler} />
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container sx={{mb: '30px'}}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={4}>
          {todolists.map(tl => {

            let tasksForToDoList = tasks[tl.id]
            if (tl.filter === 'active') {
              tasksForToDoList = tasks[tl.id].filter(t => !t.isDone)
            }

            if (tl.filter === 'completed') {
              tasksForToDoList = tasks[tl.id].filter(t => t.isDone)
            }


            return (
              <Paper sx={{ p: '0 20px 20px 20px' }}>
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
                  filter={tl.filter}
                />
              </Paper>
            )
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
