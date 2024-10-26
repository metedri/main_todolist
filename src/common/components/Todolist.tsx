import { ChangeEvent, useState } from "react"
import { FilterValues, TaskType } from "../../App"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from "@mui/material/Checkbox"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { flexContainerSx, getListItemSx } from "../Todolist.styles"

type Props = {
    title: string
    tasks: TaskType[]
    listID: string
    filter: FilterValues
    removeTask: (id: string, listID: string) => void
    changeFilter: (filter: FilterValues, listID: string) => void
    addTask: (title: string, listID: string) => void
    changeTaskStatus: (id: string, status: boolean, listID: string) => void
    removeTodolist: (listID: string) => void
    changeTaskTitle: (id: string, title: string, listID: string) => void
    changeTodolistTitle: (title: string, listID: string) => void
}

export const Todolist = (props: Props) => {
    const { title, tasks, listID, filter, removeTask, addTask, changeTaskTitle, changeTodolistTitle, changeFilter, changeTaskStatus, removeTodolist } = props

    const [collapsed, setCollapsed] = useState(true)

    const addTaskHandler = (title: string) => {
        addTask(title, listID)
    }

    const changeTodolistHandler = (title: string) => {
        changeTodolistTitle(title, listID)
    }

    return (
        <div>
            <Box sx={flexContainerSx}>
                <Box sx={flexContainerSx}>
                    <h3>
                        <EditableSpan changeTitle={changeTodolistHandler} value={title} />
                    </h3>
                    <IconButton onClick={() => setCollapsed(!collapsed)} disableRipple>
                        {collapsed? <ExpandLessIcon/> : <ExpandMoreIcon />}
                    </IconButton>
                </Box>
                <IconButton onClick={() => removeTodolist(listID)} disableRipple>
                    <DeleteIcon />
                </IconButton>
            </Box>
            {collapsed
            ? <><AddItemForm addItem={addTaskHandler} />
            {tasks.length === 0
                ? <Box sx={{padding: '10px 0'}}>Задач нет</Box>
                : <List >
                    {tasks.map(t => {
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, e.currentTarget.checked, listID)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(t.id, title, listID)
                        }

                        return <ListItem key={t.id} disablePadding
                            sx={getListItemSx(t.isDone)}>
                            <div>
                                <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler} size='small' edge='start' />
                                <EditableSpan changeTitle={changeTaskTitleHandler} value={t.title} />
                            </div>
                            <IconButton onClick={() => removeTask(t.id, listID)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    })}
                </List>
            }
            <Box sx={flexContainerSx}>
                <Button onClick={() => changeFilter('all', listID)} variant={filter === 'all' ? 'contained' : 'outlined'} size='small' disableElevation>All</Button>
                <Button onClick={() => changeFilter('active', listID)} variant={filter === 'active' ? 'contained' : 'outlined'} size='small' disableElevation>Active</Button>
                <Button onClick={() => changeFilter('completed', listID)} variant={filter === 'completed' ? 'contained' : 'outlined'} size='small' disableElevation>Completed</Button>
            </Box></>
            : <></>}
            
        </div>

    )
}