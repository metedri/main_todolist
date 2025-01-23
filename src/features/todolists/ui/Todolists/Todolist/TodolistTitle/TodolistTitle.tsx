import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import { flexContainerSx } from '../../Todolist.styles'
import { useAppDispatch } from '../../../../../../common/hooks'
import { EditableSpan } from '../../../../../../common/components'
import { DomainTodolist } from '../../../../lib/types/types'
import { todolistsApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from '../../../../api/todolistsApi'
import { RequestStatus } from '../../../../../../app/appSlice'

type Props = {
  todolist: DomainTodolist
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export const TodolistTitle = ({ todolist, collapsed, setCollapsed }: Props) => {
  const { title, id, entityStatus } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const dispatch = useAppDispatch()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
        const index = state.findIndex(tl => tl.id === id)
        if (index !== -1) {
          state[index].entityStatus = status
        }
      })
    )
  }

  const removeTodolistHandler = () => {
    updateQueryData('loading')
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        updateQueryData('idle')
      })
  }

  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <Box sx={flexContainerSx}>
      <Box sx={flexContainerSx}>
        <h3>
          <EditableSpan onChange={updateTodolistHandler} value={title} disabled={entityStatus === 'loading'} />
        </h3>
        <IconButton onClick={() => setCollapsed(!collapsed)} disableRipple>
          {collapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <IconButton onClick={removeTodolistHandler} disableRipple disabled={entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
