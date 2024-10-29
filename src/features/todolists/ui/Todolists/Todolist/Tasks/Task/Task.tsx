import { ChangeEvent } from "react";
import Checkbox from "@mui/material/Checkbox"
import ListItem from '@mui/material/ListItem';
import { getListItemSx } from "../../../Todolist.styles";
import { EditableSpan } from "../../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType } from "../../../../../model/tasks-reducer";
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch";
import { TodolistType } from "../../../../../model/todolists-reducer";

type Props = {
    todolist: TodolistType
    task: TaskType
}


export const Task = ({ todolist, task }: Props) => {
    const dispatch = useAppDispatch()

    const removeTask = (id: string, listID: string) => dispatch(removeTaskAC({ id, listID }))

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({ id: task.id, status: e.currentTarget.checked, listID: todolist.id }))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({ id: task.id, title, listID: todolist.id }))
    }

    return (
        <ListItem disablePadding sx={getListItemSx(task.isDone)}>
            <>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus} size='small' edge='start' />
                <EditableSpan changeTitle={changeTaskTitle} value={task.title} />
            </>
            <IconButton onClick={() => removeTask(task.id, todolist.id)}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}