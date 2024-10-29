import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from "@mui/material/IconButton"
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box"
import { flexContainerSx } from '../../Todolist.styles';
import { EditableSpan } from '../../../../../../common/components/EditableSpan/EditableSpan';
import { changeTodolistTitleAC, removeTodolistAC, TodolistType } from '../../../../model/todolists-reducer';
import { useAppDispatch } from '../../../../../../common/hooks/useAppDispatch';

type Props = {
    todolist: TodolistType
    collapsed: boolean
    setCollapsed: (collapsed: boolean) => void
}


export const TodolistTitle = ({ todolist, collapsed, setCollapsed }: Props) => {
    const dispatch = useAppDispatch()

    const removeTodolist = () => dispatch(removeTodolistAC(todolist.id))

    const changeTodolistTitle = (title: string) => dispatch(changeTodolistTitleAC({ title, listID: todolist.id }))

    return (
        <Box sx={flexContainerSx}>
            <Box sx={flexContainerSx}>
                <h3> <EditableSpan changeTitle={changeTodolistTitle} value={todolist.title} /> </h3>
                <IconButton onClick={() => setCollapsed(!collapsed)} disableRipple>
                    {collapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>
            <IconButton onClick={removeTodolist} disableRipple>
                <DeleteIcon />
            </IconButton>
        </Box>
    )
}