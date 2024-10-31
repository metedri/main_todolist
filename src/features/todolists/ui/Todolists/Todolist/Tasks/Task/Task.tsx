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
    listID: string
    task: TaskType
}


export const Task = ({ listID, task }: Props) => {
    const dispatch = useAppDispatch()

    const removeTask = () => {
        dispatch(removeTaskAC({ id: task.id, listID }))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({ id: task.id, status: e.currentTarget.checked, listID }))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({ id: task.id, title, listID }))
    }

    return (
        <ListItem disablePadding sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus} size='small' edge='start' />
                <EditableSpan changeTitle={changeTaskTitle} value={task.title} />
            </div>
            <IconButton onClick={removeTask}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}