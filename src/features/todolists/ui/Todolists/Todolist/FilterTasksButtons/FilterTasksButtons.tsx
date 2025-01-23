import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { flexContainerSx } from '../../Todolist.styles'
import { useAppDispatch } from '../../../../../../common/hooks'
import { DomainTodolist, FilterValues } from '../../../../lib/types/types'
import { todolistsApi } from '../../../../api/todolistsApi'

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { filter, id } = todolist
  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
        const index = state.findIndex(tl => tl.id === id)
        if (index !== -1) {
          state[index].filter = filter
        }
      })
    )
  }

  return (
    <Box sx={flexContainerSx}>
      <Button
        onClick={() => changeFilterTasksHandler('all')}
        variant={filter === 'all' ? 'contained' : 'outlined'}
        size="small"
        disableElevation>
        All
      </Button>
      <Button
        onClick={() => changeFilterTasksHandler('active')}
        variant={filter === 'active' ? 'contained' : 'outlined'}
        size="small"
        disableElevation>
        Active
      </Button>
      <Button
        onClick={() => changeFilterTasksHandler('completed')}
        variant={filter === 'completed' ? 'contained' : 'outlined'}
        size="small"
        disableElevation>
        Completed
      </Button>
    </Box>
  )
}
