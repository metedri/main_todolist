import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import { AddItemForm } from '../common/components'
import { useAppSelector } from '../common/hooks'
import {
  useAddTodolistMutation,
  useGetTodolistsQuery,
  useRemoveTodolistMutation,
} from '../features/todolists/api/todolistsApi'
import { Todolists } from '../features/todolists/ui/Todolists/Todolists'
import { selectIsLoggedIn } from './appSlice'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { Path } from '../common/components/Routing/Routing'

export const Main = () => {
  const [addTodolist] = useAddTodolistMutation()
  const [removeTodolist] = useRemoveTodolistMutation()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { data: todolists } = useGetTodolistsQuery(undefined, { skip: !isLoggedIn })

  const navigate = useNavigate()

  const addTodolistCallback = (title: string) => {
    addTodolist(title)
  }
  const removeAllTodolist = () => {
    todolists?.map(tl => {
      removeTodolist(tl.id)
    })
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn])

  return (
    <Container fixed>
      <Grid container spacing={3} sx={{ mb: '30px' }}>
        <AddItemForm addItem={addTodolistCallback} />
        <Button onClick={removeAllTodolist} variant="outlined" startIcon={<DeleteIcon />} disableElevation>
          Remove all
        </Button>
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
