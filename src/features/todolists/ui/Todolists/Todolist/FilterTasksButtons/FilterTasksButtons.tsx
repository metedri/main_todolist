import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { flexContainerSx } from "../../Todolist.styles"
import { changeTodolistFilterAC, FilterValues, TodolistType } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch"

type Props = {
    todolist: TodolistType
}

export const FilterTasksButtons = ({ todolist }: Props) => {
    const { filter, id } = todolist
    const dispatch = useAppDispatch()

    const changeFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({ filter, listID: id }))
    }

    return (
        <Box sx={flexContainerSx}>
            <Button
                onClick={() => changeFilter('all')}
                variant={filter === 'all' ? 'contained' : 'outlined'}
                size='small' disableElevation
            >
                All
            </Button>
            <Button
                onClick={() => changeFilter('active')}
                variant={filter === 'active' ? 'contained' : 'outlined'}
                size='small' disableElevation
            >
                Active
            </Button>
            <Button
                onClick={() => changeFilter('completed')}
                variant={filter === 'completed' ? 'contained' : 'outlined'}
                size='small' disableElevation
            >
                Completed
            </Button>
        </Box>

    )
}