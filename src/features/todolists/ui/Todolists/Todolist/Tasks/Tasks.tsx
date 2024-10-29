import Box from "@mui/material/Box"
import List from '@mui/material/List';
import { TodolistType } from "../../../../model/todolists-reducer";
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector";
import { Task } from "./Task/Task";


type Props = {
    todolist: TodolistType
}

export const Tasks = ({ todolist }: Props) => {
    const tasks = useAppSelector(state => state.tasks)

    let tasksForToDoList = tasks[todolist.id]

    if (todolist.filter === 'active') {
        tasksForToDoList = tasks[todolist.id].filter(t => !t.isDone)
    }

    if (todolist.filter === 'completed') {
        tasksForToDoList = tasks[todolist.id].filter(t => t.isDone)
    }

    return <>
        {tasksForToDoList.length === 0
            ? <Box sx={{ padding: '10px 0' }}>Задач нет</Box>
            : <List >
                {tasksForToDoList.map(task => {
                    return <Task key={task.id} task={task} todolist={todolist} />
                })}
            </List>
        }
    </>
}